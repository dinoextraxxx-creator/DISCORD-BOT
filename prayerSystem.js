const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
}=require("discord.js");

const prayers=require("./prayers");

const CHANNEL="1516405973365952633";

function sleep(ms){
return new Promise(r=>setTimeout(r,ms));
}

function getAyah(prayer){

const intro="**قال الله تعالى :**";

if(prayer==="الفجر")
return `${intro}

**﴿وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا﴾**

قرآن الفجر : صلاة الفجر`;

if(prayer==="الظهر")
return `${intro}

**﴿فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾**`;

if(prayer==="العصر")
return `${intro}

**﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ﴾**`;

if(prayer==="المغرب")
return `${intro}

**﴿وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا﴾**`;

return `${intro}

**﴿وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾**`;

}

module.exports=async(client)=>{

const channel=await client.channels.fetch(CHANNEL);

for(const prayer of prayers){

const embed=new EmbedBuilder()

.setColor("#FFFF00")

.setAuthor({
name:"مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL:global.PRAYER_ICON
})

.setTitle(
`حان موعد أذان ${prayer} حسب التوقيت المحلي لمدينة الدار البيضاء`
)

.setDescription(
getAyah(prayer)
)

.setFooter({
text:"قد يختلف موعد الأذان من مدينة لأخرى",
iconURL:global.PRAYER_ICON
})

.setTimestamp();

const row=new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(`pray_${prayer}`)

.setLabel(`صلاة ${prayer}`)

.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()

.setCustomId("azkar")

.setLabel("اذكار الصلاة")

.setStyle(ButtonStyle.Secondary)

);

await channel.send({

embeds:[embed],

components:[row]

});

if(prayer!=="العشاء"){

await sleep(60000);

}

}

};
