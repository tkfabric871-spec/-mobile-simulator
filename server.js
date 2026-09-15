const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

function cleanBusinessName(name) {
    if (!name) return null;

    try {
        name = decodeURIComponent(name);
    } catch {}

    name = name
        .replace(/\+/g, " ")
        .replace(/%2F/gi, "/")
        .replace(/%2C/gi, ",")
        .replace(/%26/gi, "&")
        .replace(/\s+/g, " ")
        .trim();

    if (!name) return null;

    return name;
}

function extractBusinessName(url) {
    if (!url) return null;

    try {
        const u = new URL(url);

        // /maps/place/Business+Name/
        const placeMatch = u.pathname.match(
            /\/maps\/(?:place|preview\/place)\/([^/]+)/i
        );

        if (placeMatch) {
            return cleanBusinessName(placeMatch[1]);
        }

        // /maps/search/Business+Name
        const searchMatch = u.pathname.match(
            /\/maps\/search\/([^/]+)/i
        );

        if (searchMatch) {
            return cleanBusinessName(searchMatch[1]);
        }

        // ?q=Business+Name
        const params = ["q", "query", "destination"];

        for (const key of params) {
            const value = u.searchParams.get(key);

            if (value) {
                const cleaned = cleanBusinessName(value);

                if (cleaned) {
                    return cleaned;
                }
            }
        }
    } catch {}

    return null;
}

function requestUrl(targetUrl, redirects = 0) {
    return new Promise((resolve, reject) => {
        if (redirects > 15) {
            reject(new Error("Too many redirects"));
            return;
        }

        let parsed;

        try {
            parsed = new URL(targetUrl);
        } catch {
            reject(new Error("Invalid URL"));
            return;
        }

        const client =
            parsed.protocol === "https:"
                ? https
                : http;

        const options = {
            hostname: parsed.hostname,
            port: parsed.port || undefined,
            path: parsed.pathname + parsed.search,
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
                "Accept":
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language":
                    "en-US,en;q=0.9",
                "Connection": "close"
            },
            timeout: 15000
        };

        const req = client.request(options, res => {
            let body = "";

            res.setEncoding("utf8");

            res.on("data", chunk => {
                body += chunk;
            });

            res.on("end", () => {
                const status = res.statusCode || 0;

                const location =
                    res.headers.location;

                // Normal HTTP redirect
                if (
                    location &&
                    status >= 300 &&
                    status < 400
                ) {
                    const nextUrl =
                        new URL(location, targetUrl).toString();

                    requestUrl(
                        nextUrl,
                        redirects + 1
                    )
                        .then(resolve)
                        .catch(reject);

                    return;
                }

                resolve({
                    url: targetUrl,
                    finalUrl: targetUrl,
                    status,
                    headers: res.headers,
                    body
                });
            });
        });

        req.on("timeout", () => {
            req.destroy(
                new Error("Request timeout")
            );
        });

        req.on("error", reject);

        req.end();
    });
}

function extractGoogleUrlFromHtml(html) {
    if (!html) return null;

    // Canonical URL
    const canonical =
        html.match(
            /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
        );

    if (canonical && canonical[1]) {
        try {
            const url = new URL(
                canonical[1],
                "https://www.google.com"
            ).toString();

            if (
                url.includes("google.com/maps") ||
                url.includes("maps.google.com")
            ) {
                return url;
            }
        } catch {}
    }

    // Meta refresh
    const meta =
        html.match(
            /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"']+)["']/i
        );

    if (meta && meta[1]) {
        try {
            const url = new URL(
                meta[1],
                "https://www.google.com"
            ).toString();

            if (
                url.includes("google.com/maps") ||
                url.includes("maps.google.com")
            ) {
                return url;
            }
        } catch {}
    }

    // Google Maps URL inside page source
    const mapsMatch =
        html.match(
            /https?:\\?\/\\?\/(?:www\.)?google\.[^"'\\ ]+\/maps\/[^"'\\ ]+/i
        );

    if (mapsMatch && mapsMatch[0]) {
        try {
            return mapsMatch[0]
                .replace(/\\u003d/g, "=")
                .replace(/\\u0026/g, "&")
                .replace(/\\/g, "");
        } catch {}
    }

    return null;
}

async function resolveGoogleLink(inputUrl) {
    let result;

    try {
        result = await requestUrl(inputUrl);
    } catch (error) {
        throw new Error(
            "Google link could not be opened: " +
            error.message
        );
    }

    // First try the URL itself
    let businessName =
        extractBusinessName(result.finalUrl);

    if (businessName) {
        return {
            businessName,
            finalUrl: result.finalUrl
        };
    }

    // Try URL found inside returned HTML
    const googleUrl =
        extractGoogleUrlFromHtml(result.body);

    if (googleUrl) {
        businessName =
            extractBusinessName(googleUrl);

        if (businessName) {
            return {
                businessName,
                finalUrl: googleUrl
            };
        }

        try {
            const second =
                await requestUrl(googleUrl);

            businessName =
                extractBusinessName(
                    second.finalUrl
                );

            if (businessName) {
                return {
                    businessName,
                    finalUrl: second.finalUrl
                };
            }
        } catch {}
    }

    // Try extracting directly from page HTML
    if (result.body) {
        const patterns = [
            /\/maps\/place\/([^/\\?"'<]+)/i,
            /\/maps\/preview\/place\/([^/\\?"'<]+)/i,
            /\/maps\/search\/([^/\\?"'<]+)/i
        ];

        for (const pattern of patterns) {
            const match =
                result.body.match(pattern);

            if (match && match[1]) {
                businessName =
                    cleanBusinessName(match[1]);

                if (businessName) {
                    return {
                        businessName,
                        finalUrl: result.finalUrl
                    };
                }
            }
        }
    }

    throw new Error(
        "Business name could not be found from this Google Maps link."
    );
}

function sendJson(res, statusCode, data) {
    const json = JSON.stringify(data);

    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
        "Content-Length": Buffer.byteLength(json)
    });

    res.end(json);
}

const server = http.createServer(
    async (req, res) => {
        try {
            const requestUrlObject =
                new URL(
                    req.url,
                    `http://${req.headers.host}`
                );

            // Google resolver
            if (
                requestUrlObject.pathname ===
                "/resolve-google"
            ) {
                const googleUrl =
                    requestUrlObject.searchParams.get(
                        "url"
                    );

                if (!googleUrl) {
                    sendJson(res, 400, {
                        error:
                            "Google URL is required."
                    });

                    return;
                }

                let parsed;

                try {
                    parsed = new URL(googleUrl);
                } catch {
                    sendJson(res, 400, {
                        error:
                            "Invalid Google URL."
                    });

                    return;
                }

                const hostname =
                    parsed.hostname.toLowerCase();

                if (
                    !hostname.includes("google.com") &&
                    !hostname.includes("googleusercontent.com") &&
                    !hostname.includes("goo.gl")
                ) {
                    sendJson(res, 400, {
                        error:
                            "Only Google Maps links are allowed."
                    });

                    return;
                }

                try {
                    const result =
                        await resolveGoogleLink(
                            googleUrl
                        );

                    sendJson(res, 200, result);
                } catch (error) {
                    console.error(
                        "Google resolver error:",
                        error.message
                    );

                    sendJson(res, 500, {
                        error: error.message
                    });
                }

                return;
            }

            // CORS preflight
            if (req.method === "OPTIONS") {
                res.writeHead(204, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type"
                });

                res.end();
                return;
            }

            // Static files
            let filePath =
                requestUrlObject.pathname === "/"
                    ? path.join(
                          __dirname,
                          "index.html"
                      )
                    : path.join(
                          __dirname,
                          requestUrlObject.pathname
                      );

            filePath = path.normalize(filePath);

            // Prevent access outside project folder
            if (
                !filePath.startsWith(
                    path.normalize(__dirname)
                )
            ) {
                res.writeHead(403);
                res.end("Forbidden");
                return;
            }

            fs.readFile(
                filePath,
                (error, content) => {
                    if (error) {
                        res.writeHead(404, {
                            "Content-Type":
                                "text/plain; charset=utf-8"
                        });

                        res.end("Not Found");
                        return;
                    }

                    const ext =
                        path.extname(filePath)
                            .toLowerCase();

                    const mimeTypes = {
                        ".html":
                            "text/html; charset=utf-8",
                        ".js":
                            "application/javascript; charset=utf-8",
                        ".css":
                            "text/css; charset=utf-8",
                        ".json":
                            "application/json; charset=utf-8",
                        ".png":
                            "image/png",
                        ".jpg":
                            "image/jpeg",
                        ".jpeg":
                            "image/jpeg",
                        ".svg":
                            "image/svg+xml",
                        ".ico":
                            "image/x-icon"
                    };

                    res.writeHead(200, {
                        "Content-Type":
                            mimeTypes[ext] ||
                            "application/octet-stream"
                    });

                    res.end(content);
                }
            );
        } catch (error) {
            console.error(
                "Server error:",
                error
            );

            res.writeHead(500, {
                "Content-Type":
                    "text/plain; charset=utf-8"
            });

            res.end("Internal Server Error");
        }
    }
);

server.listen(
    PORT,
    HOST,
    () => {
        console.log(
            `Server running on ${HOST}:${PORT}`
        );
    }
);