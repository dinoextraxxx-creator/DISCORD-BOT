const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

const CHANNEL_ID = "1516016586643734639";

const ICON = "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR = "مُـــذَكّــــــر | مواعـــيد الصــــلاة";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

const prayers = {
fajr: {
title: "الفجر",
verse: "﴿ وَقُرْآنَ الْفَجْرِ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾",
description: "..."
},
dhuhr: {
title: "الظهر",
verse: "﴿ فَأَقِيمُوا الصَّلَاةَ ﴾",
description: "..."
},
asr: {
title: "العصر",
verse: "﴿ حَافِظُوا عَلَى الصَّلَوَاتِ ﴾",
description: "..."
},
maghrib: {
title: "المغرب",
verse: "﴿ وَسَبِّحْ بِالْعَشِيِّ وَالإِبْكَارِ ﴾",
description: "..."
},
isha: {
title: "العشاء",
verse: "﴿ وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ ﴾",
description: "..."
}
};

function mainEmbed(key){

const p = prayers[key];

return new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setTitle(`حان موعد أذان صلاة ${p.title} حسب التوقيت المحلي لمدينة الرباط`)
.setDescription(`قال تعالى :\n\n***${p.verse}***`)
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp();
}

function buttons(key){

return new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId(`pray_${key}`)
.setLabel(`صلاة ${prayers[key].title}`)
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)
);
}

async function sendPrayer(key){

try{

const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
if(!channel) return;

await channel.send({
embeds: [mainEmbed(key)],
components: [buttons(key)]
});

console.log("SENT PRAYER:", key);

}catch(e){
console.log("ERROR:", e);
}
}

const schedule = [
{ key:"fajr", hour:4, minute:24 },
{ key:"dhuhr", hour:13, minute:33 },
{ key:"asr", hour:17, minute:14 },
{ key:"maghrib", hour:20, minute:45 },
{ key:"isha", hour:22, minute:18 }
];

function getDelay(h,m){

const now = new Date();
const t = new Date();

t.setHours(h);
t.setMinutes(m);
t.setSeconds(0);

if(t < now) t.setDate(t.getDate() + 1);

return t - now;
}

function start(){

for(const s of schedule){

const delay = getDelay(s.hour, s.minute);

setTimeout(() => {

sendPrayer(s.key);

setInterval(() => {
sendPrayer(s.key);
}, 24 * 60 * 60 * 1000);

}, delay);

}

console.log("PRAYER BOT ACTIVE");
}

client.once("ready", () => {
console.log("READY");
start();
});

client.login(process.env.TOKEN);
