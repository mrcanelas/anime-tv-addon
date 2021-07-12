const axios = require("axios");
const UserAgent = require("user-agents");
const HttpsProxyAgent = require("https-proxy-agent")
const userAgent = new UserAgent();
const httpsAgent = new HttpsProxyAgent({host: "gig-a01.ipvanish.com", port: 1080, auth: "CpQY8vh7mF:WURcSZK0r"})

//gig-a01.ipvanish.com:1080:CpQY8vh7mF:WURcSZK0r

const api = axios.create({
  baseURL: 'https://appanimeplus.tk/meuanimetv-40.php',
  httpsAgent,
});

const streamingDataR = Math.floor(Math.random() * 90000) + 10000;
const timeToMatch = (Date.now() / 1000) * 2;
const streamingDataToken = (timeToMatch * streamingDataR).toFixed()

function getRandomUserAgent() {
  return userAgent.random().toString();
}

async function getStream(videoId) {
  const resp = await api.get('', {
    params: {
      episodios: videoId,
      token: streamingDataToken,
      r: streamingDataR,
    },
    headers: {
      'X-Requested-With': 'br.com.meuanimetv',
      'user-agent': getRandomUserAgent(),
      'X-Auth':
        'VnM4ejB1dElLajZDZDhiSU02aGF0RmdDQWxXNDl3SEQzWjE2Ulg1K3ZOWjZkbjJXZjBqT2xnT0FVdnVwd2VjTEdkaS9KM0VlaHM4L1psc1J4R25SWHVpTGdjMVBvYUViTExhQXZpMzZGTytiVjh0SnQzUDVxL3ZVTDVZdkYwSDE1bFdFV1V4WGRwbUFFM0NJNjJOWEkvSndhbFVjZXNZYVRROGFKK2lkT2lEaU9nMElQT0hWTFlxNzlHajNPSVNhSjdnUDZTeldtbHVRaXlxMk5qSkFKV09NbDBIQkZhVTJYMitaaGtrMTd1OVJlSE5saVlGdUJOMk5TSGlBbzByYjFGeDN5N0Q2eHhjZFdzWS90b1JacFJtRGJ5QVdXLzBlTmhKK3UvVElGa3Q4T1Q5ODFZQjBzN0gxQVArZnY5NGo=',
    },
  })
  console.log(resp)
  return resp.data[0];
}

module.exports = { getStream };
