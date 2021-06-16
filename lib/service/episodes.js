const axios = require("axios");

async function getEpisodes(metaId) {
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php=${metaId}`,
      {
        headers: { "proxy-type": "brazil" },
        proxy: { protocol: "http", host: process.env.proxyloc, port: "800" },
      }
    );

    const episodes = meta || [];
    return episodes;
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getEpisodes };
