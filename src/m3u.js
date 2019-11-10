const request = require("request-promise-native");
const url = require("url");
const process = require("process");

const UDPROXY_HOSTNAME = process.env["M3U_UPROXY_MAPPING_SERVICE_UDPROXY_HOSTNAME"] || "localhost";
const UDPROXY_PORT = parseInt(process.env["M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PORT"]) || 9978;
const UDPROXY_PROTOCOL = process.env["M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PROTOCOL"] || "http";
const M3U_PROVIDER_URL = process.env["M3U_UPROXY_MAPPING_SERVICE_ORIGINAL_FILE_URL"] || "";

const M3U_SPLIT_CHAR = "\n";

let m3uCache = {
    ttl: parseInt(process.env["M3U_UPROXY_MAPPING_SERVICE_CACHE_TTL"]) || 60**3,
    createdAt: 0,
    file: ""
};

/**
 *
 * @param {string} text
 */
function multicastToHttp(text) {
    if (text.startsWith("#") || typeof text !== "string" || text.length === 0) {
        return text;
    }

    const multiCastUrl = url.parse(text);

    // http://ip:port/cmd/mgroup_address:mgroup_port/
    return url.format({
        protocol: UDPROXY_PROTOCOL,
        port: UDPROXY_PORT,
        hostname: UDPROXY_HOSTNAME,
        pathname: `/${multiCastUrl.protocol.replace(":", "")}/${multiCastUrl.hostname}:${multiCastUrl.port}`
    });
}

function isCacheValid() {
    return (m3uCache.createdAt + m3uCache.ttl) >= Math.floor(Date.now() / 1000);
}

async function getM3uFile() {

    if(isCacheValid()) {
        return m3uCache.file;
    }

    const file = (await request(M3U_PROVIDER_URL))
        .split(M3U_SPLIT_CHAR)
        .map(multicastToHttp)
        .join(M3U_SPLIT_CHAR);

    const newCache = Object.assign({}, m3uCache);
    newCache.file = file;
    newCache.createdAt = Math.floor(Date.now() / 1000);
    m3uCache = newCache;

    return file;

}

module.exports = {
  mapToProxyAddress: getM3uFile
};
