const axios = require("axios");

const API =
"https://api.aladhan.com/v1/timingsByCity?city=Casablanca&country=Morocco&method=21";

const CHANNEL_ID = "1516405973365952633";

let lastSent = null;

function toDate(t) {
const [h, m] = t.split(":");
const d = new Date();
d.setHours(+h);
d.setMinutes(+m);
d.setSeconds(0);
return d;
}

async function startPrayerSystem(client) {

setInterval(async () => {

try {

const res = await axios.get(API);
const t = res.data.data.timings;

const prayers = [
["fajr", t.Fajr],
["dhuhr", t.Dhuhr],
["asr", t.Asr],
["maghrib", t.Maghrib],
["isha", t.Isha]
];

const now = new Date();

// اختيار الصلاة القادمة فقط
const next = prayers.find(p => toDate(p[1]) > now);

if (!next) return;

const [name] = next;

// منع التكرار
if (lastSent === name) return;

lastSent = name;

const channel = await client.channels.fetch(CHANNEL_ID);
if (!channel) return;

channel.send({
embeds: [
{
title: `حان موعد صلاة ${name} حسب التوقيت المحلي لمدينة الدار البيضاء`,
color: 0xFFFF00,
description: `قال الله تعالى:

${name === "fajr"
? "﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾\n\nقرآن الفجر = صلاة الفجر"
: name === "dhuhr"
? "﴿ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا ﴾"
: name === "asr"
? "﴿ حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَى ﴾"
: name === "maghrib"
? "﴿ وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا ﴾"
: "﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ﴾"
}`,
footer: {
text: "4KO • YONKO.مُـــذَكّــــــر",
icon_url: "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg"
},
timestamp: new Date()
}
]
});

} catch (e) {
console.log("Prayer error:", e.message);
}

}, 60000);

}

module.exports = startPrayerSystem;
