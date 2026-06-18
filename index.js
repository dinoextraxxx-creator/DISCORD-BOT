const {
Client,
GatewayIntentBits,
Events,
EmbedBuilder
}=require("discord.js");

const startPrayerSystem=require("./prayerSystem");
const startHadithSystem=require("./hadithSystem");
const PRAYER_DETAILS=require("./prayers");

const client=new Client({
intents:[GatewayIntentBits.Guilds]
});

const ICON=
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AZKAR=`
1- يقول مثل ما يقول المؤذن إلا في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا"

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد
`;

client.once(Events.ClientReady,async()=>{
console.log("BOT READY");

try{await startPrayerSystem(client);}catch(e){console.log(e);}
try{
await startHadithSystem(client,{
icon:ICON,
color:"#FFA500"
});
}catch(e){console.log(e);}
});

client.on(Events.InteractionCreate,async(i)=>{

if(!i.isButton())return;

try{

if(i.customId.startsWith("pray_")){
const prayer=i.customId.replace("pray_","");

return i.reply({
ephemeral:true,
embeds:[
new EmbedBuilder()
.setColor("#00FF66")
.setAuthor({name:"مُـــذَكّــــــر",iconURL:ICON})
.setDescription(PRAYER_DETAILS?.[prayer]||"لا توجد بيانات")
.setFooter({text:"4KO • YONKO.مُـــذَكّــــــر",iconURL:ICON})
.setTimestamp()
]
});
}

if(i.customId==="azkar"){
return i.reply({
ephemeral:true,
embeds:[
new EmbedBuilder()
.setColor("#00FF66")
.setAuthor({name:"مُـــذَكّــــــر",iconURL:ICON})
.setTitle("اذكـــــــار الصــــلاة")
.setDescription(AZKAR)
.setFooter({text:"4KO • YONKO.مُـــذَكّــــــر",iconURL:ICON})
.setTimestamp()
]
});
}

}catch(err){
console.log(err);
if(!i.replied){
i.reply({ephemeral:true,content:"خطأ"});
}
}

});

client.login(process.env.TOKEN);
