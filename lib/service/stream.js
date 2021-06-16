const axios = require("axios");

async function getStream(videoId) {
  const resp = await axios.get(
    `https://appanimeplus.tk/meuanimetv-40.php?episodios=${videoId}`,
    {
      headers: { "proxy-type": "brazil" },
      proxy: { protocol: "http", host: process.env.proxyloc, port: "800" },
    }
  );
  return resp.data[0];
}

module.exports = { getStream };
