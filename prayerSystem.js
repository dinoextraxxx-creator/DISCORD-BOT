const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const CHANNEL_ID = "1516405973365952633";

const ICON = null;

const AUTHOR =
"مُـــذَكّــــــر | مواعيد الصلاة";

const FOOTER =
"مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

const prayers = [
{
name:"الفجر",
time:"04:24"
},
{
name:"الظهر",
time:"13:33"
},
{
name:"العصر",
time:"17:14"
},
{
name:"المغرب",
time:"20:45"
},
{
name:"العشاء",
time:"22:18"
}
];

function buildEmbed(p){

return new EmbedBuilder()

.setColor("#E8C547")

.setAuthor({
name:AUTHOR
})

.setTitle(
`حان موعد أذان صلاة ${p.name}`
)

.setDescription(

`﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾

🕰 الوقت الأصلي:
${p.time}

🕌 الصلاة:
${p.name}`

)

.setFooter({
text:FOOTER
})

.setTimestamp();

}

function buildButtons(p){

return new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
`pray_${p.name}`
)

.setLabel(
`صلاة ${p.name}`
)

.setStyle(
ButtonStyle.Secondary
),

new ButtonBuilder()

.setCustomId(
"azkar"
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

const channel =
await client.channels.fetch(
CHANNEL_ID
);

let i = 0;

await channel.send({

embeds:[
buildEmbed(
prayers[i]
)
],

components:[
buildButtons(
prayers[i]
)
]

});

setInterval(

async()=>{

i++;

if(
i>=prayers.length
){
i=0;
}

await channel.send({

embeds:[
buildEmbed(
prayers[i]
)
],

components:[
buildButtons(
prayers[i]
)
]

});

},

60000

);

}

module.exports={
startPrayerSystem
};
