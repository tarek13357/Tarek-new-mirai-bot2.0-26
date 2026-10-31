module.exports.config = {
    name: "idea",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "NAZRUL (enhanced safe version)",
    description: "Mention user and send long fun motivational messages",
    commandCategory: "fun",
    usages: "@mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({ api, event }) {
    const mention = Object.keys(event.mentions)[0];

    if (!mention) {
        return api.sendMessage(
            "👉 দয়া করে কাউকে @mention করুন 😊",
            event.threadID,
            event.messageID
        );
    }

    const name = event.mentions[mention];
    const tag = [{ id: mention, tag: name }];

    const send = (msg, delay) => {
        setTimeout(() => {
            api.sendMessage(msg, event.threadID);
        }, delay);
    };

    send(`🌟 ${name} কে খুঁজে পাওয়া গেছে...`, 1000);

    send({ body: `😊 হ্যালো ${name}!\nআজ তোমার জন্য একটু সময় নেওয়া হলো...`, mentions: tag }, 4000);

    send({ body: `✨ জানো ${name}, জীবন সবসময় সহজ না হলেও সুন্দর হয় যদি তুমি হাসতে শেখো।`, mentions: tag }, 8000);

    send({ body: `💫 ${name}, তুমি যেটা স্বপ্ন দেখো সেটা একদিন বাস্তবে পরিণত হতে পারে—শুধু ধৈর্য ধরো।`, mentions: tag }, 12000);

    send({ body: `🌈 ছোট ছোট ভালো কাজগুলোই মানুষকে বড় করে তোলে, ${name} মনে রেখো।`, mentions: tag }, 16000);

    send({ body: `🔥 কখনো হাল ছেড়ো না ${name}, কারণ তোমার ভিতরে এমন শক্তি আছে যা তুমি নিজেও জানো না।`, mentions: tag }, 20000);

    send({ body: `🌙 রাত যতই অন্ধকার হোক ${name}, সকাল কিন্তু আসবেই।`, mentions: tag }, 24000);

    send({ body: `💖 তুমি যেমনই হও ${name}, তুমি গুরুত্বপূর্ণ এবং মূল্যবান।`, mentions: tag }, 28000);

    send({ body: `🌟 শেষ কথা ${name}...\nসবসময় নিজের উপর বিশ্বাস রাখো। তুমি পারবে!`, mentions: tag }, 32000);
};
