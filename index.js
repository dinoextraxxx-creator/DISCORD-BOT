const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

console.log("🔥 BOT STARTING...");

async function safe(name, fn){
try{
console.log(`🟢 Loading ${name}...`);
await fn(client);
console.log(`✅ ${name} LOADED`);
}catch(err){
console.log(`❌ ${name} ERROR`);
console.log(err);
}
}

client.once("ready", async () => {

console.log("✅ BOT READY");

await safe("PRAYER", require("./prayerSystem").startPrayerSystem);
await safe("HADITH", require("./hadithSystem").startHadithSystem);

console.log("🚀 SYSTEM ONLINE");

});

client.on("interactionCreate", async (i) => {

if(!i.isButton()) return;

if(i.customId.startsWith("prayer_")){

const name = i.customId.replace("prayer_","");

return i.reply({
embeds:[
new EmbedBuilder()
.setColor("#FFD700")
.setAuthor({
name:"مُـــذَكّــــــر",
iconURL:"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&"
})
.setDescription(`تفاصيل صلاة ${name}`)
.setFooter({
text:"4KO • YONKO.مُـــذَكّــــــر",
iconURL:"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&"
})
.setTimestamp()
],
ephemeral:true
});

}

if(i.customId === "azkar"){

return i.reply({
embeds:[
new EmbedBuilder()
.setColor("#FFD700")
.setAuthor({
name:"مُـــذَكّــــــر",
iconURL:"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&"
})
.setDescription(`1- يقول مثل ما يقول المؤذن __إلا__ في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا". (( يقول ذلك عقب تشهد المؤذن))

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد`)
.setFooter({
text:"4KO • YONKO.مُـــذَكّــــــر",
iconURL:"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f&"
})
.setTimestamp()
],
ephemeral:true
});

}

});

client.login(process.env.TOKEN);
