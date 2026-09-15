const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;
const MAX_REDIRECTS = 10;

/* RESOLVE URL */
function requestUrl(targetUrl, redirectCount = 0) {
    return new Promise(function(resolve, reject) {

        if (redirectCount > MAX_REDIRECTS) {
            reject(new Error("Too many redirects"));
            return;
        }

        let parsed;

        try {
            parsed = new URL(targetUrl);
        } catch (error) {
            reject(new Error("Invalid URL"));
            return;
        }

        if (
            parsed.protocol !== "http:" &&
            parsed.protocol !== "https:"
        ) {
            reject(
                new Error("Only HTTP and HTTPS URLs are supported")
            );
            return;
        }

        const protocol =
            parsed.protocol === "https:" ? https : http;

        const request = protocol.get(
            targetUrl,
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
                    "Accept":
                        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language":
                        "en-US,en;q=0.9"
                }
            },
            function(response) {

                const status = response.statusCode || 0;
                const location = response.headers.location;

                /* FOLLOW REDIRECT */
                if (
                    status >= 300 &&
                    status < 400 &&
                    location
                ) {
                    const nextUrl = new URL(
                        location,
                        targetUrl
                    ).toString();

                    response.resume();

                    requestUrl(
                        nextUrl,
                        redirectCount + 1
                    )
                        .then(resolve)
                        .catch(reject);

                    return;
                }

                response.resume();

                if (
                    status >= 200 &&
                    status < 400
                ) {
                    resolve(targetUrl);
                    return;
                }

                reject(
                    new Error(
                        "Unable to resolve link. HTTP " +
                        status
                    )
                );
            }
        );

        request.on("error", reject);

        request.setTimeout(
            20000,
            function() {
                request.destroy(
                    new Error("Request timeout")
                );
            }
        );
    });
}

/* CLEAN NAME */
function cleanBusinessName(name) {

    if (!name) {
        return null;
    }

    try {
        name = decodeURIComponent(name);
    } catch (error) {
        // Keep original name.
    }

    name = name.replace(/\+/g, " ");
    name = name.replace(/\s+/g, " ");
    name = name.trim();

    return name || null;
}

/* EXTRACT BUSINESS NAME */
function extractBusinessName(targetUrl) {

    try {

        const parsed = new URL(targetUrl);

        const placeMatch =
            parsed.pathname.match(
                /\/place\/([^/]+)/i
            );

        if (placeMatch) {
            return cleanBusinessName(
                placeMatch[1]
            );
        }

        const q =
            parsed.searchParams.get("q");

        if (q) {
            return cleanBusinessName(q);
        }

        const query =
            parsed.searchParams.get("query");

        if (query) {
            return cleanBusinessName(query);
        }

        const destination =
            parsed.searchParams.get("destination");

        if (destination) {
            return cleanBusinessName(destination);
        }

        return null;

    } catch (error) {
        return null;
    }
}

/* RESOLVE GOOGLE LINK */
async function resolveGoogleLink(originalUrl) {

    const finalUrl =
        await requestUrl(originalUrl);

    const businessName =
        extractBusinessName(finalUrl);

    return {
        originalUrl: originalUrl,
        finalUrl: finalUrl,
        businessName: businessName
    };
}

/* JSON RESPONSE */
function sendJson(res, statusCode, data) {

    res.writeHead(
        statusCode,
        {
            "Content-Type":
                "application/json; charset=utf-8",
            "Cache-Control":
                "no-store",
            "Access-Control-Allow-Origin":
                "*"
        }
    );

    res.end(JSON.stringify(data));
}

/* SERVER */
const server = http.createServer(
    async function(req, res) {

        try {

            const requestUrlObject =
                new URL(
                    req.url,
                    "http://localhost:" + PORT
                );

            /* GOOGLE LINK RESOLVER */
            if (
                requestUrlObject.pathname ===
                "/resolve-google"
            ) {

                const targetUrl =
                    requestUrlObject.searchParams.get(
                        "url"
                    );

                if (!targetUrl) {

                    sendJson(
                        res,
                        400,
                        {
                            error:
                                "URL is required"
                        }
                    );

                    return;
                }

                let parsedTarget;

                try {

                    parsedTarget =
                        new URL(targetUrl);

                } catch (error) {

                    sendJson(
                        res,
                        400,
                        {
                            error:
                                "Invalid URL"
                        }
                    );

                    return;
                }

                if (
                    parsedTarget.protocol !== "http:" &&
                    parsedTarget.protocol !== "https:"
                ) {

                    sendJson(
                        res,
                        400,
                        {
                            error:
                                "Only HTTP and HTTPS URLs are supported"
                        }
                    );

                    return;
                }

                const result =
                    await resolveGoogleLink(
                        targetUrl
                    );

                if (!result.businessName) {

                    sendJson(
                        res,
                        400,
                        {
                            error:
                                "Business name could not be found from this link."
                        }
                    );

                    return;
                }

                sendJson(
                    res,
                    200,
                    result
                );

                return;
            }

            /* NORMAL FILES */
            let relativePath =
                requestUrlObject.pathname;

            if (relativePath === "/") {
                relativePath = "/index.html";
            }

            const safeRelativePath =
                path.normalize(relativePath);

            const filePath =
                path.join(
                    __dirname,
                    safeRelativePath
                );

            const rootPath =
                path.resolve(__dirname);

            const resolvedFilePath =
                path.resolve(filePath);

            if (
                resolvedFilePath !== rootPath &&
                !resolvedFilePath.startsWith(
                    rootPath + path.sep
                )
            ) {

                res.writeHead(403);
                res.end("Forbidden");
                return;
            }

            fs.readFile(
                resolvedFilePath,
                function(error, data) {

                    if (error) {

                        res.writeHead(
                            404,
                            {
                                "Content-Type":
                                    "text/plain; charset=utf-8"
                            }
                        );

                        res.end("File not found");
                        return;
                    }

                    let contentType =
                        "application/octet-stream";

                    if (
                        resolvedFilePath.endsWith(".html")
                    ) {
                        contentType =
                            "text/html; charset=utf-8";
                    }

                    if (
                        resolvedFilePath.endsWith(".js")
                    ) {
                        contentType =
                            "text/javascript; charset=utf-8";
                    }

                    if (
                        resolvedFilePath.endsWith(".css")
                    ) {
                        contentType =
                            "text/css; charset=utf-8";
                    }

                    if (
                        resolvedFilePath.endsWith(".json")
                    ) {
                        contentType =
                            "application/json; charset=utf-8";
                    }

                    res.writeHead(
                        200,
                        {
                            "Content-Type":
                                contentType,
                            "Cache-Control":
                                "no-cache"
                        }
                    );

                    res.end(data);
                }
            );

        } catch (error) {

            console.error(error);

            sendJson(
                res,
                500,
                {
                    error:
                        error.message ||
                        "Server error"
                }
            );
        }
    }
);

/* RAILWAY + LOCAL SERVER */
server.listen(
    PORT,
    "0.0.0.0",
    function() {
        console.log(
            "Mobile Simulator running on port " +
            PORT
        );
    }
);