const {
Client,
GatewayIntentBits,
Events,
EmbedBuilder
}=require("discord.js");

const startPrayerSystem=require("./prayerSystem");

global.PRAYER_ICON=
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

global.BUTTON_ICON=
"https://cdn.discordapp.com/attachments/1515161056975126705/1516909922040811610/-_4.jpg";

global.PRAYER_DETAILS=require("./prayerDetails");

const AZKAR=`
1- يقول مثل ما يقول المؤذن إلا في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا"

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد
`;

const client=new Client({

intents:[
GatewayIntentBits.Guilds
]

});

client.once(

Events.ClientReady,

()=>{

startPrayerSystem(client);

}

);

client.on(

Events.InteractionCreate,

async(i)=>{

if(!i.isButton()) return;

if(i.customId.startsWith("pray_")){

const prayer=
decodeURIComponent(
i.customId.replace(
"pray_",
""
)
);

return i.reply({

ephemeral:true,

embeds:[

new EmbedBuilder()

.setColor("#00FF66")

.setAuthor({

name:"مُـــذَكّــــــر",

iconURL:
global.BUTTON_ICON

})

.setDescription(

global.PRAYER_DETAILS[
prayer
]

)

.setFooter({

text:
"4KO • YONKO.مُـــذَكّــــــر",

iconURL:
global.BUTTON_ICON

})

.setTimestamp()

]

});

}

if(
i.customId==="azkar"
){

return i.reply({

ephemeral:true,

embeds:[

new EmbedBuilder()

.setColor("#00FF66")

.setAuthor({

name:
"مُـــذَكّــــــر",

iconURL:
global.BUTTON_ICON

})

.setTitle(
"اذكـــــــار الصــــــلاة"
)

.setDescription(
AZKAR
)

.setFooter({

text:
"4KO • YONKO.مُـــذَكّــــــر",

iconURL:
global.BUTTON_ICON

})

.setTimestamp()

)

]

});

}

}

);

client.login(
process.env.TOKEN
);
