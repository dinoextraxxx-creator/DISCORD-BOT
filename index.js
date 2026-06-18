const {
Client,
GatewayIntentBits,
Events
}=require("discord.js");

const startPrayerSystem=require("./prayerSystem");
const startHadithSystem=require("./hadithSystem");
const PRAYER_DETAILS=require("./prayers");

const client=new Client({
intents:[GatewayIntentBits.Guilds]
});

// 🟠 أيقونة موحدة (ثابتة)
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

await startPrayerSystem(client);

await startHadithSystem(client,{
icon:ICON,
color:"#FFA500"
});
});

client.login(process.env.TOKEN);
