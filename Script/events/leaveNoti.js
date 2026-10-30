module.exports.config = {
  name: "leavenoti",
  eventType: ["log:unsubscribe"],
  version: "2.1.0",
  credits: "Mirai Team + SHAHADAT SAHU (merged)",
  description: "Leave notification with video + antiout",
  dependencies: { "fs-extra": "", "path": "" }
};

const MEDIA_EXT = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".mkv", ".webm"];

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  const { createReadStream, existsSync, readdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const threadID = event.threadID;
  const leftID = event.logMessageData.leftParticipantFbId;

  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data || {};
  const name = global.data.userName.get(leftID) || await Users.getNameUser(leftID);
  const botName = global.config.BOTNAME || "MESSENGER CHAT BOT";
  const isSelfLeave = event.author == leftID;

  // ভিডিও/গিফ খোঁজার ফোল্ডার (আগে যেটা পাবে সেটা থেকে র‍্যান্ডম)
  const pickMedia = (folders) => {
    for (const f of folders) {
      try {
        if (!existsSync(f)) continue;
        const files = readdirSync(f).filter(x => MEDIA_EXT.includes(x.substring(x.lastIndexOf(".")).toLowerCase()));
        if (files.length) return join(f, files[Math.floor(Math.random() * files.length)]);
      } catch (e) {}
    }
    return null;
  };
  const sendWith = (body, mediaPath) =>
    api.sendMessage(mediaPath ? { body, attachment: createReadStream(mediaPath) } : { body }, threadID);

  const tarekLeave = join(__dirname, "cache", "leaveGif", "randomgif");

  // অ্যান্টিআউট: নিজে লিভ নিলে আবার এড করবে (আগের Sahu সিস্টেমই)
  if (isSelfLeave && data.antiout !== false) {
    return api.addUserToGroup(leftID, threadID, async (error) => {
      if (error) {
        return sendWith(`সরি বস, ${name} কে আবার এড করতে পারলাম না। 😔\nসম্ভবত উনি বটকে ব্লক করেছে অথবা তার Privacy Settings-এর কারণে এড করা যাচ্ছে না।\n\n◈━━꯭${botName}꯭━━◈`,
          pickMedia([join(__dirname, "Uhas", "add"), tarekLeave]));
      }
      return sendWith(`আরে ভাই! 😭\n\nএডমিনের অনুমতি ছাড়া লিভ?\nএত সাহস কই পেলি? 😂\n\nযা, তোরে আবার গ্রুপে ঢুকায় দিলাম! 🤣\n\n◈━━꯭${botName}꯭━━◈`,
        pickMedia([join(__dirname, "Uhas", "leave"), tarekLeave]));
    });
  }

  // সাধারণ লিভ / কিক (তারেকের আগের মেসেজ + ভিডিও)
  const type = isSelfLeave ? "  এখানে তারেক এর মিরাই বট থাকতে তুই left নিবি 😺😸😹🤣😹 \n✢━━━━━━━━━━━━━━━✢\n ----❖----- 𝙏𝙖𝙧𝙚𝙠  -----❖----" : "তোমার এই গ্রুপে থাকার কোনো যোগ্যাতা নেই😡।\nতাই তোমারে লাথি মেরে গ্রুপ থেকে বের করে দেওয়া হলো🤪। WELLCOME REMOVE🤧 \n✢━━━━━━━━━━━━━━━✢\n ----❖----- 𝙏𝙖𝙧𝙚𝙠  -----❖----";
  let msg = (typeof data.customLeave == "undefined") ? "হায়রে কপাল {name} {type} " : data.customLeave;
  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{botName}/g, botName);
  return sendWith(msg, pickMedia([tarekLeave, join(__dirname, "Uhas", isSelfLeave ? "leave" : "remove")]));
};
