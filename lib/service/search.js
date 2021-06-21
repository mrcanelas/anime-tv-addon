const axios = require("axios");
const UserAgent = require('user-agents');
const userAgent = new UserAgent();

function getRandomUserAgent() {
  return userAgent.random().toString();
}

async function getSearch(query) {
  let catalog = {
    data: [],
  };
  try {
    catalog = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php?search=${query}`,
      {
        headers: { 
          "user-agent": getRandomUserAgent()
        }
      }
    );
  } catch (err) {
    console.error(err)
  }
  return catalog.data;
}

module.exports = { getSearch };
