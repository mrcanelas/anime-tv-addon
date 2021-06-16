const axios = require("axios");

async function getSearch(query) {
  let catalog = {
    data: [],
  };
  try {
    catalog = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php?search=${query}`,
      {
        headers: { "proxy-type": "brazil" },
        proxy: { protocol: "http", host: process.env.proxyloc, port: "800" },
      }
    );
  } catch (err) {
    console.error(err)
  }
  return catalog.data;
}

module.exports = { getSearch };
