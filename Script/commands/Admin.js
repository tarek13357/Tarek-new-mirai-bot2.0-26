module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "nazrul",
    description: "",
    commandCategory: "prefix",
    usages: "",
    cooldowns: 5,
    dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【hh:mm:ss】");
  
var callback = () => api.sendMessage({body:`𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗧𝗢𝗡
======================
𝗔𝗗𝗠𝗜𝗡 :𝙏𝘼𝙍𝙀𝙆
𝗔𝗗𝗗𝗥𝗘𝗦𝗦: 𝗡𝗔𝗢𝗚𝗔𝗢𝗡
======𝗖𝗢𝗡𝗧𝗔𝗖𝗧======
======================
𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: https://www.facebook.com/tarek.20.king
𝗠𝗔𝗦𝗦𝗘𝗡𝗚𝗘𝗥 𝗟𝗜𝗡𝗞:
https://m.me/tarek.20.king
𝗪𝗢𝗡𝗘𝗥: 𝙏𝘼𝙍𝙀𝙆
𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: https://www.facebook.com/tarek.20.king`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/100089702123718/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   };
