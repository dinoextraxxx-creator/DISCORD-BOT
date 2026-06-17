const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL = "1516016586643734639";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR = "مُـــذَكّــــــر | مواعـــيد الصــــلاة";
const FOOTER = "4KO • YONKO.مُـــذَكّــــــر";

const TITLE =
"﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾";

const data = JSON.parse(fs.readFileSync("./hadiths.json","utf8"));
const hadiths = data.hadiths;

let used = new Set();

function pick(){

if(used.size >= hadiths.length){
used.clear();
}

let i;
do{
i = Math.floor(Math.random() * hadiths.length);
}while(used.has(i));

used.add(i);
return hadiths[i];
}

function embed(h){

return new EmbedBuilder()
.setColor("#FFD700")
.setAuthor({
name: AUTHOR,
iconURL: ICON
})
.setTitle(TITLE)
.setDescription(`«${h.text}»\n\n${h.narrator}\n\n${h.source}`)
.setFooter({
text: FOOTER,
iconURL: ICON
})
.setTimestamp();

}

async function startHadithSystem(client){

const ch = await client.channels.fetch(CHANNEL);

async function send(){

await ch.send({
embeds:[embed(pick())]
});

setTimeout(send, 120000); // كل دقيقتين

}

send();
}

module.exports = { startHadithSystem };
