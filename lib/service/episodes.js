const axios = require("axios");

async function getEpisodes(metaId) {
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php=cat_id${metaId}`
    );

    const episodes = meta || [];
    return episodes;
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getEpisodes };
