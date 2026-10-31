const axios = require("axios");
const fs = require("fs");
const request = require("request");
 
const link = [
  "https://drive.google.com/uc?id=1mr3J170GKgskA5hIrDgmr6K_nqNpLrga",
"https://drive.google.com/uc?id=1mz8bM06L8uJj_BqXNUdsM4BEHjT7CF1B",
"https://drive.google.com/uc?id=1n9kpxMN7gxaIM_57bJXAg7l1TjwCywFR",
"https://drive.google.com/uc?id=1mvuslVX2pL6e772BTucitYDL5ef2DqGj",
"https://drive.google.com/uc?id=1mx6uWSPuuIOF30KtehN0VVikibRUajOZ",
 
];
 
module.exports.config = {
  name: "🎧",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Islamick Cyber Chat",
  description: "auto reply to 🎧",
  commandCategory: "noprefix",
  usages: "🎧",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
 
module.exports.handleEvent = async ({ api, event, Threads }) => {
  const content = event.body ? event.body : '';
    const body = content.toLowerCase();
  if (body.startsWith("🎧")) {
    const rahad = [
      "🖤🎧",
      "🖤🎧"
    
    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];
 
    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/CYBER/Cyber.mp3")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/CYBER/Cyber.mp3"), event.messageID);
    
    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/CYBER/Cyber.mp3")).on("close", () => callback());
    return requestStream;
  }
};
 
module.exports.languages = {
  "vi": {
    "on": "Dùng sai cách rồi lêu lêu",
    "off": "sv ngu, đã bão dùng sai cách",
    "successText": `🧠`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};
 
module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["🎧"] === "undefined" || data["🎧"]) data["🎧"] = false;
  else data["🎧"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["🎧"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
