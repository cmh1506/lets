import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = 3000;

const contentType = new Map();
contentType.set("html", "text/html");
contentType.set("js", "text/javascript");
contentType.set("ico", "image/x-icon");

http.createServer(handleRequest).listen(PORT, () =>
    console.log("HTTP server listening on port", PORT)
);

async function handleRequest(req, res) {
    const filepath = req.url.slice(1) ? "." + req.url : "./index.html";
    try {
        const file = await fs.readFile(path.join(process.cwd(), filepath));
        const ext = filepath.split(".").at(-1);
        if (!ext || !contentType.has(ext)) {
            res.writeHead(404);
            res.end();
        }
        else {
            res.writeHead(200, {"Content-Type": contentType.get(ext)});
            res.end(file);
        }
    }
    catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end();
    }
}