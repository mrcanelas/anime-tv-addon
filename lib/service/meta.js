const axios = require("axios");

async function getMeta(metaId) {
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php?info=${metaId}`,
      {
        headers: { "proxy-type": "brazil" },
        proxy: { protocol: "http", host: process.env.proxyloc, port: "800" },
      }
    );

    return meta[0];
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getMeta };
