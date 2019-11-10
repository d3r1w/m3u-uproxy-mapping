const express = require("express");
const m3u = require("./m3u");
const process = require("process");

const SERVICE_PORT = parseInt(process.env["M3U_UPROXY_MAPPING_SERVICE_PORT"]) || 3000;

function start() {
    const app = express();
    app.get("/m3u", async function (request, response) {
        try {
            response
                .type("text")
                .send(await m3u.mapToProxyAddress());
        } catch (e) {
            response.status(500).send("Unable to receive or process the m3u file.");
        }
    });

    app.listen(SERVICE_PORT, function () {
        console.log(`M3U uproxy mapping service listening on port ${SERVICE_PORT}!`);
    })
}

module.exports = {
    start
};
