const axios = require("axios");

async function getGenre(genero) {
  let catalog = {
    data: [],
  };
  try {
    catalog = await axios.get(
      `https://appanimeplus.tk/meuanimetv-40.php?categoria=${genero}`
    );
  } catch (err) {
    console.error(err)
  }
  return catalog.data;
}

module.exports = { getGenre };
