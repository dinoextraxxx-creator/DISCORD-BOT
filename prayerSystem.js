const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const CHANNEL =
"1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const COLOR =
"#FFD700";

const AUTHOR =
"مُـــذَكّــــــر";

const FOOTER =
"4KO • YONKO.مُـــذَكّــــــر";

const prayers = [
"الفجر",
"الظهر",
"العصر",
"المغرب",
"العشاء"
];

let index = 0;
let started = false;

function buildEmbed(name){

return new EmbedBuilder()

.setColor(COLOR)

.setAuthor({
name:AUTHOR,
iconURL:ICON
})

.setTitle("صلاة ${name}")

.setDescription(
`قال تعالى :

﴿ ذكر مرتبط بصلاة ${name} ﴾`
)

.setFooter({
text:FOOTER,
iconURL:ICON
})

.setTimestamp();

}

function buildButtons(name){

return new ActionRowBuilder()

.addComponents(

new ButtonBuilder()
.setCustomId("prayer_${name}")
.setLabel("صلاة ${name}")
.setStyle(ButtonStyle.Primary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);

}

async function sendPrayer(client){

const channel =
await client.channels.fetch(CHANNEL);

const name =
prayers[index];

await channel.send({

embeds:[buildEmbed(name)],
components:[buildButtons(name)]

});

index++;

if(index >= prayers.length){
index = 0;
}

}

async function startPrayerSystem(client){

if(started) return; // 🔥 يمنع التكرار 100%

started = true;

await sendPrayer(client); // أول تشغيل مباشر

setInterval(() => {
sendPrayer(client);
}, 60000);

}

module.exports = {
startPrayerSystem
};
