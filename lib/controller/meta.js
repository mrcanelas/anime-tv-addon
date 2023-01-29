const { getMeta } = require("../service/meta");
const { getEpisodes } = require("../service/episodes");

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

async function metaHandler(args) {
    let [idPrefixes, metaId] = args.id.split(":");
    let {
      category_name,
      category_image,
      category_description,
      category_genres,
      ano,
    } = await getMeta(metaId);
    const resp = await getEpisodes(metaId);
    const episodes = resp.map((el, index) => {
      var lastNumberRegex = /(\d+)[^\d]*$/;
      var lastNumberResult = lastNumberRegex.exec(el.title)
      if (lastNumberResult) {
        var ep = parseInt(lastNumberResult[0]);
        /**
        *   OVA Should appear on end
        */
        if(el.title.toLowerCase().includes("ova")) {
          ep = ep + 10000;
        }
      }
      else {
        var ep = index;
      }
      return {
        id: args.id + ":" + `${el.video_id}`,
        title: `${el.title}`,
        season: 1,
        episode: ep,
        overview: '',
        released: new Date("1970-01-01").addDays(ep + 1).toISOString(),
      };
    });
    var re = /\s*,\s*/;
    var genresList = category_genres.split(re);
    let metaObj = {
      id: args.id,
      type: `series`,
      name: `${category_name}`,
      genres: genresList,
      logo: 'https://i.imgur.com/o3EiCYb.png',
      poster: `https://cdn.appanimeplus.tk/img/${category_image}`,
      background: 'https://i.pinimg.com/originals/7a/7d/cf/7a7dcfa6474ec4cbfa81113eebe3c0dc.jpg',
      posterShape: "regular",
      description: `${category_description}`,
      releaseInfo: `${ano}`,
      videos: episodes,
    };
    return Promise.resolve({
      meta: metaObj,
    });
  }

  module.exports = { metaHandler };
