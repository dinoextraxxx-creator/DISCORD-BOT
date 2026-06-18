const fs = require("fs");

let lastHadith = null;

function getAllHadiths() {

const parts = [];
for (let i = 1; i <= 10; i++) {
parts.push(require(`./parts/part${i}`));
}

return parts.flat();
}

async function startHadithSystem(client, config = {}) {

const icon = config.icon;
const color = config.color || "#FF0000";

const CHANNEL_ID = "1516016586643734639";

setInterval(async () => {

try {

const all = getAllHadiths();

let hadith;

do {
hadith = all[Math.floor(Math.random() * all.length)];
} while (hadith.text === lastHadith);

lastHadith = hadith.text;

const channel = await client.channels.fetch(CHANNEL_ID);
if (!channel) return;

channel.send({
embeds: [
{
title: "حديث نبوي شريف",
color: parseInt(color.replace("#", ""), 16),
author: {
name: "مُـــذَكّــــــر",
icon_url: icon
},
description:
`🔸 قال رسول الله ﷺ:\n«${hadith.text}»\n\n` +
`👤 الراوي : ${hadith.rawi}\n` +
`📚 المصدر : ${hadith.source}\n` +
(hadith.bayan ? `\n📖 بيان : ${hadith.bayan}` : ""),
footer: {
text: "4KO • YONKO.مُـــذَكّــــــر",
icon_url: icon
},
timestamp: new Date()
}
]
});

} catch (e) {
console.log("Hadith error:", e.message);
}

}, 1000 * 60 * 60 * 24 / 4); // تقريبي 4 مرات يومياً (حسب إعدادك السابق)

}

module.exports = startHadithSystem;
