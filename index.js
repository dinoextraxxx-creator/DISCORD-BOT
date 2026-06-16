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

// ================= EMBED =================

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

// ================= AZKAR =================

const azkar = `1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا"

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة...

5- يدعو لنفسه بين الأذان والإقامة`;

// ================= BUTTONS =================

function buttons(prayer) {
return new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId(`pray_${prayer}`)
.setLabel(`صلاة ${prayer}`)
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)
);
}

// ================= INTERACTIONS =================

client.on("interactionCreate", async (i) => {
if (!i.isButton()) return;

const map = { fajr, dhuhr, asr, maghrib, isha };

if (i.customId.startsWith("pray_")) {
const key = i.customId.replace("pray_", "");

return i.reply({
ephemeral: true,
embeds: [map[key]()]
});
}

if (i.customId === "azkar") {
return i.reply({
ephemeral: true,
embeds: [
new EmbedBuilder()
.setTitle("أذكــــار الأذان")
.setColor("#FFD700")
.setAuthor({ name: "مُـــذَكّــــــر", iconURL: ICON })
.setDescription(azkar)
.setFooter({ text: "4KO • YONKO.مُـــذَكّــــــر", iconURL: ICON })
]
});
}
});

// ================= SCHEDULER =================

client.once("ready", async () => {
console.log("INDEX READY");

const channel = await client.channels.fetch(CHANNEL_ID);

// 🔥 START TODAY 19:01 Morocco
const startTime = DateTime.now()
.setZone(TZ)
.set({ hour: 19, minute: 1, second: 0, millisecond: 0 });

const schedule = [
fajr, dhuhr, asr, maghrib, isha
];

let sent = new Set();

setInterval(async () => {

const now = DateTime.now().setZone(TZ);

for (let i = 0; i < schedule.length; i++) {

const target = startTime.plus({ minutes: i });

const key = `${now.toFormat("yyyy-MM-dd")}-${i}`;

const diff = now.diff(target, "seconds").seconds;

if (diff < 0 || diff >= 60) continue;
if (sent.has(key)) continue;

sent.add(key);

await channel.send({
embeds: [schedule[i]()],
components: [buttons(Object.keys(schedule)[i])]
});
}

}, 1000);

});

client.login(process.env.TOKEN);
