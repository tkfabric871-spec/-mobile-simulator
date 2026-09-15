const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

/* =========================================================
   BASIC HELPERS
========================================================= */

function cleanBusinessName(name) {
    if (!name) return null;

    let value = String(name);

    try {
        value = decodeURIComponent(value);
    } catch (error) {}

    value = value
        .replace(/\+/g, " ")
        .replace(/\\u002b/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    value = value
        .replace(/\s*-\s*Google Maps.*$/i, "")
        .replace(/\s*-\s*Google.*$/i, "")
        .trim();

    if (!value) return null;

    if (
        /^google(\s+maps)?$/i.test(value) ||
        /^maps$/i.test(value)
    ) {
        return null;
    }

    return value;
}

function isAllowedGoogleHost(hostname) {
    if (!hostname) return false;

    const host = hostname.toLowerCase();

    return (
        host === "goo.gl" ||
        host.endsWith(".goo.gl") ||
        host === "google.com" ||
        host.endsWith(".google.com") ||
        host === "googleusercontent.com" ||
        host.endsWith(".googleusercontent.com")
    );
}

function isGoogleMapsUrl(value) {
    try {
        const url = new URL(value);

        return (
            isAllowedGoogleHost(url.hostname) &&
            (
                url.hostname === "goo.gl" ||
                url.hostname.endsWith(".goo.gl") ||
                url.pathname.includes("/maps") ||
                url.hostname.includes("google.com")
            )
        );
    } catch {
        return false;
    }
}


/* =========================================================
   DIRECT BUSINESS NAME EXTRACTION
========================================================= */

function extractBusinessName(url) {
    if (!url) return null;

    try {
        const parsed = new URL(url);

        const pathPatterns = [
            /\/maps\/place\/([^/?#]+)/i,
            /\/maps\/preview\/place\/([^/?#]+)/i,
            /\/maps\/search\/([^/?#]+)/i,
            /\/maps\/dir\/([^/?#]+)/i
        ];

        for (const pattern of pathPatterns) {
            const match = parsed.pathname.match(pattern);

            if (match && match[1]) {
                let name = cleanBusinessName(match[1]);

                if (name) {
                    name = name
                        .replace(/@.*$/, "")
                        .replace(/,.*$/, "")
                        .trim();

                    if (name) {
                        return name;
                    }
                }
            }
        }

        const params = [
            "q",
            "query",
            "destination",
            "origin",
            "daddr"
        ];

        for (const key of params) {
            const value = parsed.searchParams.get(key);

            if (!value) continue;

            const name = cleanBusinessName(value);

            if (name) {
                return name;
            }
        }

        return null;
    } catch {
        return null;
    }
}


/* =========================================================
   HTML DECODING
========================================================= */

function decodeHtmlEntities(text) {
    if (!text) return "";

    return String(text)
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&#x27;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&#x2F;/gi, "/")
        .replace(/&#47;/gi, "/")
        .replace(/&#x3D;/gi, "=")
        .replace(/&#61;/gi, "=")
        .replace(/&nbsp;/gi, " ");
}

function decodeUnicodeEscapes(text) {
    if (!text) return "";

    return String(text)
        .replace(/\\u002f/gi, "/")
        .replace(/\\u002F/g, "/")
        .replace(/\\u003a/gi, ":")
        .replace(/\\u003A/g, ":")
        .replace(/\\u003d/gi, "=")
        .replace(/\\u003D/g, "=")
        .replace(/\\u0026/gi, "&")
        .replace(/\\u002b/gi, "+")
        .replace(/\\u0022/gi, '"')
        .replace(/\\\//g, "/");
}

function stripHtml(text) {
    return decodeHtmlEntities(
        String(text || "")
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
    );
}


/* =========================================================
   EXTRACT BUSINESS NAME FROM GOOGLE HTML
========================================================= */

function extractBusinessNameFromHtml(html) {
    if (!html) return null;

    let source = decodeUnicodeEscapes(
        decodeHtmlEntities(html)
    );

    let match;

    /* ---------- JSON-LD ---------- */

    const jsonPatterns = [
        /"name"\s*:\s*"([^"]{2,300})"/gi,
        /'name'\s*:\s*'([^']{2,300})'/gi
    ];

    for (const pattern of jsonPatterns) {
        while ((match = pattern.exec(source)) !== null) {
            const name = cleanBusinessName(match[1]);

            if (
                name &&
                !/google maps/i.test(name) &&
                !/^google$/i.test(name) &&
                !/^maps$/i.test(name)
            ) {
                return name;
            }
        }
    }


    /* ---------- OG TITLE ---------- */

    const ogTitlePatterns = [
        /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i
    ];

    for (const pattern of ogTitlePatterns) {
        match = source.match(pattern);

        if (match && match[1]) {
            let name = cleanBusinessName(
                stripHtml(match[1])
            );

            if (
                name &&
                !/^google maps$/i.test(name) &&
                !/^google$/i.test(name)
            ) {
                return name;
            }
        }
    }


    /* ---------- TITLE ---------- */

    match = source.match(
        /<title[^>]*>([\s\S]*?)<\/title>/i
    );

    if (match && match[1]) {
        let title = cleanBusinessName(
            stripHtml(match[1])
        );

        if (title) {
            title = title
                .replace(/\s*-\s*Google Maps.*$/i, "")
                .replace(/\s*\|\s*Google Maps.*$/i, "")
                .replace(/\s*-\s*Google.*$/i, "")
                .trim();

            if (
                title &&
                !/^google maps$/i.test(title) &&
                !/^google$/i.test(title)
            ) {
                return title;
            }
        }
    }


    /* ---------- GOOGLE MAPS URL INSIDE HTML ---------- */

    const mapsPatterns = [
        /\/maps\/place\/([^/?#"'\\<>]+)/i,
        /\/maps\/preview\/place\/([^/?#"'\\<>]+)/i,
        /\/maps\/search\/([^/?#"'\\<>]+)/i
    ];

    for (const pattern of mapsPatterns) {
        match = source.match(pattern);

        if (match && match[1]) {
            const name = cleanBusinessName(match[1]);

            if (name) {
                return name;
            }
        }
    }


    /* ---------- /PLACE/ WITH ENCODED DATA ---------- */

    const encodedPlacePattern =
        /place%2F([^%?#"'\\<>]+)/i;

    match = source.match(encodedPlacePattern);

    if (match && match[1]) {
        const name = cleanBusinessName(match[1]);

        if (name) {
            return name;
        }
    }


    /* ---------- BUSINESS NAME IN COMMON GOOGLE FIELDS ---------- */

    const fieldPatterns = [
        /"placeName"\s*:\s*"([^"]{2,300})"/i,
        /"businessName"\s*:\s*"([^"]{2,300})"/i,
        /"title"\s*:\s*"([^"]{2,300})"/i
    ];

    for (const pattern of fieldPatterns) {
        match = source.match(pattern);

        if (match && match[1]) {
            const name = cleanBusinessName(match[1]);

            if (
                name &&
                !/google maps/i.test(name) &&
                !/^google$/i.test(name)
            ) {
                return name;
            }
        }
    }

    return null;
}


/* =========================================================
   FIND GOOGLE MAPS URL INSIDE HTML
========================================================= */

function extractGoogleUrlFromHtml(html) {
    if (!html) return null;

    let source = decodeUnicodeEscapes(
        decodeHtmlEntities(html)
    );

    let match;


    /* ---------- CANONICAL ---------- */

    const canonicalPatterns = [
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
        /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i
    ];

    for (const pattern of canonicalPatterns) {
        match = source.match(pattern);

        if (match && match[1]) {
            try {
                const url = new URL(
                    match[1],
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
    }


    /* ---------- META REFRESH ---------- */

    const refreshPatterns = [
        /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"']+)["']/i,
        /<meta[^>]+content=["'][^"']*url=([^"']+)["'][^>]+http-equiv=["']refresh["']/i
    ];

    for (const pattern of refreshPatterns) {
        match = source.match(pattern);

        if (match && match[1]) {
            try {
                const url = new URL(
                    match[1],
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
    }


    /* ---------- NORMAL GOOGLE MAPS URL ---------- */

    const sourcePatterns = [
        /https?:\/\/(?:www\.)?google\.[^"'\\\s<>]+\/maps\/[^"'\\\s<>]+/i,
        /https?:\\\/\\\/(?:www\.)?google\.[^"'\\\s<>]+\\\/maps\\\/[^"'\\\s<>]+/i
    ];

    for (const pattern of sourcePatterns) {
        match = source.match(pattern);

        if (match && match[0]) {
            let url = match[0];

            url = decodeUnicodeEscapes(url)
                .replace(/&amp;/gi, "&")
                .replace(/\\+/g, "");

            try {
                url = new URL(url).toString();

                if (
                    url.includes("google.com/maps") ||
                    url.includes("maps.google.com")
                ) {
                    return url;
                }
            } catch {}
        }
    }

    return null;
}


/* =========================================================
   EXTRACT ANY USEFUL GOOGLE URL FROM TEXT
========================================================= */

function extractAnyGoogleUrl(text) {
    if (!text) return null;

    const source = decodeUnicodeEscapes(
        decodeHtmlEntities(text)
    );

    const patterns = [
        /https?:\/\/maps\.app\.goo\.gl\/[A-Za-z0-9_-]+/i,
        /https?:\/\/goo\.gl\/maps\/[A-Za-z0-9_-]+/i,
        /https?:\/\/(?:www\.)?google\.[a-z.]+\/maps\/[^"'\\\s<>]+/i
    ];

    for (const pattern of patterns) {
        const match = source.match(pattern);

        if (match && match[0]) {
            return match[0];
        }
    }

    return null;
}


/* =========================================================
   HTTP REQUEST + REDIRECT FOLLOWING
========================================================= */

function requestUrl(targetUrl, redirects = 0) {
    return new Promise((resolve, reject) => {
        if (redirects > 25) {
            reject(
                new Error("Too many redirects.")
            );
            return;
        }

        let parsed;

        try {
            parsed = new URL(targetUrl);
        } catch {
            reject(
                new Error("Invalid URL.")
            );
            return;
        }

        if (!isAllowedGoogleHost(parsed.hostname)) {
            reject(
                new Error(
                    "Only Google Maps links are allowed."
                )
            );
            return;
        }

        const client =
            parsed.protocol === "https:"
                ? https
                : http;

        const options = {
            hostname: parsed.hostname,
            port: parsed.port || undefined,
            path:
                parsed.pathname +
                parsed.search,
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",

                "Accept":
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

                "Accept-Language":
                    "en-US,en;q=0.9",

                "Accept-Encoding":
                    "identity",

                "Cache-Control":
                    "no-cache",

                "Pragma":
                    "no-cache",

                "Upgrade-Insecure-Requests":
                    "1",

                "Connection":
                    "close"
            },

            timeout: 25000
        };

        const req = client.request(
            options,
            res => {
                let body = "";

                res.setEncoding("utf8");

                res.on("data", chunk => {
                    body += chunk;

                    if (
                        body.length >
                        8 * 1024 * 1024
                    ) {
                        req.destroy(
                            new Error(
                                "Google response is too large."
                            )
                        );
                    }
                });

                res.on("end", async () => {
                    const status =
                        res.statusCode || 0;

                    const location =
                        res.headers.location;

                    /* ---------- HTTP REDIRECT ---------- */

                    if (
                        location &&
                        status >= 300 &&
                        status < 400
                    ) {
                        try {
                            const nextUrl =
                                new URL(
                                    location,
                                    targetUrl
                                ).toString();

                            const nextParsed =
                                new URL(
                                    nextUrl
                                );

                            if (
                                !isAllowedGoogleHost(
                                    nextParsed.hostname
                                )
                            ) {
                                reject(
                                    new Error(
                                        "Redirected to a non-Google URL."
                                    )
                                );
                                return;
                            }

                            const next =
                                await requestUrl(
                                    nextUrl,
                                    redirects + 1
                                );

                            resolve(next);
                            return;
                        } catch (error) {
                            reject(error);
                            return;
                        }
                    }

                    resolve({
                        url: targetUrl,
                        finalUrl: targetUrl,
                        status,
                        headers: res.headers,
                        body
                    });
                });
            }
        );

        req.on("timeout", () => {
            req.destroy(
                new Error(
                    "Google request timed out."
                )
            );
        });

        req.on("error", error => {
            reject(error);
        });

        req.end();
    });
}


/* =========================================================
   GOOGLE LINK RESOLVER
========================================================= */

async function resolveGoogleLink(inputUrl) {
    let parsedInput;

    try {
        parsedInput =
            new URL(inputUrl);
    } catch {
        throw new Error(
            "Invalid Google URL."
        );
    }

    if (
        !isAllowedGoogleHost(
            parsedInput.hostname
        )
    ) {
        throw new Error(
            "Only Google Maps links are allowed."
        );
    }


    /* ---------- DIRECT LINK ---------- */

    const directName =
        extractBusinessName(
            inputUrl
        );

    if (directName) {
        return {
            businessName: directName,
            finalUrl: inputUrl
        };
    }


    /* ---------- OPEN SHORT LINK ---------- */

    let result;

    try {
        result =
            await requestUrl(
                inputUrl
            );
    } catch (error) {
        throw new Error(
            "Google link could not be opened: " +
            error.message
        );
    }


    /* ---------- NAME FROM FINAL URL ---------- */

    let businessName =
        extractBusinessName(
            result.finalUrl
        );

    if (businessName) {
        return {
            businessName,
            finalUrl:
                result.finalUrl
        };
    }


    /* ---------- NAME FROM HTML ---------- */

    businessName =
        extractBusinessNameFromHtml(
            result.body
        );

    if (businessName) {
        return {
            businessName,
            finalUrl:
                result.finalUrl
        };
    }


    /* ---------- GOOGLE URL FROM HTML ---------- */

    let googleMapsUrl =
        extractGoogleUrlFromHtml(
            result.body
        );

    if (googleMapsUrl) {
        businessName =
            extractBusinessName(
                googleMapsUrl
            );

        if (businessName) {
            return {
                businessName,
                finalUrl:
                    googleMapsUrl
            };
        }

        try {
            const second =
                await requestUrl(
                    googleMapsUrl
                );

            businessName =
                extractBusinessName(
                    second.finalUrl
                );

            if (!businessName) {
                businessName =
                    extractBusinessNameFromHtml(
                        second.body
                    );
            }

            if (businessName) {
                return {
                    businessName,
                    finalUrl:
                        second.finalUrl
                };
            }
        } catch {}
    }


    /* ---------- SEARCH HTML FOR ANOTHER GOOGLE URL ---------- */

    googleMapsUrl =
        extractAnyGoogleUrl(
            result.body
        );

    if (
        googleMapsUrl &&
        googleMapsUrl !== inputUrl
    ) {
        try {
            const nested =
                await requestUrl(
                    googleMapsUrl
                );

            businessName =
                extractBusinessName(
                    nested.finalUrl
                );

            if (!businessName) {
                businessName =
                    extractBusinessNameFromHtml(
                        nested.body
                    );
            }

            if (businessName) {
                return {
                    businessName,
                    finalUrl:
                        nested.finalUrl
                };
            }
        } catch {}
    }


    /* ---------- TRY COMMON GOOGLE QUERY DATA ---------- */

    const html =
        decodeUnicodeEscapes(
            decodeHtmlEntities(
                result.body || ""
            )
        );

    const queryPatterns = [
        /[?&](?:q|query|destination)=([^&"'<>\\]+)/i,
        /"query"\s*:\s*"([^"]{2,300})"/i,
        /"destination"\s*:\s*"([^"]{2,300})"/i,
        /"placeName"\s*:\s*"([^"]{2,300})"/i
    ];

    for (const pattern of queryPatterns) {
        const match =
            html.match(pattern);

        if (match && match[1]) {
            const name =
                cleanBusinessName(
                    match[1]
                );

            if (name) {
                return {
                    businessName: name,
                    finalUrl:
                        result.finalUrl
                };
            }
        }
    }


    throw new Error(
        "Business name could not be found from this Google Maps link."
    );
}


/* =========================================================
   JSON RESPONSE
========================================================= */

function sendJson(
    res,
    statusCode,
    data
) {
    const json =
        JSON.stringify(data);

    res.writeHead(
        statusCode,
        {
            "Content-Type":
                "application/json; charset=utf-8",

            "Access-Control-Allow-Origin":
                "*",

            "Access-Control-Allow-Methods":
                "GET, OPTIONS",

            "Access-Control-Allow-Headers":
                "Content-Type",

            "Cache-Control":
                "no-store, no-cache, must-revalidate",

            "Content-Length":
                Buffer.byteLength(
                    json
                )
        }
    );

    res.end(json);
}


/* =========================================================
   STATIC FILE SERVER
========================================================= */

function getMimeType(extension) {
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

        ".webp":
            "image/webp",

        ".gif":
            "image/gif",

        ".svg":
            "image/svg+xml",

        ".ico":
            "image/x-icon",

        ".txt":
            "text/plain; charset=utf-8"
    };

    return (
        mimeTypes[
            extension.toLowerCase()
        ] ||
        "application/octet-stream"
    );
}


/* =========================================================
   SERVER
========================================================= */

const server =
    http.createServer(
        async (req, res) => {
            try {
                const baseUrl =
                    `http://${req.headers.host || "localhost"}`;

                const requestUrlObject =
                    new URL(
                        req.url,
                        baseUrl
                    );


                /* ---------- OPTIONS ---------- */

                if (
                    req.method ===
                    "OPTIONS"
                ) {
                    res.writeHead(
                        204,
                        {
                            "Access-Control-Allow-Origin":
                                "*",

                            "Access-Control-Allow-Methods":
                                "GET, OPTIONS",

                            "Access-Control-Allow-Headers":
                                "Content-Type"
                        }
                    );

                    res.end();
                    return;
                }


                /* =================================================
                   GOOGLE RESOLVER API
                ================================================= */

                if (
                    requestUrlObject.pathname ===
                    "/resolve-google"
                ) {
                    if (
                        req.method !==
                        "GET"
                    ) {
                        sendJson(
                            res,
                            405,
                            {
                                error:
                                    "Method not allowed."
                            }
                        );

                        return;
                    }

                    const googleUrl =
                        requestUrlObject.searchParams.get(
                            "url"
                        );

                    if (!googleUrl) {
                        sendJson(
                            res,
                            400,
                            {
                                error:
                                    "Google URL is required."
                            }
                        );

                        return;
                    }

                    let parsed;

                    try {
                        parsed =
                            new URL(
                                googleUrl
                            );
                    } catch {
                        sendJson(
                            res,
                            400,
                            {
                                error:
                                    "Invalid Google URL."
                            }
                        );

                        return;
                    }

                    if (
                        !isAllowedGoogleHost(
                            parsed.hostname
                        )
                    ) {
                        sendJson(
                            res,
                            400,
                            {
                                error:
                                    "Only Google Maps links are allowed."
                            }
                        );

                        return;
                    }

                    try {
                        console.log(
                            "Resolving Google URL:",
                            googleUrl
                        );

                        const result =
                            await resolveGoogleLink(
                                googleUrl
                            );

                        console.log(
                            "Resolved business:",
                            result.businessName
                        );

                        sendJson(
                            res,
                            200,
                            result
                        );
                    } catch (error) {
                        console.error(
                            "Google resolver error:",
                            error.message
                        );

                        sendJson(
                            res,
                            500,
                            {
                                error:
                                    error.message ||
                                    "Could not resolve Google link."
                            }
                        );
                    }

                    return;
                }


                /* =================================================
                   STATIC FILES
                ================================================= */

                let pathname;

                try {
                    pathname =
                        decodeURIComponent(
                            requestUrlObject.pathname
                        );
                } catch {
                    res.writeHead(
                        400,
                        {
                            "Content-Type":
                                "text/plain; charset=utf-8"
                        }
                    );

                    res.end(
                        "Bad Request"
                    );

                    return;
                }

                if (
                    pathname === "/" ||
                    pathname === ""
                ) {
                    pathname =
                        "/index.html";
                }


                const rootDir =
                    path.resolve(
                        __dirname
                    );

                const filePath =
                    path.resolve(
                        rootDir,
                        "." + pathname
                    );


                /* ---------- PATH PROTECTION ---------- */

                if (
                    filePath !== rootDir &&
                    !filePath.startsWith(
                        rootDir +
                        path.sep
                    )
                ) {
                    res.writeHead(
                        403,
                        {
                            "Content-Type":
                                "text/plain; charset=utf-8"
                        }
                    );

                    res.end(
                        "Forbidden"
                    );

                    return;
                }


                /* ---------- READ FILE ---------- */

                fs.readFile(
                    filePath,
                    (error, content) => {
                        if (error) {
                            res.writeHead(
                                404,
                                {
                                    "Content-Type":
                                        "text/plain; charset=utf-8"
                                }
                            );

                            res.end(
                                "Not Found"
                            );

                            return;
                        }

                        const extension =
                            path.extname(
                                filePath
                            ).toLowerCase();

                        res.writeHead(
                            200,
                            {
                                "Content-Type":
                                    getMimeType(
                                        extension
                                    ),

                                "Cache-Control":
                                    "no-cache"
                            }
                        );

                        res.end(
                            content
                        );
                    }
                );

            } catch (error) {
                console.error(
                    "Server error:",
                    error
                );

                if (
                    !res.headersSent
                ) {
                    res.writeHead(
                        500,
                        {
                            "Content-Type":
                                "text/plain; charset=utf-8"
                        }
                    );
                }

                res.end(
                    "Internal Server Error"
                );
            }
        }
    );


/* =========================================================
   RAILWAY SERVER START
========================================================= */

server.listen(
    PORT,
    HOST,
    () => {
        console.log(
            `Server running on ${HOST}:${PORT}`
        );
    }
);