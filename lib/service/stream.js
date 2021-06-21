const axios = require("axios");
const UserAgent = require('user-agents');
const userAgent = new UserAgent();

function getRandomUserAgent() {
  return userAgent.random().toString();
}

async function getStream(videoId) {
  const resp = await axios.get(
    `https://appanimeplus.tk/meuanimetv-40.php?episodios=${videoId}`,
    {
      headers: { 
        "user-agent": getRandomUserAgent(),
        "x-auth": "VnM4ejB1dElLajZDZDhiSU02aGF0RmdDQWxXNDl3SEQzWjE2Ulg1K3ZOWjZkbjJXZjBqT2xnT0FVdnVwd2VjTFV4YjFwbHROV3QyZkRuZjVOUzQrU2FuOW1lZjRnKytRY0RwOE00OTZzbDRNTUhuZFRweE1SdjlKTEkvQ0NMOTFjemZPckRkUHA3eHNhc1NsaEM0bWtKVnVWR2NIRFBWY0UzWmVPenZDeFl5SG13VUFtcHVIZE1naGFqejFBazk4a3RqakE5S1Nza3NjVXVYc0xOdjNQZ2oxQUFtcDg4OSt1SU9xV2tYWURIWm1rZlpwMG1HYWI1L0hpS3RiRGlJZVprVVdXR0EyZWFoWEhDNkF6ZEpVUkUwclVzbGNzZU5mSlpwb2FOUXV5V1ZxMDdDa3AyODl4RTZRT1JWeW1IOC9YS2dXZEVGalBQUmd4NDI1bDU4TlR3PT0=",
        "x-requested-with": "br.com.meuanimetv",
//        "proxy-type": "brazil"
      },
//      proxy: { protocol: "http", host: process.env.proxyloc, port: "800" },
    }
  );
  return resp.data[0];
}

module.exports = { getStream };
