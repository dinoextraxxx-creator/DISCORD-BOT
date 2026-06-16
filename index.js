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

// ================= CONFIG =================

const CHANNEL_ID = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

// ================= EMBEDS =================

function mainEmbed(name, verse) {
return new EmbedBuilder()
.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})
.setTitle(`حان موعد أذان صلاة ${name} حسب التوقيت المحلي لمدينة الرباط`)
.setColor("#FFD700")
.setDescription(`قال تعالى :

***﴿ ${verse} ﴾***`)
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
});
}

// ================= PRAYERS =================

const prayers = [
() => mainEmbed("الفجر", "وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا"),
() => mainEmbed("الظهر", "فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"),
() => mainEmbed("العصر", "وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ"),
() => mainEmbed("المغرب", "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ"),
() => mainEmbed("العشاء", "وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ")
];

const names = ["الفجر","الظهر","العصر","المغرب","العشاء"];

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

// ================= SAFE DETAILS =================

function prayerDetail(key) {

const virtue = {
fajr: `صلاة الفجر من أعظم الصلوات.

« مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ »

📚 الطبراني`,

dhuhr: `صلاة الظهر فريضة عظيمة.

« إنَّها ساعةٌ تُفْتَحُ فيها أبوابُ السَّماءِ »

📖 الترمذي`,

asr: `صلاة العصر هي الوسطى.

« الَّذي تفوتُهُ صلاةُ العصرِ فأنَّما وُتِرَ أَهْلَهُ ومالَهُ »

📚 البخاري ومسلم`,

maghrib: `صلاة المغرب نور.

« المحافظة على صلاة المغرب نور »

📖 أثر حسن`,

isha: `صلاة العشاء عظيمة.

« مَن صلَّى العِشاءَ في جماعةٍ فكأنَّما قامَ نِصفَ اللَّيلِ »

📚 مسلم`
};

const details = {
fajr: `***صلاة الفجر***
• عدد الركعات: 2
• السنة القبلية: 2
• السنة البعدية: 0`,

dhuhr: `***صلاة الظهر***
• عدد الركعات: 4
• السنة القبلية: 4
• السنة البعدية: 2`,

asr: `***صلاة العصر***
• عدد الركعات: 4
• السنة القبلية: 0
• السنة البعدية: 0`,

maghrib: `***صلاة المغرب***
• عدد الركعات: 3
• السنة القبلية: 0
• السنة البعدية: 2`,

isha: `***صلاة العشاء***
• عدد الركعات: 4
• السنة القبلية: 0
• السنة البعدية: 2`
};

return `${virtue[key] || "بيانات غير متوفرة"}

${details[key] || ""}`;
}

// ================= INTERACTIONS (SAFE) =================

client.on("interactionCreate", async (i) => {
try {

if (!i.isButton()) return;

if (i.customId.startsWith("pray_")) {

const key = i.customId.replace("pray_", "");

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
.setDescription(prayerDetail(key))
]
});
}

if (i.customId === "azkar") {
return i.reply({
ephemeral: true,
embeds: [
new EmbedBuilder()
.setTitle("أذكــار الاذان")
.setColor("#FFD700")
.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})
.setDescription(`1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله..."

3- يصلي على النبي -صلى الله عليه وسلم-

4- اللهم رب هذه الدعوة التامة...

5- يدعو بين الأذان والإقامة`)
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
]
});
}

} catch (err) {
console.log("INTERACTION ERROR:", err);
}
});

// ================= START (CRASH SAFE LOOP) =================

client.once("ready", async () => {
console.log("BOT READY SAFE VERSION");

let channel;
try {
channel = await client.channels.fetch(CHANNEL_ID);
} catch (e) {
console.log("CHANNEL FETCH ERROR:", e);
return;
}

let i = 0;

// 🔥 send immediately (FAJR)
try {
await channel.send({
embeds: [prayers[0]()],
components: [prayerButtons(names[0])]
});
} catch (e) {
console.log("SEND ERROR:", e);
}

i = 1;

// 🔥 safe interval (no crash stop)
setInterval(async () => {
try {

if (i >= prayers.length) return;

await channel.send({
embeds: [prayers[i]()],
components: [prayerButtons(names[i])]
});

i++;

} catch (e) {
console.log("INTERVAL SEND ERROR:", e);
}

}, 60000);

});

client.login(process.env.TOKEN);
