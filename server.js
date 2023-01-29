const { serveHTTP } = require("stremio-addon-sdk");

const getInterface = require("./addon");

serveHTTP(getInterface, { port: process.env.PORT || 7000 })
