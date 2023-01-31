const axios = require("axios");
const { defaultOptionsWithProxy } = require("../../options");

async function getCatalog() {
  const options = defaultOptionsWithProxy()
  let catalog = {
    data: [],
  };
  try {
    catalog = await axios.get(
      "https://appanimeplus.tk/play-api.php?populares", options
    );
  } catch (err) {
    console.error(err)
  }
  return catalog.data;
}

module.exports = { getCatalog };
