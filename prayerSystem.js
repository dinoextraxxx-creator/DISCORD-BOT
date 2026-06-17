const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const CHANNEL =
"1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&";

const COLOR =
"#FFD700";

const AUTHOR =
"مُـــذَكّــــــر";

const FOOTER =
"4KO • YONKO.مُـــذَكّــــــر";

const prayers = [

{
name:"الفجر",
ayah:"﴿ فَأَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾"
},

{
name:"الظهر",
ayah:"﴿ فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾"
},

{
name:"العصر",
ayah:"﴿ حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ ﴾"
},

{
name:"المغرب",
ayah:"﴿ وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ﴾"
},

{
name:"العشاء",
ayah:"﴿ وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ ﴾"
}

];

function prayerEmbed(p){

return new EmbedBuilder()

.setColor(COLOR)

.setAuthor({

name:AUTHOR,

iconURL:ICON

})

.setTitle(
"حان موعد أذان صلاة ${p.name} حسب التوقيت المحلي لمدينة الرباط"
)

.setDescription(

`قال تعالى :

${p.ayah}`

)

.setFooter({

text:FOOTER,

iconURL:ICON

})

.setTimestamp();

}

function buttons(p){

return new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"prayer_${p.name}"
)

.setLabel(
"صلاة ${p.name}"
)

.setStyle(
ButtonStyle.Secondary
),

new ButtonBuilder()

.setCustomId(
"azan"
)

.setLabel(
"أذكار الأذان"
)

.setStyle(
ButtonStyle.Secondary
)

);

}

async function startPrayerSystem(client){

const ch =
await client.channels.fetch(
CHANNEL
);

let i = 0;

async function send(){

const p =
prayers[i];

await ch.send({

embeds:[
prayerEmbed(p)
],

components:[
buttons(p)
]

});

i++;

if(
i>=prayers.length
){
i=0;
}

}

await send();

setInterval(

send,

60000

);

}

module.exports={

startPrayerSystem

};
