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

// ================= SAFETY =================

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

// ================= CONFIG =================

const CHANNEL_ID = "1516016586643734639";

const ICON = "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";
const AUTHOR = "مُـــذَكّــــــر | مواعـــيد الصــــلاة";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= PRAYERS =================

const prayers = {
fajr: { title: "الفجر", verse: "﴿ وَقُرْآنَ الْفَجْرِ ﴾", description: "..." },
dhuhr: { title: "الظهر", verse: "﴿ فَأَقِمِ الصَّلَاةَ ﴾", description: "..." },
asr: { title: "العصر", verse: "﴿ وَالْعَصْرِ ﴾", description: "..." },
maghrib: { title: "المغرب", verse: "﴿ فَسُبْحَانَ اللَّهِ ﴾", description: "..." },
isha: { title: "العشاء", verse: "﴿ وَمِنَ اللَّيْلِ ﴾", description: "..." }
};

// ================= EMBED =================

function mainEmbed(key){
const p = prayers?.[key];
if(!p) return null;

return new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setTitle(`حان موعد أذان صلاة ${p.title} حسب التوقيت المحلي لمدينة الرباط`)
.setDescription(`قال تعالى :\n\n***${p.verse}***`)
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp();
}

// ================= BUTTONS =================

function buttons(key){
if(!prayers?.[key]) return null;

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

// ================= SAFE SEND =================

async function sendPrayer(key){
try{

const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
if(!channel) return;

const embed = mainEmbed(key);
const row = buttons(key);

if(!embed || !row) return;

await channel.send({
embeds: [embed],
components: [row]
});

console.log("SENT:", key);

}catch(err){
console.log("SEND ERROR:", err);
}
}

// ================= CLEAN DAILY SYSTEM (FIXED) =================

function schedulePrayer(item){

const now = new Date();
const target = new Date();

target.setHours(item.hour);
target.setMinutes(item.minute);
target.setSeconds(0);

if(target < now){
target.setDate(target.getDate() + 1);
}

const delay = target - now;

setTimeout(async () => {

await sendPrayer(item.key);

// 🔥 بعد ما يرسل → يعيد جدولة نفسه فقط (بدون setInterval)
schedulePrayer(item);

}, delay);
}

// ================= START =================

function startSystem(){

const schedule = [
{ key: "fajr", hour: 4, minute: 24 },
{ key: "dhuhr", hour: 13, minute: 33 },
{ key: "asr", hour: 17, minute: 14 },
{ key: "maghrib", hour: 20, minute: 45 },
{ key: "isha", hour: 22, minute: 18 }
];

for(const item of schedule){
schedulePrayer(item);
}

console.log("PRAYER SYSTEM ACTIVE (STABLE MODE)");
}

// ================= INTERACTIONS =================

client.on("interactionCreate", async interaction => {
try{

if(!interaction.isButton()) return;

if(interaction.customId === "azkar"){
return interaction.reply({
ephemeral: true,
embeds: [
new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setDescription("أذكار الأذان ...")
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp()
]
}).catch(()=>{});
}

if(interaction.customId.startsWith("pray_")){
const key = interaction.customId.replace("pray_", "");
const p = prayers?.[key];

if(!p){
return interaction.reply({ content: "خطأ", ephemeral: true }).catch(()=>{});
}

return interaction.reply({
ephemeral: true,
embeds: [
new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setDescription(p.description || "لا يوجد وصف")
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp()
]
}).catch(()=>{});
}

}catch(err){
console.log(err);
}
});

// ================= READY =================

client.once("ready", () => {
console.log("BOT READY");
startSystem();
});

// ================= LOGIN =================

client.login(process.env.TOKEN);
