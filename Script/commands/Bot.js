const axios = require("axios").create({ timeout: 4000 });

const apiList = "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json";
// API ঠিকানা ১০ মিনিট মনে রাখে, প্রতি মেসেজে GitLab থেকে আনে না (এতেই দেরি হচ্ছিল)
// true = তুমি যেকোনো কথা লিখলেই বট উত্তর দেবে; false = শুধু bot/baby/jan... লিখলে
const REPLY_TO_ALL = true;
const _lastReply = new Map();
let _apiCache = { url: null, at: 0 };
const getMainAPI = async () => {
  const now = Date.now();
  if (_apiCache.url && now - _apiCache.at < 10 * 60 * 1000) return _apiCache.url;
  try {
    const url = (await axios.get(apiList, { timeout: 3000 })).data.simsimi;
    if (url) { _apiCache = { url, at: now }; return url; }
  } catch (e) {}
  if (_apiCache.url) return _apiCache.url; // নতুন আনতে না পারলে পুরোনোটাই
  throw new Error("API server unreachable");
};

module.exports.config = {
 name: "baby",
 version: "1.0.4",
 hasPermssion: 0,
 credits: "ULLASH",
 description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
 commandCategory: "Chat",
 usages: "[message/query]",
 cooldowns: 0,
 prefix: true
};

const babyLoopGuard = {
 settings: {
  rapidGapMs: 3000,
  maxRapidChain: 5,
  windowMs: 30 * 1000,
  maxTriggersInWindow: 9,
  suspectAfter: 4,
  muteMs: 10 * 60 * 1000
 },
 threads: new Map(),

 getThread(threadID) {
  let st = this.threads.get(threadID);
  if (!st) {
   st = {
    lastTriggerAt: 0,
    rapidChain: 0,
    triggerTimes: [],
    pausedUntil: 0,
    lastNoticeAt: 0,
    senderFastStreak: new Map(),
    suspectedBots: new Map()
   };
   this.threads.set(threadID, st);
  }
  return st;
 },

 isTrigger(text) {
  return /^(baby|bot|bby|jan|xan|জান|বট|বেবি)(\s|$)/i.test(text);
 },

 check(api, event, isBabyTrigger) {
  const now = Date.now();
  const threadID = event.threadID;
  const senderID = String(event.senderID || "");
  const st = this.getThread(threadID);

  try {
   if (senderID && senderID === String(api.getCurrentUserID())) return false;
  } catch {}

  if (st.pausedUntil) {
   if (now < st.pausedUntil) return false;
   st.pausedUntil = 0;
   st.rapidChain = 0;
   st.triggerTimes = [];
  }

  const prevSuspect = st.suspectedBots.get(senderID);
  if (prevSuspect && now - prevSuspect >= this.settings.muteMs) {
   st.suspectedBots.delete(senderID);
   st.senderFastStreak.set(senderID, 0);
  }

  if (isBabyTrigger) {
   const gap = st.lastTriggerAt ? now - st.lastTriggerAt : Infinity;
   st.lastTriggerAt = now;

   if (gap < this.settings.rapidGapMs) {
    st.rapidChain++;
    const streak = (st.senderFastStreak.get(senderID) || 0) + 1;
    st.senderFastStreak.set(senderID, streak);
    if (streak >= this.settings.suspectAfter) st.suspectedBots.set(senderID, now);
   } else {
    st.rapidChain = 0;
    st.senderFastStreak.set(senderID, 0);
   }

   st.triggerTimes.push(now);
   while (st.triggerTimes.length && now - st.triggerTimes[0] > this.settings.windowMs) {
    st.triggerTimes.shift();
   }

   const loopDetected =
    st.rapidChain >= this.settings.maxRapidChain ||
    st.triggerTimes.length > this.settings.maxTriggersInWindow;

   if (loopDetected) {
    st.pausedUntil = now + this.settings.muteMs;
    st.rapidChain = 0;
    st.triggerTimes = [];
    if (now - st.lastNoticeAt > this.settings.muteMs) {
     st.lastNoticeAt = now;
     const mins = Math.max(1, Math.round(this.settings.muteMs / 60000));
     api.sendMessage(
      `🤖 Bot-to-Bot loop detected!\n` +
      `এই গ্রুপে দুইটি bot-এর মধ্যে automated reply chain শনাক্ত হয়েছে। Spam রোধে baby-র automated reply ${mins} মিনিটের জন্য বন্ধ রাখা হলো।\n` +
      `(কাউকে ban/kick করা হয়নি — manual command ও অন্যান্য feature স্বাভাবিক কাজ করবে।)`,
      threadID
     );
    }
    return false;
   }
  }

  if (st.suspectedBots.has(senderID)) return false;

  return true;
 }
};

module.exports.run = async function ({ api, event, args, Users }) {
 try {
 const uid = event.senderID;
 const senderName = await Users.getNameUser(uid);
 const rawQuery = args.join(" ");
 const query = rawQuery.toLowerCase();
 const simsim = await getMainAPI();

 if (!query) {
 const ran = ["Bolo baby", "hum"];
 const r = ran[Math.floor(Math.random() * ran.length)];
 return api.sendMessage(r, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 });
 }

 const command = args[0].toLowerCase();

 if (["remove", "rm"].includes(command)) {
 const parts = rawQuery.replace(/^(remove|rm)\s*/i, "").split(" - ");
 if (parts.length < 2) return api.sendMessage("Use: remove [Question] - [Reply]", event.threadID, event.messageID);
 const [ask, ans] = parts.map(p => p.trim());
 const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (command === "list") {
 const res = await axios.get(`${simsim}/list`);
 if (res.data.code === 200) {
 return api.sendMessage(
 `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\nDeveloper: ${res.data.author}`,
 event.threadID, event.messageID
 );
 } else return api.sendMessage(`Error: ${res.data.message}`, event.threadID, event.messageID);
 }

 if (command === "edit") {
 const parts = rawQuery.replace(/^edit\s*/i, "").split(" - ");
 if (parts.length < 3) return api.sendMessage("Use: edit [Q] - [Old] - [New]", event.threadID, event.messageID);
 const [ask, oldReply, newReply] = parts.map(p => p.trim());
 const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (command === "teach") {
 const parts = rawQuery.replace(/^teach\s*/i, "").split(" - ");
 if (parts.length < 2) return api.sendMessage("Use: teach [Q] - [Reply]", event.threadID, event.messageID);
 const [ask, ans] = parts.map(p => p.trim());
 const groupID = event.threadID;
 let groupName = event.threadName ? event.threadName : "";
 try {
 if (!groupName && groupID != uid) {
 const threadInfo = await api.getThreadInfo(groupID);
 if (threadInfo?.threadName) groupName = threadInfo.threadName;
 }
 } catch {}

 let teachUrl = `${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}&groupID=${encodeURIComponent(groupID)}`;
 if (groupName) teachUrl += `&groupName=${encodeURIComponent(groupName)}`;
 const res = await axios.get(teachUrl);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
 const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const rep of replies) {
 await new Promise(resolve => {
 api.sendMessage(rep, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }

 } catch (err) {
 return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
 try {
 const senderName = await Users.getNameUser(event.senderID);
 const replyText = event.body ? event.body.toLowerCase() : "";
 if (!replyText) return;

 if (!babyLoopGuard.check(api, event, true)) return;

 const simsim = await getMainAPI();
 const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
 const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

 for (const rep of replies) {
 await new Promise(resolve => {
 api.sendMessage(rep, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }

 } catch (err) {
 return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
 try {
 const raw = event.body ? event.body.toLowerCase().trim() : "";
 if (!raw) return;
 // bot/baby/jan... দিয়ে শুরু না হলে কিছুই করবে না (নেটওয়ার্ক কলও না)
 const isTrig = /^(babu|bot|bby|jan|xan|জান|বট|বেবি)(\s|$)/i.test(raw);
 if (!isTrig) {
  if (!REPLY_TO_ALL) return;
  if (raw.length < 2) return;
  if (global.config && global.config.PREFIX && raw.startsWith(global.config.PREFIX)) return; // কমান্ড হলে বাদ
  const tk = String(event.threadID), nowT = Date.now();
  if (nowT - (_lastReply.get(tk) || 0) < 2000) return; // গ্রুপে ২ সেকেন্ডে সর্বোচ্চ ১টি
  _lastReply.set(tk, nowT);
 }

 if (!babyLoopGuard.check(api, event, babyLoopGuard.isTrigger(raw))) return;

 const senderName = await Users.getNameUser(event.senderID);
 const senderID = event.senderID;

const greetings = [
        "বট না ডেকে বস তারেকের প্রেমে পড়ো💋😽",
        "আমার বস তারেক কে ভালোবাসো নাকি?🙈❤️",
        "আমি আবাল দের সাথে কথা বলি না,ok😒",
        "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
        "Bolo Babu, তুমি কি আমার বস Tarek কে ভালোবাসো? 🙈💋",
        "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑",
        "হ্যা বলো😒,তোমার জন্য কি করতে পারি😐😑?",
        " আরে জান কিচ্ছে রাগ করছো?🙂",
        "I love you janu🥰🌚",
        "আরে Bolo আমার জান নুরা ফাতিহা,কেমন আছো?😚",
        "আজ বট বলে অসম্মান করছিস,😰😿",
        "কিরে গ্রুপের মেয়েরা কই😼",
        "চুপ থাক ,নাই তো তোর দাত ভেঙে দিবো",
        "কিরে দিনে কয়বার?😷",
        "আমাকে বট না বলে , বস তারেক কে জানু বল😘",
        "কিরে তরা কি ব্যস্ত আছোছ😋",
        "আরে বলদ এতো ডাকিস কেন🤬",
        "oishi দেখছি খুব হট😘",
        "ইস যদি একটু করতে পারতাম💋😒",
        "হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘",
        "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস 😉😋🤣",
        "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂",
        "আমাকে ডেকো না,আমি বস তারেক এর সাথে ব্যাস্ত আছি",
        "কি হলো , মিস্টেক করচ্ছিস নাকি🤣",
        "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
        " জান একটু দেখাও না🙂💋",
        "ওই কালকে একটু দেখা করিস তো 😈",
        " ওই মাতারি আমার প্রেমে পড়বা 😏",
        "আমরা বড় হয়ে মানুষ চিনি না মানুষ চিনতে চিনতে বড় হয়🤩",
        "হুম বলো কি বলবে😒",
        "বলো কি করতে পারি তোমার জন্য",
        "আমি তো এই গ্ৰুপের মেয়েদের প্রেমে অন্ধ কিছু দেখি না😎",
        "কিরে শুনলাম তুই নাকি প্রতি রাতে বিয়ের জন্য কান্না করছ",
        "বলো জানু 🌚",
        "সুন্দরী মেয়েদের ঠুটের নিচে তিল থাকে🙈😘",
        "তুমি নাকি আমার উপর ক্রাশ খাইছো সত্যি নাকি😘",
        "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
        "jan আসো প্রেম করি🌚😬",
        "হুম জান তোমার অইখানে উম্মাহ😷😘",
        "আসো দেখা করি প্রেম হয়লে হয়বো না হয়লে বিয়ে করবো.!🥰",
        "উপরে সৌদি আরব নিচে আমেরিকা এখন কার মেয়েদের অবস্থা এমন🙂👀",
        "আমাকে এতো না ডেকে বস তারেক কে একটা গফ দে 🙄",
        "আমাকে এতো ডাকছ কেন 🤭🙈",
        "🌻🌺💚-আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻",
        "উঁচু উঁচু ভবন দেখলে ধারণা করা যায় কতোজন শ্রমিক লেগেছিলো তার এই ভবন টা তৈরি করতে🌻",
        " তুমি ফুল আমি কলি ইনবক্সে আসো মনের কথা বলি 😽🫶🌺",
        "তোমারে প্রচুর ভাল্লাগে সময় মতো প্রপোজ করমু সিট খালি রাইখো💝😽",
        "বট বলে না জানু বল জানু😡😈",
        "জান তোমাকে উম্মাহ🙊🙆‍♂",
        "আজকে শুধু তোমাকে'কে চুম্মাবো🤧",
        "১ বড় না ২ বড় এই গ্ৰেপের মেয়েদের মন বড়🌺🤤💦",
        "মেয়ে হলে বস তারেক কে নক দেও😪🤧😭",
        "স্বপ্নে শুধু তোমাকে কে দেখি🙂💝🌺🌻",
        "আমাদের ময়মনসিংহের ছেলে মেয়েদের যে ভাব অন্য জেলার ছেলে মেয়েরা দেখলেই বলে দেখ আইতাছে নবাব😝🌻",
        "জান তুমি বদলে গেছো🙂",
        "বিয়ে করুন নিজে মা হন অন্য কে বাবা হওয়ার সযুক করে দিন🖤🌼",
        "___,🪄✨ তুমি চাঁদ আমি আলো __!! তোমাকে লাগে অনেক ভালো__!!🙃🌻",
        "-চেহারার মুগ্ধতার চেয়ে ব্যবহার এর মুগ্ধতা বেশি দীর্ঘ‘স্থায়ী>❤️‍🩹",
        "লাঙ্গের আসা কয়রা তোমার ভাতারের ভাত চাঙ্গে",
        "কিরে মাগির দালাল ভালো আছোচ🥴",
        "জান আমার বস তারেক কে বিয়ে করবা-🙊😘🥳",
        " মাঝে মাঝে Crush এর মায়ের কথা ভাবি কি জিনিস Download দিছে খালায়🤤💦",
        "oii-🥺🥹-এক🥄 চামচ ভালোবাসা দিবা-🤏🏻🙂",
        "-Tumar অপ্রয়োজনীয় bandhubi ke amar hate tule daw 🫴🥱🐰🍒",
        "-একদিন প্রচুর খুঁজবে আমায়,,বিশ্বাস না হলে ৫০০ টাকা ধার দিয়ে দেখো🌚🤧",
        "-অনুমতি দিলে তোরে একটা থাপ্পড় দেই🐸😾🔪",
        "-লঙ্গি খুইলা খারাই মু***তি... তুমি আমার হইতা যদি... ভাইসা যাইতাম  মু*তের জোয়ারে....হারিকেন জ্বলাইয়া খুজি..  তোমারে তোমারে...😹😹🤧",
        "-𝗢𝗶𝗶 আন্টি-🙆‍♂️-তোমার মেয়ে চোখ মারে-🥺🥴🐸",
        "তাকাই আছো কেন চুমু দিবা-🙄🐸😘",
        "আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇",
        "-জান একটু দেখাবা😌🙆‍♂️🤗",
        "কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻",
        "দিনশেষে এই গ্রুপের মেয়ে গুলোই সুন্দর☹️🤧",
        "-আসো পাখি তোমাকে একটু আদর করি-🤧🥱🌻",
        "-•⎯͢⎯⃝❤️ তো্ঁমা্ঁর্ঁ ড্ঁং দে্ঁখে্ঁ ম্ঁনে্ঁ হ্ঁয়্ঁ  কো্ঁলে্ঁ ব্ঁসে্ঁ‌ বা্ঁদা্ঁম্ঁ খা্ঁই্ঁ 🫵🏻   🫶🏻 /(/•⎯͢⎯⃝🩷🪽",
        "কিরে বন্ধু মনে আছে তুই না খেলে সে খেতো না😂🙏",
        " কোটি টাকার হীরেকে খুঁজতে পাঁচ টাকার মোমবাতিটা কাজে লাগে সুতরাং জীবনে কোনদিন কাউকে ছোট মনে করো না 🙂🙂🙂🐸🥲",
        "-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️",
        "—মেয়ে হলে আমার বস তারেক কে চুম্মা দে🙈🐸🤗",
        "—কালকে মনে হয় অনেকেই আমাকে মোনাজাতে চাইছে 😌কেমন জানি টান টান অনুভব করতেছি 🙂🥱🤗🙆‍♂️",
        " বহু দিন মেয়েদের হাত ধরি নাই😌💜",
        "দিন শেষে বিদেশি কাকুরা জিতে যায় 🐸🤗",
        "আমাকে নিয়ে কে কি ভাবছে I don't care কারণ এই সুব্র সমাজে হয়তো আমি নষ্ট কিন্তু আমার সমাজে আমিই শ্রেষ্ঠ🖤🙂",
        "-দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি-🙂😿🌸",
        "এক বিছানায় আর কতো দিন ঘুমাবো🤣😼",
        "খারাপ বলার আগে মিশে দেখো ভালোবেসে ফেলবা!!🥰😊",
        "হুদাই আমারে শয়তানে লারে-😝😑☹️",
        "-𝗜 𝗟𝗢𝗩𝗘 𝗬𝗢𝗨- রাজি হয়ে যাও চকলেট দিমু🐸",
        "-দুনিয়ার সবাই প্রেম করে আর মানুষ শুধু আমার বস তারেক সরকার কে সন্দেহ করে💦",
        "-আর কতো দিন হাত মারবি😂🤧",
        "-তুমি খুব কিউট🙈🥱",
        "-ওই দেখ এক পাগলা ঢাকে আমাকে🙂😽🫶",
        "-ইস কেউ যদি বলতো তারেক বস শুধু আমার💜🌸",
        "-ওই আপু তোমার মনের সাইজ কত👀",
        " আসো পাখি তোমাকে পেগনেট করে দেই🙈🤰",
        " জান তোমার অলিতে গলিতে উম্মাহ🫦👀",
        "কি'রে গ্রুপে দেখি একটাও বেডি নাই-🤦‍🥱💦",
        " সুন্দরী মেয়েরাও পাদে🥴😑😏",
        "ও মিম ও মিম তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রিম🥱🐸",
        "-আজ থেকে আর কাউকে পাত্তা দিমু না🤰"
      ];


 if (
 raw === "babu" || raw === "bow" || raw === "bby" ||
 raw === "jan" || raw === "xan" || raw === "জান" ||
 raw === "বট" || raw === "বেবি"
 ) {
 const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
 return api.sendMessage(randomReply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: senderID,
 type: "simsimi"
 });
 }
 }, event.messageID);
 }

 {
 const query = isTrig ? raw.replace(/^baby\s+|^bot\s+|^bby\s+|^jan\s+|^xan\s+|^জান\s+|^বট\s+|^বেবি\s+/i, "").trim() : raw;
 if (!query) return;

 let replies;
 try {
  const simsim = await getMainAPI();
  const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
  replies = (Array.isArray(res.data.response) ? res.data.response : [res.data.response]).filter(Boolean);
 } catch (e) { replies = []; }
 // সার্ভার ধীর/বন্ধ হলে সঙ্গে সঙ্গে নিজের উত্তর
 if (!replies.length) replies = [greetings[Math.floor(Math.random() * greetings.length)]];

 for (const rep of replies) {
 await new Promise(resolve => {
 api.sendMessage(rep, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: senderID,
 type: "simsimi"
 });
 }
 resolve();
 }, event.messageID);
 });
 }
 }

 } catch {}
};
                        
