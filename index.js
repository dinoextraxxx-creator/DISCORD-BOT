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

// ================= START TIME =================
// 🔥 21:11 (9:11 PM Morocco)

const startTime = DateTime.now()
.setZone(TZ)
.set({ hour: 21, minute: 11, second: 0, millisecond: 0 });

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

***﴿ ${verse} ﴾***`)
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
.setTimestamp();
}

// ================= PRAYERS =================

const prayers = [
() => mainEmbed("الفجر", "وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا"),
() => mainEmbed("الظهر", "فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"),
() => mainEmbed("العصر", "وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ"),
() => mainEmbed("المغرب", "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ"),
() => mainEmbed("العشاء", "وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ")
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

const azkar = `1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا". (( يقول ذلك عقب تشهد المؤذن))

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد`;

// ================= DETAILS =================

function prayerDetail(name) {

const virtue = {
fajr: `صلاة الفجر من أعظم الصلوات التي تُظهر صدق الإيمان.

« مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ »

📚 رواه الطبراني وصححه الألباني`,

dhuhr: `صلاة الظهر من الصلوات التي تُقام في وسط اليوم.

« إنَّها ساعةٌ تُفْتَحُ فيها أبوابُ السَّماءِ »

📖 رواه الترمذي وصححه الألباني`,

asr: `صلاة العصر هي الصلاة الوسطى التي عظّمها الله.

« الَّذي تفوتُهُ صلاةُ العصرِ فأنَّما وُتِرَ أَهْلَهُ ومالَهُ »

📚 رواه البخاري ومسلم`,

maghrib: `صلاة المغرب ختام النهار وبداية السكون.

« المحافظة على صلاة المغرب نور »

📖 أثر حسن`,

isha: `صلاة العشاء من أثقل الصلوات على المنافقين.

« مَن صلَّى العِشاءَ في جماعةٍ فكأنَّما قامَ نِصفَ اللَّيلِ »

📚 رواه مسلم`
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

if (!virtue[name] || !details[name]) {
return `خطأ: بيانات غير موجودة`;
}

return `${virtue[name]}

${details[name]}`;
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
.setDescription(prayerDetail(name))
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
.setDescription(azkar)
.setFooter({
text: "مواعيد الصلاة قد تتغير من مدينة الى الاخرى",
iconURL: ICON
})
]
});
}
});

// ================= SCHEDULER =================

client.once("ready", async () => {
console.log("BOT READY - 21:11 VERSION");

const channel = await client.channels.fetch(CHANNEL_ID);

setInterval(async () => {

const now = DateTime.now().setZone(TZ);

for (let i = 0; i < prayers.length; i++) {

const target = startTime.plus({ minutes: i });

const diff = now.diff(target, "seconds").seconds;

if (diff < 0 || diff >= 60) continue;

await channel.send({
embeds: [prayers[i]()],
components: [prayerButtons(["الفجر","الظهر","العصر","المغرب","العشاء"][i])]
});
}

}, 1000);

});

client.login(process.env.TOKEN);
