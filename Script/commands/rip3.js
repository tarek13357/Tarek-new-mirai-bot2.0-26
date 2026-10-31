module.exports.config = {
    name: "rip3",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "nazrul (fixed)",
    description: "মেনশন করা ব্যক্তির নাম ও ছবি দিয়ে মজার ছবি",
    commandCategory: "fun",
    usages: "[@mention]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "canvas": ""
    }
};

// লেখা লাইনে ভাঙার ফাংশন (ক্যানভাসের প্রস্থ অনুযায়ী)
function wrapText(ctx, text, maxWidth) {
    if (ctx.measureText(text).width < maxWidth) return [text];
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
            const temp = words[0];
            words[0] = temp.slice(0, -1);
            if (split) words[1] = temp.slice(-1) + words[1];
            else { split = true; words.splice(1, 0, temp.slice(-1)); }
        }
        if (ctx.measureText(line + words[0]).width < maxWidth) line += words.shift() + " ";
        else { lines.push(line.trim()); line = ""; }
        if (words.length === 0) lines.push(line.trim());
    }
    return lines;
}

async function getImage(axios, urls) {
    for (const url of urls) {
        try {
            const r = await axios.get(url, { responseType: "arraybuffer", timeout: 20000 });
            const type = String(r.headers && r.headers["content-type"] || "");
            if (r.data && r.data.length > 500 && (!type || type.startsWith("image"))) return Buffer.from(r.data);
        } catch (e) {}
    }
    return null;
}

module.exports.run = async function ({ api, event, Users }) {
    const { threadID, messageID, senderID } = event;
    const fs = require("fs-extra");
    const path = require("path");
    const axios = require("axios");
    const { loadImage, createCanvas } = require("canvas");

    const cacheDir = path.join(__dirname, "cache");
    const outPath = path.join(cacheDir, `rip3_${Date.now()}_${Math.floor(Math.random() * 1000)}.png`);

    try {
        fs.ensureDirSync(cacheDir);

        // মেনশন দিলে সে, না দিলে নিজে
        const targetID = Object.keys(event.mentions || {})[0] || senderID;
        const name = (await Users.getNameUser(targetID)) || "User";

        // ব্যাকগ্রাউন্ড ও প্রোফাইল ছবি
        const bgBuf = await getImage(axios, [
            "https://i.imgur.com/QHK6Qyb.jpeg",
            "https://imgur.com/QHK6Qyb.jpeg"
        ]);
        const avBuf = await getImage(axios, [
            `https://graph.facebook.com/${targetID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
        ]);

        // ব্যাকগ্রাউন্ড না পেলে সাধারণ কালো ব্যাকগ্রাউন্ড
        let bg = null;
        if (bgBuf) { try { bg = await loadImage(bgBuf); } catch (e) {} }
        const W = bg ? bg.width : 1280;
        const H = bg ? bg.height : 720;

        const canvas = createCanvas(W, H);
        const ctx = canvas.getContext("2d");
        if (bg) ctx.drawImage(bg, 0, 0, W, H);
        else { ctx.fillStyle = "#1c1c1c"; ctx.fillRect(0, 0, W, H); }

        // ছবির অবস্থান ও নামের অবস্থান (দরকারে এই সংখ্যাগুলো বদলাও)
        const AV = { x: 252, y: 54, w: 200, h: 212 };
        const NAME = { x: AV.x + AV.w / 2, y: AV.y + AV.h + 32 }; // ছবির ঠিক নিচে, মাঝখানে

        // প্রোফাইল ছবি (না পেলে ধূসর বক্স)
        let av = null;
        if (avBuf) { try { av = await loadImage(avBuf); } catch (e) {} }
        if (av) ctx.drawImage(av, AV.x, AV.y, AV.w, AV.h);
        else { ctx.fillStyle = "#888888"; ctx.fillRect(AV.x, AV.y, AV.w, AV.h); }

        // নাম লেখা
        ctx.font = "400 23px Arial, 'Noto Sans Bengali', sans-serif";
        ctx.fillStyle = bg ? "#000000" : "#ffffff";
        ctx.textAlign = "center";
        const lines = wrapText(ctx, name, 1160);
        lines.forEach((l, i) => ctx.fillText(l, NAME.x, NAME.y + i * 30));

        fs.writeFileSync(outPath, canvas.toBuffer());

        return api.sendMessage(
            {
                body: `${name}\nএনি আমাদের গুরু সবাই প্রনাম করো😁😁\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐈𝐬𝐥𝐚𝐦𝐢𝐜𝐤 𝐂𝐡𝐚𝐭`,
                attachment: fs.createReadStream(outPath)
            },
            threadID,
            () => { try { fs.unlinkSync(outPath); } catch (e) {} },
            messageID
        );
    } catch (err) {
        console.log("[rip3 error]", err && err.message || err);
