const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const { DateTime } = require("luxon");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = "1516405973365952633";

const TZ = "Africa/Casablanca";

let started = false;

function createMainEmbed() {
return new EmbedBuilder()

.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL:
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f"
})

.setTitle(
"حــان مــوعـد أذان صــلاة الفـجـر حــسـب التـوقـيـت المـحـلي لمـديـنة الربــاط"
)

.setColor("#FFD700")

.setDescription(`**قال الله تعالى**

*﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾*

صلاة الفجر`)

.setFooter({
text:
"قد تختلف مواعيد الصلاة من مدينة لأخرى"
})

.setTimestamp();
}

function fajrButtonEmbed() {
return new EmbedBuilder()

.setAuthor({
name: "مُـــذَكّــــــر",
iconURL:
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f"
})

.setColor("#FFD700")

.setDescription(`صلاة المغرب هي وتر النهار، والمحافظة عليها فور غروب الشمس أمارة على استقامة الأمة؛ لقوله ﷺ: «لا تزالُ أمَّتي بخَيرٍ - أو قالَ: علَى الفِطرةِ - ما لَم يؤخِّروا المَغربَ حتَّى تشتبِكَ النُّجومُ» (رواه أبو داود وأحمد)

***صــلاة الــمـغــرب***

• **عدد ركعاتها:** 3
• **سنتها القبلية:** 0
• **سنتها البعدية:** 2`)

.setFooter({
text: "4KO • YONKO.مُـــذَكّــــــر",
iconURL:
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f"
})

.setTimestamp();
}

function adhanEmbed() {
return new EmbedBuilder()

.setAuthor({
name: "مُـــذَكّــــــر",
iconURL:
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f"
})

.setTitle("أذكـــــار الأذان")

.setColor("#FFD700")

.setDescription(`1- يقول مثل ما يقول المؤذن إلا في "حي على الصلاة و حي على الفلاح"

2- يقول:
"وأنا أشهد أن لا إله إلا الله..."

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة...

5- يدعو لنفسه بين الأذان والإقامة`)

.setFooter({
text: "4KO • YONKO.مُـــذَكّــــــر",
iconURL:
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg?ex=6a30b301&is=6a2f6181&hm=99212fa7d1a01c5bd6253cacfb49d1b849226abffe617b60c1c53121e1805f0f"
})

.setTimestamp();
}

async function sendEmbed() {

const channel =
await client.channels.fetch(CHANNEL_ID);

const row =
new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId("fajr")
.setLabel("صلاة الفجر")
.setStyle(ButtonStyle.Secondary),

new ButtonBuilder()
.setCustomId("adhan")
.setLabel("أذكار الأذان")
.setStyle(ButtonStyle.Secondary)

);

await channel.send({
embeds: [createMainEmbed()],
components: [row]
});
}

client.on("interactionCreate", async (i) => {

if (!i.isButton()) return;

if (i.customId === "fajr") {

return i.reply({
ephemeral: true,
embeds: [fajrButtonEmbed()]
});

}

if (i.customId === "adhan") {

return i.reply({
ephemeral: true,
embeds: [adhanEmbed()]
});

}

});

client.once("ready", () => {

console.log("READY");

setInterval(async () => {

const now =
DateTime.now()
.setZone(TZ);

if (
!started &&
now.hour === 4 &&
now.minute === 37
) {

started = true;

await sendEmbed();

setInterval(sendEmbed, 120000);

}

}, 10000);

});

client.login(process.env.TOKEN);
