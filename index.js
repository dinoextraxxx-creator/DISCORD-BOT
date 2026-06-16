const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = "1516405973365952633";

const ICON =
"https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

function mainEmbed() {

return new EmbedBuilder()

.setAuthor({
name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
iconURL: ICON
})

.setTitle(
"حــان مــوعـد أذان صــلاة الفـجـر حــسـب التـوقـيـت المـحـلي لمـديـنة الربــاط"
)

.setColor("#FFD700")

.setDescription(
`**قال الله تعالى**

     ***﴿ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا ﴾***

     صلاة الفجر`
)

.setFooter({
text: "قد تختلف مواعيد الصلاة من مدينة لأخرى"
})

.setTimestamp();

}

function prayerEmbed() {

return new EmbedBuilder()

.setAuthor({
name: "مُـــذَكّــــــر",
iconURL: ICON
})

.setColor("#FFD700")

.setDescription(
`صلاة المغرب هي وتر النهار، والمحافظة عليها فور غروب الشمس أمارة على استقامة الأمة؛ لقوله ﷺ: «لا تزالُ أمَّتي بخَيرٍ - أو قالَ: علَى الفِطرةِ - ما لَم يؤخِّروا المَغربَ حتَّى تشتبِكَ النُّجومُ» (رواه أبو داود وأحمد)

***صــلاة الــمـغــرب***

• **عدد ركعاتها:** 3
• **سنتها القبلية:** 0
• **سنتها البعدية:** 2`
)

.setFooter({
text: "4KO • YONKO.مُـــذَكّــــــر",
iconURL: ICON
})

.setTimestamp();

}

function adhanEmbed() {

return new EmbedBuilder()

.setAuthor({
name: "مُـــذَكّــــــر",
iconURL: ICON
})

.setTitle("أذكـــــار الأذان")

.setColor("#FFD700")

.setDescription(
`1- يقول مثل ما يقول المؤذن إلا في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا"

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته

5- يدعو لنفسه بين الأذان والإقامة`
)

.setFooter({
text: "4KO • YONKO.مُـــذَكّــــــر",
iconURL: ICON
})

.setTimestamp();

}

async function sendMessage() {

const channel =
await client.channels.fetch(CHANNEL_ID);

const buttons =
new ActionRowBuilder()

.addComponents(

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
embeds: [mainEmbed()],
components: [buttons]
});

}

client.on("interactionCreate", async (i) => {

if (!i.isButton()) return;

if (i.customId === "fajr") {

return i.reply({
ephemeral: true,
embeds: [prayerEmbed()]
});

}

if (i.customId === "adhan") {

return i.reply({
ephemeral: true,
embeds: [adhanEmbed()]
});

}

});

client.once("ready", async () => {

console.log("BOT READY");

await sendMessage();

setInterval(
sendMessage,
120000
);

});

client.login(process.env.TOKEN);
