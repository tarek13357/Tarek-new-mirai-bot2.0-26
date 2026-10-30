module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "nazrul",
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

const MEDIA_EXT = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".mkv", ".webm"];
// true = নতুন সদস্য যোগ দিলেও এই ফাইল স্বাগতম পাঠাবে। Sahu-র wlcome.js রাখলে এটা false করো (নইলে দুবার যাবে)।
const WELCOME_MEMBERS = true;

function randomMedia(dir) {
  try {
    const fsx = require("fs");
    if (!fsx.existsSync(dir)) return null;
    const files = fsx.readdirSync(dir).filter(f => MEDIA_EXT.includes(f.substring(f.lastIndexOf(".")).toLowerCase()));
    if (!files.length) return null;
    return require("path").join(dir, files[Math.floor(Math.random() * files.length)]);
  } catch (e) { return null; }
}
function streamOf(p) { return p ? require("fs").createReadStream(p) : undefined; }

module.exports.run = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
    return api.sendMessage("চলে এসেছি আমি পিচ্চি তারেক তোমাদের মাঝে 😌", event.threadID, () => api.sendMessage({body:`╔════•| ✿ |•════╗\nআ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ\n╚════•| ✿ |•════╝
________________________
𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐢-𝐠𝐫𝐨𝐮𝐩-🖤🤗\n𝐈 𝐰𝐢𝐥𝐥 𝐚𝐥𝐰𝐚𝐲𝐬 𝐬𝐞𝐫𝐯𝐞 𝐲𝐨𝐮 𝐈𝐧 𝐬𝐡𝐚 𝐀𝐥𝐥𝐚𝐡 🌺❤️-!!
________________________\n\n𝐓𝐨 𝐯𝐢𝐞𝐰 𝐚𝐧𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝

${global.config.PREFIX}Help\n${global.config.PREFIX}Info\n${global.config.PREFIX}Admin
________________________\n★যে্ঁকো্ঁনো্ঁ অ্ঁভি্ঁযো্ঁগ্ঁ অ্ঁথ্ঁবা্ৃ হে্ঁল্প্ঁ এ্ঁর্ঁ জ্ঁন্য্ঁ এ্ঁড্ঁমি্ঁন্ঁ 𝐓𝐚𝐫𝐞𝐤 𝐒𝐚𝐫𝐤𝐚𝐫 কে্ঁ ন্ঁক্ঁ ক্ঁর্ঁতে্ঁ পা্ঁরে্ঁন্ঁ★\n𝐌𝐞𝐬𝐬𝐞𝐠𝐞𝐫:  https://m.me/tarek.20.king\n𝐈𝐦𝐨 𝐎𝐫 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: ***********
\n⋆✦⎯⎯⎯⎯⎯⎯⎯⎯✦⋆\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ➢ 𝐈𝐬𝐥𝐦𝐚𝐢𝐜𝐤 𝐂𝐡𝐚𝐭`, attachment: streamOf(require("fs").existsSync(join(__dirname, "cache", "botjoin.mp4")) ? join(__dirname, "cache", "botjoin.mp4") : randomMedia(join(__dirname, "cache", "joinGif", "randomgif")))} ,threadID));
  }
  else {
    if (!WELCOME_MEMBERS) return;
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `${threadID}.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0, msg, formPush;

      for (const id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.logMessageData.addedParticipants[id].userFbId });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "╔════•| ✿ |•════╗\nআ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ\n╚════•| ✿ |•════╝\nহা্ঁসি্ঁ ম্ঁজা্ঁ ঠা্ঁট্টা্ঁয়্ঁ ব্ঁন্ধু্ঁত্ব্ঁ হ্ঁবে্ঁ চি্ঁর্ঁকা্ঁলী্ঁন্ঁ বে্ঁচে্ঁ থা্ঁকু্ঁক্ঁ ব্ঁন্ধু্ঁত্ব্ঁ\nভা্ঁলো্ঁবা্ঁসা্ঁর্ঁ স্ঁম্প্ঁর্কে্ঁ আ্ঁজী্ঁব্ঁন্ঁ\n\n {name} \n\nআ্ঁপ্ঁনি্ঁ এ্ঁই্ঁ গ্রু্ঁফে্ঁর্ঁ {soThanhVien} না্ঁম্বা্ঁর্ঁ মে্ঁম্বা্ঁর্ঁ\n\n {threadName}\n\n🥀 গ্রুঁপেঁরঁ পঁক্ষঁ থেঁকেঁ আঁপঁনাঁকেঁ স্বাঁগঁতঁমঁ♥\n\n🥰🥀ᏔᎬᏞᏟϴᎷᎬ 🥀🥰 \n    ┌────♣─────┐\n        ♦ 𝐓𝐚𝐫𝐞𝐤 𝐒𝐚𝐫𝐤𝐚𝐫  ♦\n    └────♣─────┘\n\n⋆✦⎯⎯⎯⎯⎯⎯⎯⎯✦⋆\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ➢ 𝐈𝐬𝐥𝐦𝐚𝐢𝐜𝐤 𝐂𝐡𝐚𝐭" : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

      const randomFile = randomMedia(join(path, "randomgif")) || (existsSync(join(path, "welc.gif")) ? join(path, "welc.gif") : null);
      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
      else if (randomFile) formPush = { body: msg, attachment: createReadStream(randomFile), mentions };
      else formPush = { body: msg, mentions };

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
        }
        
