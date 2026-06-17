const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
}=require("discord.js");

const axios=require("axios");

const CHANNEL="1516405973365952633";

const CITY="Casablanca";
const COUNTRY="Morocco";
const METHOD=21; // Morocco

const SENT=new Set();

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

function createButtons(prayer){

return new ActionRowBuilder()

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

}

function createEmbed(prayer){

return new EmbedBuilder()

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

}

async function getPrayerTimes(){

const url=
`https://api.aladhan.com/v1/timingsByCity?city=${CITY}&country=${COUNTRY}&method=${METHOD}`;

const res=await axios.get(url);

return res.data.data.timings;

}

function nextDateFromTime(hhmm){

const now=new Date();

const [h,m]=hhmm.split(":").map(Number);

const d=new Date();

d.setHours(h);
d.setMinutes(m);
d.setSeconds(0);

if(d<now){

d.setDate(d.getDate()+1);

}

return d;

}

async function sendPrayer(client,prayer){

const today=
new Date().toDateString();

const key=
`${today}-${prayer}`;

if(SENT.has(key)) return;

SENT.add(key);

const channel=
await client.channels.fetch(CHANNEL);

await channel.send({

embeds:[
createEmbed(prayer)
],

components:[
createButtons(prayer)
]

});

}

module.exports=async(client)=>{

console.log("Prayer realtime scheduler started");

while(true){

try{

const timings=
await getPrayerTimes();

const schedule=[

["الفجر",timings.Fajr],
["الظهر",timings.Dhuhr],
["العصر",timings.Asr],
["المغرب",timings.Maghrib],
["العشاء",timings.Isha]

];

for(const item of schedule){

const prayer=item[0];

const time=item[1];

const target=
nextDateFromTime(time);

const wait=
target-Date.now();

if(wait>0){

console.log(
`Waiting ${prayer} (${time})`
);

await sleep(wait);

}

await sendPrayer(
client,
prayer
);

}

SENT.clear();

await sleep(
60000
);

}catch(err){

console.log(
"Prayer Error:",
err.message
);

await sleep(
300000
);

}

}

};
