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
    return axios.get('https://appanimeplus.tk/play-api.php?letra=', defaultOptionsWithProxy()).then((res) => {
        const allAnimes = res.data
        allAnimes.map((anime, index) => limiter.schedule(async () => {
            const kitsuId = await getkitsuId(anime.category_name)
            if (kitsuId) {
                const kitsuMetadata = await getKitsuMetadata(kitsuId)
                if (kitsuMetadata.meta.videos) {
                    const episodes = await getEpisodes(anime.id)
                    if (episodes) {
                        episodes.map(async (episode) => {
                            const parseEpisode = parse(episode.title)
                            if (parseEpisode.episode) {
                                const findEpside = kitsuMetadata.meta.videos.find(episode => episode.episode === parseEpisode.episode)
                                if (findEpside) {
                                    MetaDAO.addIfAbsent({
                                        title: episode.title,
                                        apId: `ab:${anime.id}:${episode.video_id}`,
                                        kitsuId: findEpside.id,
                                        imdbId: `${findEpside?.imdb_id}:${findEpside?.imdbSeason}:${findEpside?.imdbEpisode}`
                                    })
                                } else {
                                    MetaDAO.addIfAbsent({
                                        title: episode.title,
                                        apId: `ab:${anime.id}:${episode.video_id}`,
                                        kitsuId: kitsuMetadata.meta.videos[0].id,
                                        imdbId: kitsuMetadata.meta.videos[0]?.imdb_id
                                    })
                                }
                            }
                        })
                    }
                }
            }
        }))
    })
}

async function getkitsuId(query) {
    try {
        return axios.get(kitsuEndPoint + "catalog/anime/kitsu-anime-list/search=" + encodeURIComponent(query) + ".json", defaultOptionsWithProxy())
            .then(res => {
                return res.data.metas[0] ? res.data.metas[0].id : undefined
            })
    } catch (error) {
        console.error(error)
    }

}

async function getKitsuMetadata(kitsuId) {
    try {
        return axios.get(kitsuEndPoint + "meta/series/" + kitsuId + ".json", defaultOptionsWithProxy()).then(res => res.data);
    } catch (error) {
        console.error(error)
    }
}

async function getEpisodes(animeId) {
    try {
        return axios.get("https://appanimeplus.tk/play-api.php?cat_id=" + animeId, defaultOptionsWithProxy()).then(res => res.data);
    } catch (error) {
        console.error(error)
    }
}

module.exports = { mappingImdb }