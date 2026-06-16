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

const CHANNEL_ID = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR =
"مُـــذَكّــــــر | مواعـــيد الصــــلاة";

const FOOTER =
"مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= PRAYERS (كما هي بدون تغيير) =================

const prayers = {

fajr: {
title: "الفجر",
verse:
`وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا

✨ بيان : قرآن الفجر ← صلاة الفجر`,
description:
`صلاة الفجر هي مقياس براءة الإنسان من النفاق، والمحافظة عليها في وقتها أمارة على نيل ذمة الله وحفظه؛ لقوله ﷺ:

«مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ»

📚 رواه الطبراني وصححه الألباني


***صــلاة الــفــجــر***

• عدد ركعاتها: 2
• سنتها القبلية: 2
• سنتها البعدية: 0`
},

dhuhr: {
title:"الظهر",
verse:
`فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا`,
description:
`صلاة الظهر هي أول صلاة فُرضت وصُلِّيت في الإسلام، والمحافظة عليها وسط النهار أمارة على فتح أبواب السماء واستجابة الدعاء؛ لقوله ﷺ:

«إنَّها ساعةٌ تُفْتَحُ فيها أبوابُ السَّماءِ، فأحبُّ أن يصعَدَ لي فيها عملٌ صالحٌ»

📚 رواه الترمذي وصححه الألباني


***صــلاة الــظــهــر***

• عدد ركعاتها: 4
• سنتها القبلية: 4
• سنتها البعدية: 2`
},

asr: {
title:"العصر",
verse:
`وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ`,
description:
`صلاة العصر هي الصلاة الوسطى التي خصّها الله بمزيد من التأكيد، والمحافظة عليها أمارة على الفوز بضعف الأجر والسلامة من حبوط العمل؛ لقوله ﷺ:

«الَّذي تفوتُهُ صلاةُ العصرِ فأنَّما وُتِرَ أَهْلَهُ ومالَهُ»

📚 رواه البخاري ومسلم


***صــلاة الــعــصــر***

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 0`
},

maghrib: {
title:"المغرب",
verse:
`وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ`,
description:
`صلاة المغرب هي وتر النهار، والمحافظة عليها فور غروب الشمس أمارة على استقامة الأمة؛ لقوله ﷺ:

«لا تزالُ أمَّتي بخيرٍ ما لم يُؤخِّروا المغربَ حتى تشتبكَ النجومُ»

📚 رواه أبو داود وأحمد


***صــلاة الــمـغــرب***

• عدد ركعاتها: 3
• سنتها القبلية: 0
• سنتها البعدية: 2`
},

isha: {
title:"العشاء",
verse:
`وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ`,
description:
`صلاة العشاء هي أثقل صلاة على المنافقين، والمحافظة عليها في جماعة أمارة على قيام نصف الليل ونيل النور التام يوم القيامة؛ لقوله ﷺ:

«مَن صلَّى العِشاءَ في جماعةٍ فكأنَّما قامَ نِصفَ اللَّيلِ»

📚 رواه مسلم


***صــلاة الــعــشــاء***

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 2`
}

};

// ================= BUILD =================

function mainEmbed(key){

const p = prayers[key];

return new EmbedBuilder()
.setAuthor({ name: AUTHOR, iconURL: ICON })
.setTitle(`حان موعد أذان صلاة ${p.title} حسب التوقيت المحلي لمدينة الرباط`)
.setDescription(`قال تعالى :\n\n***﴿ ${p.verse} ﴾***`)
.setColor("#E8C547")
.setFooter({ text: FOOTER, iconURL: ICON })
.setTimestamp();

}

function buttons(key){

return new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId(`pray_${key}`)
.setLabel(`صلاة ${prayers[key].title}`)
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);

}

// ================= SEND SINGLE =================

async function sendPrayer(key){

try{

const channel = await client.channels.fetch(CHANNEL_ID);
if(!channel) return;

await channel.send({
embeds:[mainEmbed(key)],
components:[buttons(key)]
});

console.log("SENT:", key);

}catch(err){
console.log("ERROR:", err);
}

}

// ================= READY =================

client.once("ready", async ()=>{

console.log("BOT READY");

// 🔥 إرسال كل الصلوات فور التشغيل (دفعة واحدة)
const order = ["fajr","dhuhr","asr","maghrib","isha"];

for(const key of order){
await sendPrayer(key);
}

console.log("ALL PRAYERS SENT IMMEDIATELY");

});

// ================= LOGIN =================

client.login(process.env.TOKEN);
