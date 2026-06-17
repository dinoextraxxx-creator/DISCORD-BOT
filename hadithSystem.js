const fs = require("fs");
const {
EmbedBuilder
} = require("discord.js");

const CHANNEL =
"1516016586643734639";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&";

const COLOR =
"#FFD700";

const AUTHOR =
"مُـــذَكّــــــر";

const FOOTER =
"4KO • YONKO.مُـــذَكّــــــر";

const data =
JSON.parse(
fs.readFileSync("./hadiths.json","utf8")
);

const hadiths =
data.hadiths;

let used = new Set();

function getRandom(){

if(used.size >= hadiths.length){
used.clear();
}

let i;

do{
i = Math.floor(Math.random() * hadiths.length);
} while(used.has(i));

used.add(i);

return hadiths[i];

}

function embed(h){

return new EmbedBuilder()

.setColor(COLOR)

.setAuthor({
name:AUTHOR,
iconURL:ICON
})

.setDescription(

`🔸 ➤ قال رسول الله ﷺ:

«${h.text}»

👤 ➤ الراوي : ${h.narrator}

📚 ➤ المصدر : ${h.source}`

)

.setFooter({
text:FOOTER,
iconURL:ICON
})

.setTimestamp();

}

async function startHadithSystem(client){

const ch =
await client.channels.fetch(CHANNEL);

async function send(){

await ch.send({

embeds:[
embed(getRandom())
]

});

}

await send();

setInterval(send, 120000);

}

module.exports = {
startHadithSystem
};
