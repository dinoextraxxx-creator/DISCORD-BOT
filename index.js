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

// ================= MAIN EMBED =================

function mainEmbed(name, verse) {
return new EmbedBuilder()
.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})
.setTitle(`حان موعد أذان صلاة ${name} حسب التوقيت المحلي لمدينة الرباط`)
.setColor("#FFD700")
.setDescription(`قال تعالى :

***${verse}***`)
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
.setTimestamp();
}

// ================= PRAYERS =================

const prayers = [
() => mainEmbed("الفجر", "﴿ وَقُرْآنَ الْفَجْرِ ۖ ﴾"),
() => mainEmbed("الظهر", "﴿ فَأَقِيمُوا الصَّلَاةَ ۚ ﴾"),
() => mainEmbed("العصر", "﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾"),
() => mainEmbed("المغرب", "﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ ۚ ﴾"),
() => mainEmbed("العشاء", "﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ﴾")
];

// ================= BUTTONS =================

function prayerButtons(name) {
return new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId(`pray_${name}`)
.setLabel(`صلاة ${name}`)
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)
);
}

// ================= AZKAR =================

const azkar = `1- يقول مثل ما يقول المؤذن إلا في حي على الصلاة وحي على الفلاح فيقول لا حول ولا قوة إلا بالله

2- يقول الشهادة بعد الأذان

3- الصلاة على النبي ﷺ

4- الدعاء بين الأذان والإقامة`;

// ================= DETAILS =================

function getPrayerDetails(name) {
const data = {
fajr: `***صلاة الفجر***
• 2 ركعات
• سنة قبلية: 2
• بعدية: 0`,

dhuhr: `***صلاة الظهر***
• 4 ركعات
• سنة قبلية: 4
• بعدية: 2`,

asr: `***صلاة العصر***
• 4 ركعات
• لا سنة قبلية
• لا سنة بعدية`,

maghrib: `***صلاة المغرب***
• 3 ركعات
• سنة بعدية: 2`,

isha: `***صلاة العشاء***
• 4 ركعات
• سنة بعدية: 2`
};

return data[name];
}

// ================= INTERACTIONS =================

client.on("interactionCreate", async (i) => {
if (!i.isButton()) return;

if (i.customId.startsWith("pray_")) {

const name = i.customId.replace("pray_", "");

return i.reply({
ephemeral: true,
embeds: [
new EmbedBuilder()
.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})
.setColor("#FFD700")
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
.setDescription(getPrayerDetails(name))
]
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
console.log("BOT READY SAFE VERSION");

const channel = await client.channels.fetch(CHANNEL_ID);

// 🔥 START TIME: 19:59 (FIXED)
const startTime = DateTime.now()
.setZone(TZ)
.set({
hour: 19,
minute: 59,
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
components: [prayerButtons(
["fajr","dhuhr","asr","maghrib","isha"][i]
)]
});

if (i === prayers.length - 1) {
finished = true;
}
}

}, 1000);

});

client.login(process.env.TOKEN);
