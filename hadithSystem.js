const fs = require("fs");
const {
EmbedBuilder
} = require("discord.js");

const CHANNEL = "1516016586643734639";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const COLOR = "#FFD700";

const AUTHOR = "مُـــذَكّــــــر";

const FOOTER = "قد يختلف موعد الاذان من مدينة لأخرى";

const TITLE =
"﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾";

const data =
JSON.parse(fs.readFileSync("./hadiths.json","utf8"));

const hadiths = data.hadiths;

let used = new Set();
let locked = false;

function getHadith(){

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

.setColor(COLOR)

.setAuthor({
name: AUTHOR,
iconURL: ICON
})

.setTitle(TITLE)

.setDescription(
`🔸 ➤ قال رسول الله ﷺ:

«${h.text}»

👤 ➤ الراوي : ${h.narrator}

📚 ➤ المصدر : ${h.source}`
)

.setFooter({
text: FOOTER,
iconURL: ICON
})

.setTimestamp();

}

async function send(client){

if(locked) return;
locked = true;

try{

const ch = await client.channels.fetch(CHANNEL);

await ch.send({
embeds:[embed(getHadith())]
});

}finally{
locked = false;
}

}

async function startHadithSystem(client){

await send(client);

setInterval(() => {
send(client);
}, 120000);

}

module.exports = { startHadithSystem };
