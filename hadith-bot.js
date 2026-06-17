const {
Client,
GatewayIntentBits,
EmbedBuilder
} = require("discord.js");

const client = new Client({
intents:[GatewayIntentBits.Guilds]
});

//=================== CONFIG ===================

const CHANNEL_ID="1516016586643734639";

const ICON=
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&";

const INTERVAL=120000;

//=================== TEST HADITHS ===================

const hadiths=[

{
text:"«ما زال جبريل يوصيني بالجار حتى ظننت أنه سيورثه»",
rawi:"ابن عمر رضي الله عنهما",
source:"صحيح البخاري ومسلم",
note:"المقصود ← تعظيم حق الجار"
},

{
text:"«من صلى علي صلاة واحدة صلى الله عليه عشراً»",
rawi:"أبو هريرة رضي الله عنه",
source:"صحيح مسلم",
note:"فضل ← مضاعفة الأجر"
},

{
text:"«خيركم من تعلم القرآن وعلمه»",
rawi:"عثمان رضي الله عنه",
source:"صحيح البخاري"
},

{
text:"«من سلك طريقاً يلتمس فيه علماً سهّل الله له به طريقاً إلى الجنة»",
rawi:"أبو هريرة رضي الله عنه",
source:"صحيح مسلم"
}

];

//=================== BUILD ===================

function buildEmbed(h){

let desc=

`🔸 ➤ **قال رسول الله ﷺ:** ${h.text}

👤 ➤ **الراوي:** ${h.rawi}

📚 ➤ **المصدر:** ${h.source}`;

if(h.note){

desc+=`

📖 ➤ **بيان ←** ${h.note}`;

}

return new EmbedBuilder()

.setAuthor({
name:"مُـــذَكّــــــر",
iconURL:ICON
})

.setTitle(
"﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ ﴾"
)

.setDescription(desc)

.setColor("#E8C547")

.setFooter({
text:"مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL:ICON
})

.setTimestamp();

}

//=================== SEND ===================

let loopStarted=false;

async function sendRandom(){

try{

const channel=
await client.channels.fetch(
CHANNEL_ID
);

if(!channel)
return;

const random=
hadiths[
Math.floor(
Math.random()*
hadiths.length
)
];

await channel.send({

embeds:[
buildEmbed(
random
)
]

});

console.log(
"Hadith sent"
);

}

catch(err){

console.log(
"Send Error:",
err.message
);

}

}

//=================== READY ===================

client.once(
"ready",

async()=>{

console.log(
`READY ${client.user.tag}`
);

if(loopStarted)
return;

loopStarted=true;

// أول إرسال مباشرة

await sendRandom();

// ثم كل دقيقتين

setInterval(
sendRandom,
INTERVAL
);

}

);

//=================== SAFE ===================

process.on(
"unhandledRejection",
console.error
);

process.on(
"uncaughtException",
console.error
);

//=================== LOGIN ===================

client.login(
process.env.TOKEN
);
