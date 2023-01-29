const axios = require("axios");
const { defaultOptionsWithProxy } = require("../../options");

async function getEpisodes(metaId) {
  const options = defaultOptionsWithProxy()
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/play-api.php?cat_id=${metaId}`, options
    );

    const episodes = meta || [];
    return episodes;
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getEpisodes };
