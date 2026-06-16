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

const CHANNEL_ID = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR =
"مُـــذَكّــــــر | مواعـــيد الصــــلاة";

const FOOTER =
"مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= PRAYERS (بدون تغيير) =================

const prayers = {
/* نفس بياناتك الأصلية */
};

// ================= EMBED =================

function mainEmbed(key){

const p = prayers[key];
if(!p) return null;

return new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setTitle(`حان موعد أذان صلاة ${p.title} حسب التوقيت المحلي لمدينة الرباط`)
.setDescription(`قال تعالى :\n\n***﴿ ${p.verse} ﴾***`)
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp();

}

// ================= BUTTONS =================

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

// ================= SAFE SEND (FIX BUTTON ISSUE) =================

async function sendPrayer(key){

try{

const channel = await client.channels.fetch(CHANNEL_ID).catch(()=>null);
if(!channel) return;

const message = await channel.send({
embeds:[mainEmbed(key)],
components:[buttons(key)],
fetchReply: true // 🔥 مهم جدًا لإبقاء التفاعل ثابت
});

if(!message){
console.log("MESSAGE FAILED");
return;
}

console.log("SENT:", key);

}catch(err){
console.log("SEND ERROR:", err);
}

}

// ================= DAILY SYSTEM =================

const schedule = [
{ key: "fajr", hour: 4, minute: 24 },
{ key: "dhuhr", hour: 13, minute: 33 },
{ key: "asr", hour: 17, minute: 14 },
{ key: "maghrib", hour: 20, minute: 45 },
{ key: "isha", hour: 22, minute: 18 }
];

function getDelay(hour, minute){

const now = new Date();
const target = new Date();

target.setHours(hour);
target.setMinutes(minute);
target.setSeconds(0);
target.setMilliseconds(0);

if(target < now){
target.setDate(target.getDate() + 1);
}

return target - now;

}

function startDaily(){

for(const item of schedule){

const delay = getDelay(item.hour, item.minute);

setTimeout(()=>{

sendPrayer(item.key);

setInterval(()=>{
sendPrayer(item.key);
}, 24 * 60 * 60 * 1000);

}, delay);

}

console.log("DAILY SYSTEM ACTIVE");

}

// ================= INTERACTIONS (FIXED) =================

client.on("interactionCreate", async interaction=>{

try{

if(!interaction.isButton()) return;

if(interaction.customId === "azkar"){

return interaction.reply({
ephemeral:true,
embeds:[

new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setDescription(
`1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا". (( يقول ذلك عقب تشهد المؤذن))

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد`
)
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp()

]

}).catch(console.log);

}

if(interaction.customId.startsWith("pray_")){

const key = interaction.customId.replace("pray_","");
const p = prayers[key];

if(!p) return;

return interaction.reply({
ephemeral:true,
embeds:[

new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setDescription(p.description)
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp()

]

}).catch(console.log);

}

}catch(err){
console.log(err);
}

});

// ================= READY =================

client.once("ready", ()=>{

console.log("BOT READY");
startDaily();

});

// ================= LOGIN =================

client.login(process.env.TOKEN);
