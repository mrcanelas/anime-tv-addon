const axios = require("axios");
const UserAgent = require('user-agents');
const userAgent = new UserAgent();

function getRandomUserAgent() {
  return userAgent.random().toString();
}

async function getEpisodes(metaId) {
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php?cat_id=${metaId}`,
      {
        headers: { 
          "user-agent": getRandomUserAgent()
        }
      }
    );

    const episodes = meta || [];
    return episodes;
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getEpisodes };
