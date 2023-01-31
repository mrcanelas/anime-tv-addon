const addonInterface = require("./addon");
const { scheduleJob } = require("node-schedule");
const { serveHTTP } = require("stremio-addon-sdk");
const { connect, PORT } = require("./lib/database/connect");
const { mappingImdb } = require("./mappingImdb");

serveHTTP(addonInterface, { port: PORT })
    .then(res => {
        connect().then((uri) => {
            console.log(`MONGO URI: ${uri}`)
            scheduleJob('* * 3 * * ', function () {
                console.log('Mapping');
                mappingImdb()
            });
        }).catch(console.error)
    })