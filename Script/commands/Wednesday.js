const fs = require("fs");
module.exports.config = {
	name: "wednesday",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "wednesday",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Wednesday")==0 || event.body.indexOf("wednesday")==0 || event.body.indexOf("wednesday")==0 || event.body.indexOf("wednesday")==0) {
		var msg = {
				body: "Wednesday 🧛🏻‍♀️",
				attachment: fs.createReadStream(__dirname + `/noprefix/wednesday.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🧛🏻‍♀️", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
