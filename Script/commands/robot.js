const axios = require("axios");
const fs = require("fs");
const request = require("request");
 
const link = [
  "https://i.imgur.com/4Rt4rvF.mp4",
 
];
 
module.exports.config = {
  name: "noprefix19",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "nazrul",
  description: "",
  commandCategory: "no prefix", 
  usages: "🥵",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};
 
module.exports.handleEvent = async ({ api, event, Threads }) => {
  const content = event.body ? event.body : '';
    const body = content.toLowerCase();
  if (body.startsWith("robot")) {
    const rahad = [
       "আমি একটা মেসেঞ্জার রোবট আমাকে তৈরি করা হয়েছে আমার বস এর নাম তারেক সরকার যদি কোনো প্রোয়োজন হয় আমার বস কে নক করেন"
    
    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];
 
    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2025.mp4")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2025.mp4"), event.messageID);
    
    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2025.mp4")).on("close", () => callback());
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
  if (typeof data["🥵"] === "undefined" || data["🥵"]) data["🥵"] = false;
  else data["🥵"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["🥵"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
