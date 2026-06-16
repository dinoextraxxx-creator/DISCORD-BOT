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

// ================= TIME FORMAT =================

function getTimeString() {
return DateTime.now().setZone(TZ).toFormat("HH:mm");
}

// ================= PRAYER DETAILS (BEFORE RAKAA) =================

function preText(name) {
const data = {
fajr: `صلاة الفجر هي مقياس براءة الإنسان من النفاق، والمحافظة عليها في وقتها أمارة على نيل ذمة الله وحفظه؛ لقوله ﷺ: «مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ» (رواه الطبراني وصححه الألباني).`,

dhuhr: `صلاة الظهر هي أول صلاة فُرضت وصُلِّيت في الإسلام، والمحافظة عليها وسط النهار أمارة على فتح أبواب السماء واستجابة الدعاء؛ لقوله ﷺ: «إنَّها ساعةٌ تُفْتَحُ فيها أبوابُ السَّماءِ، فأحبُّ أن يصعَدَ لي فيها عملٌ صالحٌ» (رواه الترمذي وصححه الألباني).`,

asr: `صلاة العصر هي الصلاة الوسطى التي خصّها الله بمزيد من التأكيد، والمحافظة عليها أمارة على الفوز بضعف الأجر والسلامة من حبوط العمل؛ لقوله ﷺ: «الَّذي تفوتُهُ صلاةُ العصرِ فأنَّما وُتِرَ أَهْلَهُ ومالَهُ» (رواه البخاري ومسلم).`,

maghrib: `صلاة المغرب من الصلوات العظيمة التي تُختم بها أعمال النهار.`,

isha: `صلاة العشاء هي أثقل صلاة على المنافقين، والمحافظة عليها في جماعة أمارة على قيام نصف الليل ونيل النور التام يوم القيامة؛ لقوله ﷺ: «مَن صلَّى العِشاءَ في جماعةٍ فكأنَّما قامَ نِصفَ اللَّيلِ» (رواه مسلم).`
};

return data[name];
}

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

// ================= AZKAR (FIXED TEXT) =================

const azkar = `1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا". (( يقول ذلك عقب تشهد المؤذن))

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد`;

// ================= INTERACTION =================

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
.setDescription(
`${preText(name)}

\n\n***صــلاة ${name}***
• عدد الركعات: ${name === "fajr" ? 2 : name === "dhuhr" ? 4 : name === "asr" ? 4 : name === "maghrib" ? 3 : 4}
• السنة القبلية: ${name === "dhuhr" ? 4 : name === "fajr" ? 2 : 0}
• السنة البعدية: ${name === "maghrib" ? 2 : name === "isha" ? 2 : 0}`
)
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

// ================= READY SYSTEM =================

client.once("ready", async () => {
console.log("BOT READY FINAL VERSION");

const channel = await client.channels.fetch(CHANNEL_ID);

// 🔥 START: 20:12
const startTime = DateTime.now()
.setZone(TZ)
.set({
hour: 20,
minute: 12,
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
