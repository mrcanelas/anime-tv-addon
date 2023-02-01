const metaDao = require("../database/meta-dao");
const { getStream } = require("../service/stream");

async function streamHandler(args) {
  const { type, id, extra, config } = args
  if(id.includes("ab:")) {
    return await parseStreams(id)
  }
  if(id.includes("kitsu:")) {
    const findId = await metaDao.getByKitsu(id)
    if(findId.length > 0) {
      return await parseStreams(findId[0].apId)
    }
  }
  if(id.includes("tt")) {
    const findId = await metaDao.getByImdb(id)
    if(findId.length > 0) {
      return await parseStreams(findId[0].apId)
    }
  }
}

async function parseStreams(apId) {
  let [idPrefixes, metaId, videoId] = apId.split(":");

  let { title, location, locationsd, locationhd } = await getStream(videoId);
  if (location?.length > 0) {
    var streams = [
      {
        id: apId,
        name: "Anime Brasil",
        title: `${title}\nOpção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
    ];
  } 
  if(location?.length > 0 && locationsd?.length > 0) {
    var streams = [
      {
        id: apId,
        name: "Anime Brasil",
        title: `${title}\nOpção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
      {
        id: apId,
        name: "Anime Brasil",
        title: `${title}\nOpção HD`,
        type: `anime`,
        url: `${locationsd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-HD`,
        },
      },
    ];
  }
  if(location?.length > 0 && locationsd?.length > 0 && locationhd?.length > 0) {
    var streams = [
      {
        id: apId,
        name: "Anime Brasil",
        title: `${title}\nOpção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
      {
        id: apId,
        name: "Anime Brasil",
        title: `${title}\nOpção HD`,
        type: `anime`,
        url: `${locationsd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-HD`,
        },
      },
      {
        id: apId,
        name: "Anime Brasil",
        title: `${title}\nOpção FHD`,
        type: `anime`,
        url: `${locationhd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-HD`,
        },
      },
    ];
  }
  return { streams };
}

module.exports = { streamHandler };
