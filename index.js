const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const { DateTime } = require("luxon");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = "1516405973365952633";
const TZ = "Africa/Casablanca";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

// ================= BUTTONS =================

function rowButtons() {
return new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId("prayer")
.setLabel("صلاة")
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("adhan")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);
}

// ================= EMBEDS =================

function fajr() {
return new EmbedBuilder()
.setAuthor({ name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة", iconURL: ICON })
.setTitle("حــان مــوعـد أذان صــلاة الفـجـر")
.setColor("#FFD700")
.setDescription(`قال الله تعالى :

***﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾***

قرآن الفجر : صلاة الفجر`)
.setFooter({ text: "قد تختلف مواعيد الصلاة من مدينة لأخرى", iconURL: ICON })
.setTimestamp();
}

function dhuhr() {
return new EmbedBuilder()
.setAuthor({ name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة", iconURL: ICON })
.setTitle("حــان مــوعـد أذان صــلاة الــظــهــر")
.setColor("#FFD700")
.setDescription(`قال الله تعالى :

***﴿ فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾***`)
.setFooter({ text: "قد تختلف مواعيد الصلاة من مدينة لأخرى", iconURL: ICON })
.setTimestamp();
}

function asr() {
return new EmbedBuilder()
.setAuthor({ name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة", iconURL: ICON })
.setTitle("حــان مــوعـد أذان صــلاة الــعــصــر")
.setColor("#FFD700")
.setDescription(`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`)
.setFooter({ text: "قد تختلف مواعيد الصلاة من مدينة لأخرى", iconURL: ICON })
.setTimestamp();
}

function maghrib() {
return new EmbedBuilder()
.setAuthor({ name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة", iconURL: ICON })
.setTitle("حــان مــوعـد أذان صــلاة الــمــغــرب")
.setColor("#FFD700")
.setDescription(`قال الله تعالى :

***﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلَّذَّاكِرِينَ﴾***`)
.setFooter({ text: "قد تختلف مواعيد الصلاة من مدينة لأخرى", iconURL: ICON })
.setTimestamp();
}

function isha() {
return new EmbedBuilder()
.setAuthor({ name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة", iconURL: ICON })
.setTitle("حــان مــوعـد أذان صــلاة الــعــشــاء")
.setColor("#FFD700")
.setDescription(`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`)
.setFooter({ text: "قد تختلف مواعيد الصلاة من مدينة لأخرى", iconURL: ICON })
.setTimestamp();
}

// ================= BUTTONS =================

client.on("interactionCreate", async (i) => {

if (!i.isButton()) return;

if (i.customId === "prayer") {
return i.reply({ ephemeral: true, embeds: [fajr()] });
}

if (i.customId === "adhan") {
return i.reply({
ephemeral: true,
embeds: [
new EmbedBuilder()
.setTitle("أذكـــــار الأذان")
.setColor("#FFD700")
.setAuthor({ name: "مُـــذَكّــــــر", iconURL: ICON })
.setDescription(`1- يقول مثل ما يقول المؤذن

2- يقول الشهادتين

3- يصلي على النبي ﷺ

4- الدعاء بعد الأذان

5- الدعاء بين الأذان والإقامة`)
.setFooter({ text: "4KO • YONKO.مُـــذَكّــــــر", iconURL: ICON })
.setTimestamp()
]
});
}

});

// ================= SCHEDULER (START 17:53) =================

client.once("ready", async () => {
console.log("BOT READY");

const prayers = [
fajr,
dhuhr,
asr,
maghrib,
isha
];

let sent = new Set();

setInterval(async () => {

const now = DateTime.now().setZone(TZ);

// البداية 17:53
const base = now.set({
hour: 17,
minute: 53,
second: 0
});

const diff = Math.floor(now.diff(base, "minutes").minutes);

if (diff < 0 || diff > 4) return;

if (!sent.has(diff)) {
sent.add(diff);

const ch = await client.channels.fetch(CHANNEL_ID);

await ch.send({
embeds: [prayers[diff]()],
components: [rowButtons()]
});
}

}, 1000);

});

// ================= LOGIN =================

client.login(process.env.TOKEN);
