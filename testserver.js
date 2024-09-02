const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`Request from ${req.socket.remoteAddress}! URL: ${req.url}, Headers: ${JSON.stringify(req.headers)}`);
  res.end("Hello!");
});

server.listen(5498, () => console.log("Listening"));
