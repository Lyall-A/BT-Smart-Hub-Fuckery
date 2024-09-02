const fs = require("fs");

const fileName = "router ports.txt";
const file = fs.readFileSync(fileName, "utf-8");

file.split("\n").filter(i => !i.startsWith("#") && i).forEach(console.log)