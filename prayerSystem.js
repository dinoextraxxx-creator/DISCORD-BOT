const axios=require("axios");

const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
}=require("discord.js");

const API=
"https://api.aladhan.com/v1/timingsByCity?city=Casablanca&country=Morocco&method=18";

const CHANNEL=
"1516405973365952633";

const ICON=
"https://cdn.discordapp.com/attachments/1515161056975126705/1516909922040811610/-_4.jpg";

let sent={};

function hhmm(t){
return t.split(" ")[0]
.replace(/\(.*/,"")
.slice(0,5);
}

const names={
fajr:"الفجر",
dhuhr:"الظهر",
asr:"العصر",
maghrib:"المغرب",
isha:"العشاء"
};

async function startPrayerSystem(client){

setInterval(async()=>{

try{

const r=
await axios.get(API);

const t=
r.data.data.timings;

const list=[
["fajr",hhmm(t.Fajr)],
["dhuhr",hhmm(t.Dhuhr)],
["asr",hhmm(t.Asr)],
["maghrib",hhmm(t.Maghrib)],
["isha",hhmm(t.Isha)]
];

const now=
new Date();

const key=
now.toDateString();

if(!sent[key])
sent[key]={};

const current=
`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

for(const [id,time] of list){

if(time!==current)
continue;

if(sent[key][id])
continue;

sent[key][id]=true;

const ch=
await client.channels.fetch(CHANNEL);

const row=
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()
.setCustomId(`pray_${id}`)
.setLabel(`صلاة ${names[id]}`)
.setStyle(
ButtonStyle.Secondary
),

new ButtonBuilder()
.setCustomId("azkar")
.setLabel("اذكار الصلاة")
.setStyle(
ButtonStyle.Secondary
)

);

const embed=
new EmbedBuilder()

.setColor("#FFD700")

.setAuthor({
name:
"مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL:
ICON
})

.setTitle(
`حان موعد صلاة ${names[id]} حسب التوقيت المحلي لمدينة الدار البيضاء`
)

.setDescription(
"قال الله تعالى\n\n**(الآية تؤخذ من prayers.js كما ثبتناه سابقاً)**"
)

.setFooter({
text:
"4KO • YONKO.مُـــذَكّــــــر",
iconURL:
ICON
})

.setTimestamp();

await ch.send({

embeds:[
embed
],

components:[
row
]

});

}

}catch(e){

console.log(
e.message
);

}

},30000);

}

module.exports=
startPrayerSystem;
