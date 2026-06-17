const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const CHANNEL = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&";

const COLOR = "#FFD700";

const AUTHOR = "مُـــذَكّــــــر";

const FOOTER = "4KO • YONKO.مُـــذَكّــــــر";

const prayers = [
{
name:"الفجر",
ayah:"﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ﴾",
text:`صلاة الفجر هي مقياس براءة الإنسان من النفاق...

«مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ»

📚 رواه الطبراني وصححه الألباني

صــلاة الــفــجــر

• عدد ركعاتها: 2  
• سنتها القبلية: 2  
• سنتها البعدية: 0`
},

{
name:"الظهر",
ayah:"﴿ وَأَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ ﴾",
text:`صلاة الظهر هي أول صلاة فُرضت...

«إنها ساعة تُفتح فيها أبواب السماء»

📚 الترمذي

صــلاة الــظــهــر

• عدد ركعاتها: 4  
• سنتها القبلية: 4  
• سنتها البعدية: 2`
},

{
name:"العصر",
ayah:"﴿ حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ ﴾",
text:`صلاة العصر هي الصلاة الوسطى...

«من فاتته صلاة العصر»

📚 البخاري ومسلم

صــلاة الــعــصــر

• عدد ركعاتها: 4  
• سنتها القبلية: 0  
• سنتها البعدية: 0`
},

{
name:"المغرب",
ayah:"﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ ﴾",
text:`صلاة المغرب وتر النهار...

«لا تزال أمتي بخير ما لم يؤخروا المغرب»

📚 أبو داود

صــلاة الــمـغــرب

• عدد ركعاتها: 3  
• سنتها القبلية: 0  
• سنتها البعدية: 2`
},

{
name:"العشاء",
ayah:"﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ ﴾",
text:`صلاة العشاء أثقل صلاة...

«مَن صلَّى العِشاءَ في جماعةٍ فكأنَّما قامَ نِصفَ اللَّيلِ»

📚 مسلم

صــلاة الــعــشــاء

• عدد ركعاتها: 4  
• سنتها القبلية: 0  
• سنتها البعدية: 2`
}
];

let index = 0;
let started = false;

function embed(p){

return new EmbedBuilder()

.setColor(COLOR)

.setAuthor({
name: AUTHOR,
iconURL: ICON
})

.setTitle(`حان موعد أذان صلاة ${p.name} حسب التوقيت المحلي لمدينة الرباط`)

.setDescription(`***${p.ayah}***`)

.setFooter({
text: FOOTER,
iconURL: ICON
})

.setTimestamp();

}

function buttons(){

return new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId("prayer_info")
.setLabel("صلاة")
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);

}

async function loop(client){

if(started) return;
started = true;

const ch = await client.channels.fetch(CHANNEL);

async function next(){

if(index >= prayers.length){
index = 0;
}

await ch.send({
embeds:[embed(prayers[index])],
components:[buttons()]
});

index++;

setTimeout(next, 60000);

}

next();
}

async function startPrayerSystem(client){
await loop(client);
}

module.exports = { startPrayerSystem };
