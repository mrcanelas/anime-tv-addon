const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const UserAgent = require("user-agents");
const userAgent = new UserAgent();

const formData = new FormData();
formData.append("file", fs.createReadStream("./lib/service/file.dat"));

function getRandomUserAgent() {
  return userAgent.random().toString();
}

const config = Object.assign({
  method: "post",
  url: "https://auth.appanimeplus.tk",
  data: formData,
  headers: {
    host: "auth.appanimeplus.tk",
    "user-agent": getRandomUserAgent(),
    "content-type": "application/octet-stream",
    accept: "*/*",
  },
});

async function getAuth() {
  const resp = await axios.request(config);
  console.log(resp);
}

module.exports = { getAuth };
