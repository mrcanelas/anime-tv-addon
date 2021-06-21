const axios = require("axios");
const UserAgent = require('user-agents');
const userAgent = new UserAgent();

function getRandomUserAgent() {
  return userAgent.random().toString();
}

async function getMeta(metaId) {
  try {
    const { data: meta } = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php?info=${metaId}`,
      {
        headers: { 
          "user-agent": getRandomUserAgent()
        }
      }
    );

    return meta[0];
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getMeta };
