module.exports.config = {
  name: "girl pp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Islamick Chat",
  description: "Random Islamick girl",
  commandCategory: "Random-IMG",
  usages: "girl pp",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/QhhlbOB.jpg",
"https://i.imgur.com/OoeJCIf.jpg",
"https://i.imgur.com/DQwAKFM.jpg",
"https://i.imgur.com/jI9YZhv.jpg",
"https://i.imgur.com/PhqSzUH.jpg",
"https://i.imgur.com/Z6UnXmQ.jpg",
"https://i.imgur.com/iVhAMzj.jpg",
"https://i.imgur.com/bwNILNA.jpg",
"https://i.imgur.com/ro1sS7U.jpg",
"https://i.imgur.com/g0zMA3A.jpg",
"https://i.imgur.com/u7KSLqc.jpg",
"https://i.imgur.com/MLvxuwl.jpg",
"https://i.imgur.com/65JpvVE.jpg",
"https://i.imgur.com/6AIaNnh.jpg",
"https://i.imgur.com/31iclgf.jpg",
"https://i.imgur.com/PKWtldk.jpg",
"https://i.imgur.com/aU89DEm.jpg",
"https://i.imgur.com/ZVGrrfN.jpg",
"https://i.imgur.com/iEZLcm5.jpg",
"https://i.imgur.com/wVdUIFq.jpg",
"https://i.imgur.com/2KiXzwr.jpg",
"https://i.imgur.com/UF5Sl0G.jpg",
"https://i.imgur.com/nAaPtEE.jpg",
"https://i.imgur.com/47YTuy7.jpg",
"https://i.imgur.com/Nw96B2q.jpg",
"https://i.imgur.com/ygHZICZ.jpg",
"https://i.imgur.com/wHyG2ho.jpg",
"https://i.imgur.com/nE3NCcx.jpg",
"https://i.imgur.com/Et3YjzO.jpg",
"https://i.imgur.com/YgSAg9T.jpg",
"https://i.imgur.com/ao1Vmxt.jpg",
"https://i.imgur.com/hmGGVSJ.jpg",
"https://i.imgur.com/1X8yDij.jpg",
"https://i.imgur.com/Z649LRx.jpg",
"https://i.imgur.com/kQrOyEW.jpg",
"https://i.imgur.com/bwfPhjj.jpg",
"https://i.imgur.com/aWgXxbD.jpg",
"https://i.imgur.com/zZbzEwi.jpg",
"https://i.imgur.com/pHdxpZ8.jpg",
"https://i.imgur.com/vEiBt8Z.jpg",
"https://i.imgur.com/sKGIjp5.jpg",
"https://i.imgur.com/pHdxpZ8.jpg",
"https://i.imgur.com/a2MbjRi.jpg",
"https://i.imgur.com/FL475VN.jpg",
"https://i.imgur.com/YYnvC6f.jpg",
"https://i.imgur.com/jipu7AG.jpg",
"https://i.imgur.com/yxAvxKF.jpg",
"https://i.imgur.com/Pv1DJar.jpg",
"https://i.imgur.com/jtf6IU0.jpg",
"https://i.imgur.com/CZGNDuN.jpg",

     ];
     var callback = () => api.sendMessage({body:`𝐈𝐒𝐋𝐀𝐌𝐈𝐂𝐊 𝐆𝐈𝐑𝐋 𝐅𝐁 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 𝐈𝐌𝐆`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
