/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "t",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Tarek sarker",
  description: "Random Love Ig",
  commandCategory: "media",
  usages: "ig",
  cooldowns: 11,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = ["=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 Khan Rahul RK (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n🐰🍒শী্ঁত্ঁ শী্ঁত্ঁ ভা্ঁব্ঁ কি্ঁসে্ঁর্ঁ জা্ঁনি্ঁ এ্ঁক্ঁটা্ঁ অ্ঁভা্ঁব্ঁ_🙊🙈\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Khan Rahul RK (✷‿✷) ",
" === 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n  --❖-- 𝐈𝐭'𝐬 Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n--ღღ🦋🖤✨-\n\n--𝐋𝐨𝐯𝐞 𝐢'𝐬 𝐁𝐞𝐚𝐮𝐭𝐢𝐟𝐮𝐥 __☺️🦋✨\n\n--𝐥𝐟 𝐭𝐡𝐞 𝐥𝐨𝐯𝐞𝐝 𝐨𝐧𝐞 𝐢𝐬 𝐫𝐢𝐠𝐡𝐭..!🦋🍁💫\n\n-ভালোবাসা সুন্দর ___,🖤🦋\n\n- যদি প্রিয় মানুষটি সঠিক হয়....!☺️🖤🙂✨🌼\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷) ",
"___=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n❥◎⃝! শূন্যতায় ভাসি🙃 \n\n❥কখনো হাসি -😁💚_আবার কাঁদি!-😅\n\n❥বেলা শেষে 🌌শূন্যতায় জড়িয়ে ও পূর্ণতা খুঁজি😊❤\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖--𝐈𝐭'𝐬 Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n ❥»̶̶͓͓͓̽̽̽⑅⃝✺❥᭄❥\n\n___💚__পৃথিবীটা আজ...\n\nমিথ্যে মায়াতে ভরা...!💚🌺\n\n____🥀_তাই তো পৃথীবীর মানুষ আজ....!\n\nঅভিনয়ের সেরা...👎🥀\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n💜🔐🌈 ___\n\n- 𝗧𝗵𝗶𝘀 𝗮𝗯𝗼𝘂𝘁 𝗹𝗶𝗻𝗲-!! 😽🧡✨\n\n🍁_সবাই তো খুশি চায়_আর আমি প্রতিটা খুশিতে তোমাকে চাই⚜️— -!!-) 😊🖤\n\n___💜🔐🌈\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n>🐰✨𝑻𝒉𝒊𝒔 𝒍𝒊𝒏𝒆 𝒊𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖🖤🌸\n\n___চোখের দেখায় নয়,মনের দেখায় ভালবাসি!!😇✨\n\n- কাছে থাকো কিংবা দূরে,তোমাকে ভেবেই হাসি!!🖤🐰\n\n💖🦋\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n:༅༎💙🦋\n༆𝐓𝐡𝐢𝐬 𝐚𝐛𝐨𝐮𝐭 𝐥𝐢𝐧𝐞_⚠︎🙅🏻‍♂️✨\n\n😽︵۵মানুষ! হচ্ছে!বৃষ্টির!মতো!Life a ! অনেক মানুষ !আসবে!অনেক মানুষ !যাবে!💔🥰\n\n:༅༎💙🦋 সঠিক!মানুষটা!ঠিকই!ছায়া!হয়ে!পাশে!থাকবে -/ ఌ︵💚🌻\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n:(-𝙄 𝙖𝙢 𝘼𝙙𝙙𝙞𝙘𝙩𝙚𝙙 𝙏𝙤👀🙈\n\n_')𝙈𝙮 𝙁𝙖𝙫𝙤𝙧𝙞𝙩𝙚 𝙋𝙚𝙧𝙨𝙤𝙣..!\n\n🐰🦋 -(^আমি আমার প্রিয় মানুষটার প্রতি আসক্ত >!💖🔐🍭)😇\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",

"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n𝙗𝙚𝙡𝙞𝙚𝙫𝙚 𝙩𝙝𝙞𝙨 𝙡𝙞𝙣𝙚-!!🦋🐭\n\n🐰' —'পারফেক্ট' কাউকে পাবার থেকে'কাউকে' পারফেক্ট' বানিয়ে নিতে পারাটা' বড় অর্জন'--)🌼💜\n\n___🍒🖇️✨___\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」  ===\n  --❖-- 𝐈𝐭'𝐬 Tarek Tk (✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n°🐹💙🍒\n\n_𝗧𝗿𝘂𝘀𝘁 𝗺e 🔐💚\n°\n\n__!!☁️✨🌺আপনাকে পাওয়ার দাবি!আমি মৃত্যুর পরও ছাড়বো না,,🔐💚 🙂\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : Tarek (✷‿✷)" 
 ];
;
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://i.postimg.cc/9fFpcqps/received-1530688927440051.jpg",
"https://i.postimg.cc/nhfBhQH0/received-2110074349178381.jpg",
"https://i.postimg.cc/BZ8m8H00/received-3067372163408320.jpg",
"https://i.postimg.cc/W1V8fyJN/received-3392602251068431.jpg",
"https://i.postimg.cc/mrb9Qf19/received-487670710014913.jpg",
"https://i.postimg.cc/52mgcmww/received-633849745180668.jpg",
"https://i.postimg.cc/KYJMfqtH/received-711105677155213.jpg",
"https://i.postimg.cc/0QjJBYf2/received-881512006437250.jpg",
"https://i.postimg.cc/8PMw4GcX/received-928288425051525.jpg",
"https://i.postimg.cc/d06cG7Sm/Aahista-Aahista-Aesthetic-Status-Hum-Tumhare-Hue-Saaj-Bhatt-New-Song-2022-efxstatus.jpg",
"https://i.postimg.cc/50tdgxhc/received-3015925521884384.jpg",
"https://i.postimg.cc/52mgcmww/received-633849745180668.jpg",
"https://i.postimg.cc/0QjJBYf2/received-881512006437250.jpg",
"https://i.postimg.cc/BZ8m8H00/received-3067372163408320.jpg"
];
   var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache55.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache55.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache55.jpg")).on("close",() => callback());
   };
