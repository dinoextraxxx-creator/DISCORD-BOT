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
base("حان موعد أذان صلاة الفجر",
`قال الله تعالى :

***﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾***

قرآن الفجر : صلاة الفجر`
);

const dhuhr = () =>
base("حان موعد أذان صلاة الظهر",
`قال الله تعالى :

***﴿ فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾***`
);

const asr = () =>
base("حان موعد أذان صلاة العصر",
`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`
);

const maghrib = () =>
base("حان موعد أذان صلاة المغرب",
`قال الله تعالى :

***﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلَّذَّاكِرِينَ﴾***`
);

const isha = () =>
base("حان موعد أذان صلاة العشاء",
`قال الله تعالى :

***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***`
);

// ================= AZKAR BUTTON =================

const azkarAzan = `1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا". (( يقول ذلك عقب تشهد المؤذن))

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد`;

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
.setTitle("أذكــــار الأذان")
.setColor("#FFD700")
.setAuthor({ name: "مُـــذَكّــــــر", iconURL: ICON })
.setDescription(azkarAzan)
.setFooter({ text: "4KO • YONKO.مُـــذَكّــــــر", iconURL: ICON })
]
});
}
});

// ================= SCHEDULER =================

client.once("ready", async () => {
console.log("BOT STARTED");

const channel = await client.channels.fetch(CHANNEL_ID);

const prayers = [fajr, dhuhr, asr, maghrib, isha];

// 🔥 START TIME: 18:53 (Morocco)
const START_HOUR = 18;
const START_MINUTE = 53;

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

// 5 messages only
if (diff < 0 || diff > 4) return;

// prevent duplicates
if (sent.has(diff)) return;

sent.add(diff);

await channel.send({
embeds: [prayers[diff]()],
components: [rowButtons()]
});

}, 1000);

});

client.login(process.env.TOKEN);
