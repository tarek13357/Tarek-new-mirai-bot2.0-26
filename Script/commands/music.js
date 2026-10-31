const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ytSearch = require("yt-search");

const MAX_BYTES = 25 * 1024 * 1024; // মেসেঞ্জারে পাঠানোর সীমা ~25MB

function loadYtdl() {
  for (const m of ["@distube/ytdl-core", "ytdl-core"]) {
    try { return require(m); } catch (e) {}
  }
  return null;
}

// ১) আগের API দিয়ে চেষ্টা
async function downloadViaApi(videoId, type, file) {
  const apiUrl = `https://priyansh-ai.onrender.com/youtube?id=${videoId}&type=${type}&apikey=priyansh-here`;
  const r = await axios.get(apiUrl, { timeout: 20000 });
  const downloadUrl = r.data && r.data.downloadUrl;
  if (!downloadUrl) throw new Error("API থেকে ডাউনলোড লিংক পাওয়া যায়নি");
  const res = await axios.get(downloadUrl, { responseType: "arraybuffer", timeout: 120000, maxContentLength: MAX_BYTES * 2 });
  fs.writeFileSync(file, Buffer.from(res.data));
}

// ২) API কাজ না করলে সরাসরি YouTube থেকে
async function downloadViaYtdl(videoUrl, type, file) {
  const ytdl = loadYtdl();
  if (!ytdl) throw new Error("ytdl-core প্যাকেজ নেই");
  await new Promise((resolve, reject) => {
    const opts = type === "audio"
      ? { filter: "audioonly", quality: "highestaudio", highWaterMark: 1 << 25 }
      : { quality: "18", highWaterMark: 1 << 25 }; // 360p ভিডিও (ছোট সাইজ)
    const stream = ytdl(videoUrl, opts);
    const out = fs.createWriteStream(file);
    stream.on("error", reject);
    out.on("error", reject);
    out.on("finish", resolve);
    stream.pipe(out);
  });
}

module.exports = {
  config: {
    name: "music",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 (fixed)",
    description: "Download YouTube song from keyword search",
    commandCategory: "Media",
    usages: "[songName] [audio|video]",
    cooldowns: 5,
    dependencies: {
      "axios": "",
      "yt-search": "",
    },
  },

  run: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const reply = (m) => api.sendMessage(m, threadID, messageID);

    let type = "audio";
    if (args.length > 1 && (args[args.length - 1] === "audio" || args[args.length - 1] === "video")) {
      type = args.pop();
    }
    const songName = args.join(" ").trim();
    if (!songName) return reply(`গানের নাম লিখুন।\nউদাহরণ: ${global.config.PREFIX}music tum hi ho\nভিডিও চাইলে: ${global.config.PREFIX}music tum hi ho video`);

    // "অপেক্ষা করুন" মেসেজ (callback দিয়ে, যাতে messageID নিশ্চিত পাওয়া যায়)
    let waitID = null;
    api.sendMessage("✅ খুঁজছি, একটু অপেক্ষা করুন...", threadID, (err, info) => { if (!err && info) waitID = info.messageID; }, messageID);
    const removeWait = () => { try { if (waitID) { const r = api.unsendMessage(waitID); if (r && r.catch) r.catch(() => {}); } } catch (e) {} };

    const ext = type === "audio" ? "mp3" : "mp4";
    const file = path.join(__dirname, `music_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`);
    const cleanup = () => { try { if (fs.existsSync(file)) fs.unlinkSync(file); } catch (e) {} };

    try {
      const results = await ytSearch(songName);
      if (!results || !results.videos || !results.videos.length) throw new Error("কোনো রেজাল্ট পাওয়া যায়নি");
      const top = results.videos.find(v => v.seconds && v.seconds <= 900) || results.videos[0];

      api.setMessageReaction("⌛", messageID, () => {}, true);

      let apiErr = null;
      try {
        await downloadViaApi(top.videoId, type, file);
      } catch (e) {
        apiErr = e;
        cleanup();
        await downloadViaYtdl(top.url, type, file);
      }

      const size = fs.statSync(file).size;
      if (!size) throw new Error("ফাইল খালি এসেছে");
      if (size > MAX_BYTES) throw new Error("ফাইলটা ২৫MB এর বেশি, পাঠানো যাবে না");

      api.setMessageReaction("✅", messageID, () => {}, true);
      return api.sendMessage(
        {
          body: `🖤 Title: ${top.title}\n\nআপনার ${type === "audio" ? "গান 🎧" : "ভিডিও 🎬"}:`,
          attachment: fs.createReadStream(file),
        },
        threadID,
        () => { cleanup(); removeWait(); },
        messageID
      );
    } catch (error) {
      cleanup();
      removeWait();
      console.error("[music] error:", error && error.message || error);
      api.setMessageReaction("❌", messageID, () => {}, true);
      return reply(`গান নামাতে পারলাম না: ${error && error.message || error}`);
    }
  },
};
