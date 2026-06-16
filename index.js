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

// ================= BASE =================

function mainEmbed(title, verse) {
return new EmbedBuilder()
.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})
.setTitle(`حان موعد أذان صلاة ${title} حسب التوقيت المحلي لمدينة الرباط`)
.setColor("#FFD700")
.setDescription(`قال تعالى :

${verse}`)
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
.setTimestamp();
}

// ================= PRAYERS =================

const prayers = [
() => mainEmbed("الفجر", "***﴿ وَقُرْآنَ الْفَجْرِ ۖ ﴾***"),
() => mainEmbed("الظهر", "***﴿ فَأَقِيمُوا الصَّلَاةَ ۚ ﴾***"),
() => mainEmbed("العصر", "***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***"),
() => mainEmbed("المغرب", "***﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ ۚ ﴾***"),
() => mainEmbed("العشاء", "***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***")
];

// ================= BUTTONS =================

function rowButtons(prayerName) {
return new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId(`pray_${prayerName}`)
.setLabel(`صلاة ${prayerName}`)
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)
);
}

// ================= AZKAR =================

const azkar = `1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول الشهادة بعد الأذان

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة...

5- الدعاء بين الأذان والإقامة`;

// ================= INTERACTIONS =================

client.on("interactionCreate", async (i) => {
if (!i.isButton()) return;

if (i.customId.startsWith("pray_")) {
const name = i.customId.replace("pray_", "");

const map = {
الفجر: 0,
الظهر: 1,
العصر: 2,
المغرب: 3,
العشاء: 4
};

return i.reply({
ephemeral: true,
embeds: [prayers[map[name]]()]
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
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
]
});
}
});

// ================= READY =================

client.once("ready", async () => {
console.log("INDEX READY");

const channel = await client.channels.fetch(CHANNEL_ID);

// 🔥 START TIME: 19:42
const startTime = DateTime.now()
.setZone(TZ)
.set({
hour: 19,
minute: 42,
second: 0,
millisecond: 0
});

let sent = new Set();
let finished = false;

setInterval(async () => {

if (finished) return;

const now = DateTime.now().setZone(TZ);

for (let i = 0; i < prayers.length; i++) {

const target = startTime.plus({ minutes: i });

const key = `${now.toFormat("yyyy-MM-dd")}-${i}`;

const diff = now.diff(target, "seconds").seconds;

if (diff < 0 || diff >= 60) continue;
if (sent.has(key)) continue;

sent.add(key);

await channel.send({
embeds: [prayers[i]()],
components: [rowButtons(Object.keys(prayers)[i])]
});

if (i === prayers.length - 1) {
finished = true;
}
}

}, 1000);

});

client.login(process.env.TOKEN);
