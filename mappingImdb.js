const Bottleneck = require("bottleneck");
const axios = require("axios");
const { defaultOptionsWithProxy } = require("./options");
const { parse } = require('parse-torrent-title');
const MetaDAO = require("./lib/database/meta-dao");
const kitsuEndPoint = "https://anime-kitsu.strem.fun/"

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 2000
});

async function mappingImdb() {
    return axios.get('https://appanimeplus.tk/play-api.php?latest', defaultOptionsWithProxy()).then((res) => {
        const allAnimes = res.data
        allAnimes.map((anime, index) => limiter.schedule(async () => {
            const parseEpisode = parse(anime.title)
            const kitsuId = await getkitsuId(parseEpisode.title)
            if (kitsuId) {
                const kitsuMetadata = await getKitsuMetadata(kitsuId)
                if (kitsuMetadata && kitsuMetadata.meta.videos) {
                    const findEpside = kitsuMetadata.meta.videos.find(episode => episode.episode === parseEpisode.episode)
                    if (findEpside) {
                        MetaDAO.addIfAbsent({
                            title: anime.title,
                            apId: `ab:${anime.category_id}:${anime.video_id}`,
                            kitsuId: findEpside.id,
                            imdbId: `${findEpside?.imdb_id}:${findEpside?.imdbSeason}:${findEpside?.imdbEpisode}`
                        })
                    } else {
                        MetaDAO.addIfAbsent({
                            title: anime.title,
                            apId: `ab:${anime.category_id}:${anime.video_id}`,
                            kitsuId: kitsuMetadata.meta.videos[0].id,
                            imdbId: kitsuMetadata.meta.videos[0]?.imdb_id
                        })
                    }
                }
            }
        }))
    })
}

async function getkitsuId(query) {
    return axios.get(kitsuEndPoint + "catalog/anime/kitsu-anime-list/search=" + encodeURIComponent(query.toLowerCase().replace(/dublado/g | /[(]/g | /[)]/g | /[-]/g, '')) + ".json", defaultOptionsWithProxy())
        .then(res => {
            return res.data.metas[0] ? res.data.metas[0].id : undefined
        })
        .catch(err => console.log('Erro ao solicilitar kitsuId'))
}

async function getKitsuMetadata(kitsuId) {
    return axios.get(kitsuEndPoint + "meta/series/" + kitsuId + ".json", defaultOptionsWithProxy())
        .then(res => res.data)
        .catch(err => console.log('Erro ao solicilitar kitsuMetadata'))
}

async function getEpisodes(animeId) {
    return axios.get("https://appanimeplus.tk/play-api.php?cat_id=" + animeId, defaultOptionsWithProxy())
        .then(res => res.data)
        .catch(err => console.log('Erro ao solicilitar Episodios'))
}

module.exports = { mappingImdb }