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

function baseEmbed(title, desc) {
return new EmbedBuilder()
.setAuthor({ name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة", iconURL: ICON })
.setTitle(title)
.setColor("#FFD700")
.setDescription(desc)
.setFooter({ text: "قد تختلف مواعيد الصلاة من مدينة لأخرى", iconURL: ICON })
.setTimestamp();
}

// FAJR
const fajr = () =>
baseEmbed(
"حــان مــوعـد أذان صــلاة الفـجـر",
`قال الله تعالى :

***﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾***

قرآن الفجر : صلاة الفجر`
);

// DHUHR
const dhuhr = () =>
baseEmbed(
"حــان مــوعـد أذان صــلاة الــظــهــر",
`قال الله تعالى :

***﴿ فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾***`
);

// ASR
const asr = () =>
baseEmbed(
"حــان مــوعـد أذان صــلاة الــعــصــر",
`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`
);

// MAGHRIB
const maghrib = () =>
baseEmbed(
"حــان مــوعـد أذان صــلاة الــمــغــرب",
`قال الله تعالى :

***﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلَّذَّاكِرِينَ﴾***`
);

// ISHA
const isha = () =>
baseEmbed(
"حــان مــوعـد أذان صــلاة الــعــشــاء",
`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`
);

// ================= INTERACTIONS =================

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
]
});
}
});

// ================= SCHEDULER (0.5 FIXED) =================

client.once("ready", async () => {
console.log("BOT READY");

const channel = await client.channels.fetch(CHANNEL_ID);

const prayers = [fajr, dhuhr, asr, maghrib, isha];

// بداية التشغيل 06:06
const start = DateTime.fromObject(
{
hour: 6,
minute: 6,
second: 0,
millisecond: 0
},
{ zone: TZ }
);

for (let i = 0; i < prayers.length; i++) {

const target = start.plus({ minutes: i });

const delay = target.diff(DateTime.now().setZone(TZ)).toMillis();

if (delay < 0) continue;

setTimeout(async () => {
await channel.send({
embeds: [prayers[i]()],
components: [rowButtons()]
});
}, delay);

}

});

// ================= LOGIN =================

client.login(process.env.TOKEN);
