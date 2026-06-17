const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const CHANNEL = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR_MAIN = "مُـــذَكّــــــر | مواعـــيد الصــــلاة";
const AUTHOR_BUTTON = "مُـــذَكّــــــر";

const FOOTER_MAIN = "قد يتغر موعد الاذان من مدينة لاخرى";
const FOOTER_BUTTON = "4KO • YONKO.مُـــذَكّــــــر";

const COLOR = "#FFD700";

const prayers = [
{
name:"الفجر",
text:`صلاة الفجر هي مقياس براءة الإنسان من النفاق...

«مَن صلَّى الصبح في جماعة فهو في ذمة الله»

📚 رواه الطبراني

صلاة الفجر

• عدد ركعاتها: 2
• سنتها القبلية: 2
• سنتها البعدية: 0`
},

{
name:"الظهر",
text:`صلاة الظهر هي أول صلاة فُرضت...

«إنها ساعة تُفتح فيها أبواب السماء»

📚 الترمذي

صلاة الظهر

• عدد ركعاتها: 4
• سنتها القبلية: 4
• سنتها البعدية: 2`
},

{
name:"العصر",
text:`صلاة العصر هي الصلاة الوسطى...

«من فاتته صلاة العصر»

📚 البخاري

صلاة العصر

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 0`
},

{
name:"المغرب",
text:`صلاة المغرب وتر النهار...

«لا تزال أمتي بخير»

📚 أبو داود

صلاة المغرب

• عدد ركعاتها: 3
• سنتها القبلية: 0
• سنتها البعدية: 2`
},

{
name:"العشاء",
text:`صلاة العشاء أثقل صلاة...

«من صلى العشاء في جماعة»

📚 مسلم

صلاة العشاء

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 2`
}
];

function buildEmbed(p){

return new EmbedBuilder()
.setColor(COLOR)
.setAuthor({
name: AUTHOR_MAIN,
iconURL: ICON
})
.setTitle(`حان موعد أذان صلاة ${p.name} حسب التوقيت المحلي لمدينة الرباط`)
.setDescription(p.text)
.setFooter({
text: FOOTER_MAIN,
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

async function startPrayerSystem(client){

const ch = await client.channels.fetch(CHANNEL);

// إرسال كل الصلوات مرة واحدة فقط (بدون loop)
for(const p of prayers){

await ch.send({
embeds:[buildEmbed(p)],
components:[buildButtons(p)]
});

await new Promise(r => setTimeout(r, 60000)); // دقيقة بين كل صلاة فقط

}

}

module.exports = { startPrayerSystem };
