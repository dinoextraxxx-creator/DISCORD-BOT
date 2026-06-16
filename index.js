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

const CHANNEL_ID = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AUTHOR =
"مُـــذَكّــــــر | مواعـــيد الصــــلاة";

const FOOTER =
"مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

//====================

const prayers = {

fajr:{
title:"الفجر",
verse:`وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا

✨ بيان : قرآن الفجر ← صلاة الفجر`,
desc:`صلاة الفجر هي مقياس براءة الإنسان من النفاق، والمحافظة عليها في وقتها أمارة على نيل ذمة الله وحفظه؛ لقوله ﷺ:

«مَن صلَّى الصُّبحَ في جماعةٍ فَهوَ في ذمَّةِ اللَّهِ»

📚 رواه الطبراني وصححه الألباني


***صــلاة الــفــجــر***

• عدد ركعاتها: 2
• سنتها القبلية: 2
• سنتها البعدية: 0`
},

dhuhr:{
title:"الظهر",
verse:`فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا`,
desc:`صلاة الظهر هي أول صلاة فُرضت وصُلِّيت في الإسلام، والمحافظة عليها وسط النهار أمارة على فتح أبواب السماء واستجابة الدعاء؛ لقوله ﷺ:

«إنَّها ساعةٌ تُفْتَحُ فيها أبوابُ السَّماءِ، فأحبُّ أن يصعَدَ لي فيها عملٌ صالحٌ»

📚 رواه الترمذي وصححه الألباني


***صــلاة الــظــهــر***

• عدد ركعاتها: 4
• سنتها القبلية: 4
• سنتها البعدية: 2`
},

asr:{
title:"العصر",
verse:`وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ`,
desc:`صلاة العصر هي الصلاة الوسطى التي خصّها الله بمزيد من التأكيد، والمحافظة عليها أمارة على الفوز بضعف الأجر والسلامة من حبوط العمل؛ لقوله ﷺ:

«الَّذي تفوتُهُ صلاةُ العصرِ فأنَّما وُتِرَ أَهْلَهُ ومالَهُ»

📚 رواه البخاري ومسلم


***صــلاة الــعــصــر***

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 0`
},

maghrib:{
title:"المغرب",
verse:`وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ`,
desc:`صلاة المغرب هي وتر النهار، والمحافظة عليها فور غروب الشمس أمارة على استقامة الأمة؛ لقوله ﷺ:

«لا تزالُ أمَّتي بخيرٍ ما لم يُؤخِّروا المغربَ حتى تشتبكَ النجومُ»

📚 رواه أبو داود وأحمد


***صــلاة الــمـغــرب***

• عدد ركعاتها: 3
• سنتها القبلية: 0
• سنتها البعدية: 2`
},

isha:{
title:"العشاء",
verse:`وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ`,
desc:`صلاة العشاء هي أثقل صلاة على المنافقين، والمحافظة عليها في جماعة أمارة على قيام نصف الليل ونيل النور التام يوم القيامة؛ لقوله ﷺ:

«مَن صلَّى العِشاءَ في جماعةٍ فكأنَّما قامَ نِصفَ اللَّيلِ»

📚 رواه مسلم


***صــلاة الــعــشــاء***

• عدد ركعاتها: 4
• سنتها القبلية: 0
• سنتها البعدية: 2`
}

};

//====================

const AZKAR=`1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا". (( يقول ذلك عقب تشهد المؤذن))

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد`;

//====================

function mainEmbed(key){

return new EmbedBuilder()

.setAuthor({
name:AUTHOR,
iconURL:ICON
})

.setTitle(
`حان موعد أذان صلاة ${prayers[key].title} حسب التوقيت المحلي لمدينة الرباط`
)

.setColor("#E8C547")

.setDescription(
`قال تعالى :

***﴿ ${prayers[key].verse} ﴾***`
)

.setFooter({
text:FOOTER,
iconURL:ICON
})

.setTimestamp();

}

//====================

function buttons(key){

return new ActionRowBuilder()

.addComponents(

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

//====================

client.on("interactionCreate",async(i)=>{

try{

if(!i.isButton()) return;

if(i.customId==="azkar"){

return i.reply({

ephemeral:true,

embeds:[
new EmbedBuilder()

.setAuthor({
name:AUTHOR,
iconURL:ICON
})

.setDescription(AZKAR)

.setColor("#E8C547")

.setFooter({
text:FOOTER,
iconURL:ICON
})

.setTimestamp()
]

});

}

if(i.customId.startsWith("pray_")){

const key=
i.customId.replace(
"pray_",
""
);

return i.reply({

ephemeral:true,

embeds:[

new EmbedBuilder()

.setAuthor({
name:AUTHOR,
iconURL:ICON
})

.setDescription(
prayers[key].desc
)

.setColor("#E8C547")

.setFooter({
text:FOOTER,
iconURL:ICON
})

.setTimestamp()

]

});

}

}catch(e){

console.log(e);

}

});

//====================

async function start(){

const channel=
await client.channels.fetch(
CHANNEL_ID
);

const order=[
"fajr",
"dhuhr",
"asr",
"maghrib",
"isha"
];

for(let i=0;i<order.length;i++){

await channel.send({

embeds:[
mainEmbed(
order[i]
)
],

components:[
buttons(
order[i]
)
]

});

if(i<order.length-1){

await new Promise(
r=>
setTimeout(
r,
60000
)
);

}

}

}

client.once(
"ready",
async()=>{

console.log(
"READY"
);

await start();

}
);

client.login(
process.env.TOKEN
);
