const axios = require("axios");
const { defaultOptionsWithProxy } = require("../../options");

async function getMeta(metaId) {
  const options = defaultOptionsWithProxy()
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/play-api.php?info=${metaId}`, options
    );

    return meta[0];
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getMeta };
