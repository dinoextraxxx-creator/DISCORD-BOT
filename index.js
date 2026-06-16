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

dhuhr: `صلاة الظهر فريضة عظيمة في وسط اليوم.

« إنَّها ساعةٌ تُفْتَحُ فيها أبوابُ السَّماءِ »

📖 رواه الترمذي`,

asr: `صلاة العصر هي الصلاة الوسطى.

« الَّذي تفوتُهُ صلاةُ العصرِ فأنَّما وُتِرَ أَهْلَهُ ومالَهُ »

📚 رواه البخاري ومسلم`,

maghrib: `صلاة المغرب ختام النهار.

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

return `${virtue[name]}

${details[name]}`;
}

// ================= BOT START =================

client.once("ready", async () => {
console.log("BOT READY - FAJR FIRST MODE");

const channel = await client.channels.fetch(CHANNEL_ID);

// 🔥 STEP SYSTEM (FAJR FIRST THEN EVERY 1 MINUTE)
let i = 0;

// 1) Send FAJR immediately
await channel.send({
embeds: [prayers[0]()],
components: [prayerButtons("الفجر")]
});

i = 1;

// 2) Continue every 1 minute
setInterval(async () => {

if (i >= prayers.length) return;

const names = ["الفجر","الظهر","العصر","المغرب","العشاء"];

await channel.send({
embeds: [prayers[i]()],
components: [prayerButtons(names[i])]
});

i++;

}, 60000);

});

client.login(process.env.TOKEN);
