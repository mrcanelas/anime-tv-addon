const metaDao = require("../database/meta-dao");
const { getStream } = require("../service/stream");

async function streamHandler(args) {
  const { type, id, extra, config } = args
  if(id.includes("ab:")) {
    return await parseStreams(id)
  }
  if(id.includes("kitsu:")) {
    const findId = await metaDao.getByKitsu(id)
    if(findId[0]) {
      return await parseStreams(findId[0].apId)
    }
  }
  if(id.includes("tt")) {
    const findId = await metaDao.getByImdb(id)
    if(findId[0]) {
      return await parseStreams(findId[0].apId)
    }
  }
}

async function parseStreams(apId) {
  let [idPrefixes, metaId, videoId] = apId.split(":");

  let { title, location, locationsd, locationhd } = await getStream(videoId);
  if (locationsd === "") {
    var streams = [
      {
        id: apId,
        title: `Opção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
    ];
  } else {
    var streams = [
      {
        id: apId,
        title: `Opção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
      {
        id: apId,
        title: `Opção HD`,
        type: `anime`,
        url: `${locationsd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-HD`,
        },
      },
    ];
  }
  return { streams };
}

module.exports = { streamHandler };
