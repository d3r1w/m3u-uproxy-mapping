# m3u-uproxy-mapping
Maps multicast groups to uproxy http urls.

## Configuration
The following environment variables can be set to configure the service:
- `M3U_UPROXY_MAPPING_SERVICE_PORT` port which is used by the service. Defaults to port 3000.
- `M3U_UPROXY_MAPPING_SERVICE_CACHE_TTL` the maximal valid age for a cached m3u document in seconds.
- `M3U_UPROXY_MAPPING_SERVICE_ORIGINAL_FILE_URL` a url which points to the original provider m3u file 
which contains the multicast address entries.
- `M3U_UPROXY_MAPPING_SERVICE_UDPROXY_HOSTNAME` the ip or hostname of the udproxy service.
- `M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PORT` the port of the udproxy service.
- `M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PROTOCOL` the protocol of the udproxy usually http or https.
Defaults to **http**.

### Development env
The environment variable can be set via `.env` file for development.
Example .env file:
```
M3U_UPROXY_MAPPING_SERVICE_PORT=3000
M3U_UPROXY_MAPPING_SERVICE_CACHE_TTL=60
M3U_UPROXY_MAPPING_SERVICE_ORIGINAL_FILE_URL=https://api.init7.net/tvchannels.m3u
M3U_UPROXY_MAPPING_SERVICE_UDPROXY_HOSTNAME=localhost
M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PORT=9978
M3U_UPROXY_MAPPING_SERVICE_UDPROXY_PROTOCOL=http
```
 

## Installation & Usage
- Clone the project.
- `nvm install`
- `npm ci`
- Configure your environment (See section "Configuration")
- `npm start`




