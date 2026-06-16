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

const ICON = "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

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

const prayers = [
() => base("الفجر", "***﴿ وَقُرْآنَ الْفَجْرِ ۖ ﴾***"),
() => base("الظهر", "***﴿ فَأَقِيمُوا الصَّلَاةَ ۚ ﴾***"),
() => base("العصر", "***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***"),
() => base("المغرب", "***﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ ۚ ﴾***"),
() => base("العشاء", "***﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾***")
];

// ================= BUTTONS =================

function rowButtons() {
return new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId("pray")
.setLabel("صلاة الفجر")
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)
);
}

// ================= AZKAR =================

const azkar = `1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول الشهادة بعد المؤذن

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة...

5- الدعاء بين الأذان والإقامة`;

// ================= INTERACTIONS =================

client.on("interactionCreate", async (i) => {
if (!i.isButton()) return;

if (i.customId === "pray") {
return i.reply({
ephemeral: true,
embeds: [prayers[0]()]
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

// 🔥 START: TODAY 19:15 (7:15 PM Morocco)
const startTime = DateTime.now()
.setZone(TZ)
.set({
hour: 19,
minute: 15,
second: 0,
millisecond: 0
});

let sent = new Set();

setInterval(async () => {

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
components: [rowButtons()]
});
}

}, 1000);

});

client.login(process.env.TOKEN);
