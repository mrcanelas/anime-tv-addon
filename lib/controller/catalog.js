const { getCatalog } = require("../service/catalog");
const { getSearch } = require("../service/search");
const { getGenre } = require("../service/genre");
const { getLatest } = require("../service/latest");
const perPage = 100;
function formatElement(el, episodeDetails=false) {
    if (episodeDetails === true) {
        return {
            id: `ab:${el.category_id}`,
            name: `${el.title}`,
            poster: `https://cdn.appanimeplus.tk/img/${el.category_image}`,
            posterShape: "regular",
            type: "anime",
          };
    }
    else {
        return {
            id: `ab:${el.id}`,
            name: `${el.category_name}`,
            poster: `https://cdn.appanimeplus.tk/img/${el.category_image}`,
            posterShape: "regular",
            type: "anime",
        };
    }
}
async function catalogHandler(args) {
    const skip = parseInt((args.extra || {}).skip || 0);
    if (args.extra.search) {
      const query = args.extra.search;
      const resp = await getSearch(query);
      const metas = resp.map(formatElement);
      return Promise.resolve({ metas: metas.slice(skip, skip + perPage) });
    } else if (args.extra.genre) {
      const genero = args.extra.genre;
      if (genero === "Lançamentos") {
        const resp = await getLatest();
        const metas = resp.filter(el => ! el.title.toLowerCase().includes("aviso")).map((el) => formatElement(el, true));
        return Promise.resolve({ metas: metas.slice(skip, skip + perPage) });
      }
      else {
        const resp = await getGenre(genero);
        const metas = resp.map(formatElement);
        return Promise.resolve({ metas: metas.slice(skip, skip + perPage) });
      }
    } else {
      const resp = await getCatalog();
      const metas = resp.map(formatElement);
      return Promise.resolve({ metas });
    }
  }

  module.exports = { catalogHandler };
