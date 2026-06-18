const {
Client,
GatewayIntentBits,
Events,
EmbedBuilder
}=require("discord.js");

const startPrayerSystem=
require("./prayerSystem");

const startHadithSystem=
require("./hadithSystem");

const PRAYER_DETAILS=
require("./prayers");

const client=
new Client({

intents:[
GatewayIntentBits.Guilds
]

});

const ICON_PRAYER=
"https://cdn.discordapp.com/attachments/1515161056975126705/1516909922040811610/-_4.jpg";

const ICON_HADITH=
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

client.once(
Events.ClientReady,
async()=>{

console.log(
"BOT READY"
);

await startPrayerSystem(
client
);

await startHadithSystem(
client,
{
channelId:
"1516405973365952633",

icon:
ICON_HADITH,

color:
"#FF0000"
}
);

});

client.login(
process.env.TOKEN
);
