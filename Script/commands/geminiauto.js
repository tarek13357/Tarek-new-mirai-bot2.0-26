const axios = require("axios");

module.exports.config = {
  name: "geminiauto",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Auto Gemini Chat",
  commandCategory: "AI",
  cooldowns: 2
};

module.exports.handleEvent = async function({ api, event }) {
  if (!event.body) return;

  const text = event.body;
  const botName = "baby";

  if (!text.toLowerCase().includes(botName)) return;

  const prompt = text.replace(new RegExp(botName, "ig"), "").trim();

  if (!prompt) {
    return api.sendMessage("😊 কী জানতে চাও?", event.threadID, event.messageID);
  }

  try {
    const apiKey = global.config.GEMINI_API_KEY;

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `তুমি একটি বন্ধুসুলভ বাংলা চ্যাটবট। সংক্ষিপ্ত ও ভদ্রভাবে উত্তর দাও। প্রশ্ন: ${prompt}`
              }
            ]
          }
        ]
      }
    );

    const reply =
      res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।";

    api.sendMessage(reply, event.threadID, event.messageID);

  } catch (err) {
    console.log(err.response?.data || err.message);
    api.sendMessage("❌ Gemini API Error!", event.threadID, event.messageID);
  }
};

module.exports.run = async () => {};
