const axios = require("axios");
const { defaultOptionsWithProxy } = require("../../options");

async function getStream(videoId) {
  const options = defaultOptionsWithProxy()
  const resp = await axios.get(
    `https://appanimeplus.tk/play-api.php?episodios=${videoId}`, options);
  return resp.data[0];
}

module.exports = { getStream };
