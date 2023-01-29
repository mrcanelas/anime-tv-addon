const { addonBuilder } = require("stremio-addon-sdk");
const axios = require("axios");

const { streamHandler } = require("./lib/controller/stream");
const { metaHandler } = require("./lib/controller/meta");
const { catalogHandler } = require("./lib/controller/catalog");

const manifest = require("./manifest.json");
const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(catalogHandler);

builder.defineMetaHandler(metaHandler);

builder.defineStreamHandler(streamHandler);

module.exports = builder.getInterface();
