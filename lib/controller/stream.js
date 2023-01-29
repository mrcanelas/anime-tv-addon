const { getStream } = require("../service/stream");

async function streamHandler(args) {
  let [idPrefixes, metaId, videoId] = args.id.split(":");
  let { title, location, locationsd, locationhd } = await getStream(videoId);
  if (locationsd === "") {
    var streams = [
      {
        id: args.id,
        title: `Opção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
    ];
  } else if (locationhd === "") {
    var streams = [
      {
        id: args.id,
        title: `Opção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
      {
        id: args.id,
        title: `Opção HD`,
        type: `anime`,
        url: `${locationsd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-HD`,
        },
      },
    ];
  } else {
    var streams = [
      {
        id: args.id,
        title: `Opção SD`,
        type: `anime`,
        url: `${location.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-SD`,
        },
      },
      {
        id: args.id,
        title: `Opção HD`,
        type: `anime`,
        url: `${locationsd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-HD`,
        },
      },
      {
        id: args.id,
        title: `Opção FHD`,
        type: `anime`,
        url: `${locationhd.replace("\r\n", "")}`,
        behaviorHints: {
          bingeGroup: `AnimeBrasil-${metaId}-FHD`,
        },
      },
    ];
  }
  return { streams };
}

module.exports = { streamHandler };
