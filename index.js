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

// ================= CONFIG =================

const CHANNEL_ID = "1516405973365952633";
const TZ = "Africa/Casablanca";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

// ================= BUTTONS =================

function rowButtons() {
return new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId("prayer")
.setLabel("صلاة الفجر")
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("adhan")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)
);
}

// ================= BASE =================

function base(title, desc) {
return new EmbedBuilder()
.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})
.setTitle(title + " حسب التوقيت المحلي لمدينة الرباط")
.setColor("#FFD700")
.setDescription(desc)
.setFooter({
text: "قد تختلف مواعيد الصلاة من مدينة لأخرى",
iconURL: ICON
})
.setTimestamp();
}

// ================= PRAYERS =================

const fajr = () =>
base("حــان مــوعـد أذان صــلاة الفـجـر",
`قال الله تعالى :

***﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾***

قرآن الفجر : صلاة الفجر`);

const dhuhr = () =>
base("حــان مــوعـد أذان صــلاة الــظــهــر",
`قال الله تعالى :

***﴿ فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾***`);

const asr = () =>
base("حــان مــوعـد أذان صــلاة الــعــصــر",
`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`);

const maghrib = () =>
base("حــان مــوعـد أذان صــلاة الــمــغــرب",
`قال الله تعالى :

***﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلَّذَّاكِرِينَ﴾***`);

const isha = () =>
base("حــان مــوعـد أذان صــلاة الــعــشــاء",
`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`);

// ================= INTERACTIONS =================

client.on("interactionCreate", async (i) => {
if (!i.isButton()) return;

if (i.customId === "prayer") {
return i.reply({
ephemeral: true,
embeds: [fajr()]
});
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
]
});
}
});

// ================= SCHEDULER =================

client.once("ready", async () => {

console.log("BOT READY (TRIAL 18:40)");

const channel = await client.channels.fetch(CHANNEL_ID);

const prayers = [fajr, dhuhr, asr, maghrib, isha];

// 🔥 بداية التجربة: 18:40
const START_HOUR = 18;
const START_MINUTE = 40;

let sent = new Set();

setInterval(async () => {

const now = DateTime.now().setZone(TZ);

const base = now.set({
hour: START_HOUR,
minute: START_MINUTE,
second: 0,
millisecond: 0
});

const diff = Math.floor(now.diff(base, "minutes").minutes);

// فقط نطاق 5 دقائق
if (diff < 0 || diff > 4) return;

// منع التكرار
if (sent.has(diff)) return;

sent.add(diff);

await channel.send({
embeds: [prayers[diff]()],
components: [rowButtons()]
});

}, 1000);

});

client.login(process.env.TOKEN);
