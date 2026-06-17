const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const CHANNEL = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const COLOR = "#FFD700";

const AUTHOR = "مُـــذَكّــــــر";

const FOOTER = "قد يختلف موعد الاذان من مدينة لأخرى";

const prayers = [
{
name:"الفجر",
main:"﴿ فَأَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ ﴾",
full:`صلاة الفجر هي مقياس براءة الإنسان من النفاق...

«مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ»

📚 رواه الطبراني وصححه الألباني

صــلاة الــفــجــر

• عدد ركعاتها: 2
• سنتها القبلية: 2
• سنتها البعدية: 0`
},

{
name:"الظهر",
main:"﴿ فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا ﴾",
full:`صلاة الظهر هي أول صلاة فُرضت...

«إنها ساعة تُفتح فيها أبواب السماء»

📚 الترمذي

صــلاة الــظــهــر

• عدد ركعاتها: 4
• سنتها القبلية: 4
• سنتها البعدية: 2`
},

{
name:"العصر",
main:"﴿ حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ ﴾",
full:`صلاة العصر هي الصلاة الوسطى...

«من فاتته صلاة العصر...»

📚 البخاري ومسلم

صــلاة الــعــصــر

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 0`
},

{
name:"المغرب",
main:"﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ ﴾",
full:`صلاة المغرب وتر النهار...

«لا تزال أمتي بخير ما لم يؤخروا المغرب»

📚 أبو داود

صــلاة الــمـغــرب

• عدد ركعاتها: 3
• سنتها القبلية: 0
• سنتها البعدية: 2`
},

{
name:"العشاء",
main:"﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ ﴾",
full:`صلاة العشاء أثقل صلاة...

«مَن صلَّى العشاء في جماعة فكأنما قام نصف الليل»

📚 مسلم

صــلاة الــعــشــاء

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 2`
}
];

let index = 0;
let locked = false;

function embed(p){

return new EmbedBuilder()

.setColor(COLOR)

.setAuthor({
name: AUTHOR,
iconURL: ICON
})

.setTitle(`حان موعد أذان صلاة ${p.name} حسب التوقيت المحلي لمدينة الرباط`)

.setDescription(p.main)

.setFooter({
text: FOOTER,
iconURL: ICON
})

.setTimestamp();

}

function buttons(p){

return new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId(`prayer_${p.name}`)
.setLabel(`صلاة ${p.name}`)
.setStyle(ButtonStyle.Primary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);

}

async function send(client){

if(locked) return;
locked = true;

try{

const ch = await client.channels.fetch(CHANNEL);

const p = prayers[index];

await ch.send({
embeds:[embed(p)],
components:[buttons(p)]
});

index++;

if(index >= prayers.length){
index = 0;
}

}finally{
locked = false;
}

}

async function startPrayerSystem(client){

await send(client);

setInterval(() => {
send(client);
}, 60000);

}

module.exports = { startPrayerSystem };
