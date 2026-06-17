const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const CHANNEL = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&";

const AUTHOR = "مُـــذَكّــــــر | مواعـــيد الصــــلاة";
const FOOTER = "قد يتغر موعد الاذان من مدينة لاخرى";

const COLOR = "#FFD700";

/*
🟢 IMPORTANT:
- NO LOOP
- NO REPEATED SENDING
- RUNS ONCE ONLY ON START
*/

const prayers = [
{
name:"الفجر",
desc:`صلاة الفجر هي مقياس براءة الإنسان من النفاق، والمحافظة عليها في وقتها أمارة على نيل ذمة الله وحفظه؛ لقوله ﷺ:

«مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ»

📚 رواه الطبراني وصححه الألباني

صــلاة الــفــجــر

• عدد ركعاتها: 2
• سنتها القبلية: 2
• سنتها البعدية: 0`
},

{
name:"الظهر",
desc:`صلاة الظهر هي أول صلاة فُرضت وصُلِّيت في الإسلام...

«إنها ساعة تُفتح فيها أبواب السماء»

📚 رواه الترمذي

صــلاة الــظــهــر

• عدد ركعاتها: 4
• سنتها القبلية: 4
• سنتها البعدية: 2`
},

{
name:"العصر",
desc:`صلاة العصر هي الصلاة الوسطى...

«الذي تفوته صلاة العصر»

📚 البخاري ومسلم

صــلاة الــعــصــر

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 0`
},

{
name:"المغرب",
desc:`صلاة المغرب وتر النهار...

«لا تزال أمتي بخير»

📚 أبو داود

صــلاة الــمـغــرب

• عدد ركعاتها: 3
• سنتها القبلية: 0
• سنتها البعدية: 2`
},

{
name:"العشاء",
desc:`صلاة العشاء هي أثقل صلاة...

«من صلى العشاء في جماعة»

📚 مسلم

صــلاة الــعــشــاء

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 2`
}
];

function buildEmbed(p){

return new EmbedBuilder()
.setColor(COLOR)
.setAuthor({
name: AUTHOR,
iconURL: ICON
})
.setTitle(`حان موعد أذان صلاة ${p.name} حسب التوقيت المحلي لمدينة الرباط`)
.setDescription(`قال الله تعالى :

**﴿ وَأَقِمِ الصَّلَاةَ ﴾**

`)
.addFields([
{
name: "تفاصيل الصلاة",
value: p.desc
}
])
.setFooter({
text: FOOTER,
iconURL: ICON
})
.setTimestamp();

}

function buildButtons(p){

return new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId(`prayer_${p.name}`)
.setLabel(`صلاة ${p.name}`)
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);

}

/*
🚨 RUN ONLY ONCE (NO LOOP SYSTEM)
*/

async function startPrayerSystem(client){

const ch = await client.channels.fetch(CHANNEL);

for(const p of prayers){

await ch.send({
embeds:[buildEmbed(p)],
components:[buildButtons(p)]
});

await new Promise(r => setTimeout(r, 60000)); // 1 minute spacing only

}

}

module.exports = { startPrayerSystem };
