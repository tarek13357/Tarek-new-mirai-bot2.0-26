module.exports.config = {
    name: "murgi",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "FIXED VERSION",
    description: "long beautiful message system",
    commandCategory: "fun",
    usages: "@mention",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {

    const mentions = event.mentions || {};
    let uid = Object.keys(mentions)[0];

    if (!uid && event.messageReply) {
        uid = event.messageReply.senderID;
    }

    if (!uid) {
        return api.sendMessage(
            "👉 কাউকে @mention বা reply করে চেষ্টা করুন 😊",
            event.threadID,
            event.messageID
        );
    }

    const name = mentions[uid] || "friend";

    const msg =
`🌸 হ্যালো ${name} 👋

✨ আজ তোমাকে কিছু সুন্দর কথা বলতে চাই…

💖 তুমি একজন অসাধারণ মানুষ, যদিও তুমি সেটা সবসময় অনুভব করো না।

🌈 জীবন সবসময় সহজ না, কিন্তু প্রতিটা কষ্টই তোমাকে শক্তিশালী বানায়।

🔥 তুমি চাইলে নিজের জীবন পুরো বদলে ফেলতে পারো—শুধু বিশ্বাস রাখতে হবে নিজের উপর।

🌙 কখনো ভাববে না তুমি একা,
কারণ তোমার ভিতরে এমন শক্তি আছে যা তুমি নিজেও জানো না।

💫 ${name}, তোমার হাসিটা অনেকের দিন সুন্দর করে দিতে পারে।

🌟 তুমি হেরে যাওয়ার জন্য না, তুমি জেতার জন্য তৈরি।

💌 নিজের স্বপ্নকে কখনো ছোট মনে করো না,
একদিন সেটাই তোমাকে বড় জায়গায় নিয়ে যাবে।

🌸 সবসময় মনে রেখো—
তুমি গুরুত্বপূর্ণ, তুমি মূল্যবান, তুমি special ❤️

✨ শেষ কথা:
সবসময় হাসিখুশি থাকো, ভালো থাকো, আর নিজের উপর বিশ্বাস রাখো ${name} 😊`;

    return api.sendMessage(
        msg,
        event.threadID,
        event.messageID
    );
};
