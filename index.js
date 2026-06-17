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

// ================= SAFETY =================

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

// ================= CONFIG =================

const CHANNEL_ID = "1516016586643734639";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR =
"مُـــذَكّــــــر | مواعـــيد الصــــلاة";

const FOOTER =
"مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= PRAYERS (لا تغيّرها أنت لاحقاً) =================

const prayers = {
fajr: {
title: "الفجر",
verse: "﴿ وَقُرْآنَ الْفَجْرِ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾",
description: "صلاة الفجر..."
},
dhuhr: {
title: "الظهر",
verse: "﴿ فَأَقِيمُوا الصَّلَاةَ ۚ ﴾",
description: "صلاة الظهر..."
},
asr: {
title: "العصر",
verse: "﴿ وَالْعَصْرِ ﴾",
description: "صلاة العصر..."
},
maghrib: {
title: "المغرب",
verse: "﴿ فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ ﴾",
