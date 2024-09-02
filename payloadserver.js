const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Sending payload");
    res.setHeader("Content-Type", "text/javascript");
    res.end(fs.readFileSync("payload.js", "utf-8"));
});

server.listen(1234, () => console.log(`Listening at :1234`));