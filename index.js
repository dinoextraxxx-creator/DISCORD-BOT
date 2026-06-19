const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder
} = require("discord.js");

const startPrayerSystem = require("./prayerSystem");
const startHadithSystem = require("./hadithSystem");
const PRAYER_DETAILS = require("./prayers");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const ICON_PRAYER =
  "https://cdn.discordapp.com/attachments/1515161056975126705/1516909922040811610/-_4.jpg";

const ICON_HADITH =
  "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const AZKAR = `
1- يقول مثل ما يقول المؤذن إلا في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا"

3- يصلي على النبي -صلى الله عليه وسلم- بعد فراغه من إجابة المؤذن

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة، وابعثه مقامًا محمودًا الذي وعدته، [ إنك لا تخلف الميعاد ]

5- يدعو لنفسه بين الأذان والإقامة فإن الدعاء حينئذٍ لا يرد
`;

client.once(Events.ClientReady, async () => {
  console.log("BOT READY");

  try {
    await startPrayerSystem(client);
  } catch (e) {
    console.log("Prayer init error:", e);
  }

  try {
    await startHadithSystem(client, {
      channelId: "1516016586643734639",
      icon: ICON_HADITH,
      color: "#FF0000"
    });
  } catch (e) {
    console.log("Hadith init error:", e);
  }
});

client.on(Events.InteractionCreate, async (i) => {
  if (!i.isButton()) return;

  try {
    if (i.customId.startsWith("pray_")) {
      const prayer = i.customId.replace("pray_", "");
      const data = PRAYER_DETAILS[prayer];

      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#00FF66")
            .setAuthor({ name: "مُـــذَكّــــــر", iconURL: ICON_PRAYER })
            .setDescription(data ? data.details : "لا توجد بيانات")
            .setFooter({
              text: "4KO • YONKO.مُـــذَكّــــــر",
              iconURL: ICON_PRAYER
            })
            .setTimestamp()
        ]
      });
    }

    if (i.customId === "azkar") {
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#00FF66")
            .setAuthor({ name: "مُـــذَكّــــــر", iconURL: ICON_PRAYER })
            .setTitle("اذكـــــــار الصــــلاة")
            .setDescription(AZKAR)
            .setFooter({
              text: "4KO • YONKO.مُـــذَكّــــــر",
              iconURL: ICON_PRAYER
            })
            .setTimestamp()
        ]
      });
    }
  } catch (err) {
    console.log("Interaction error:", err);
    if (!i.replied) {
      i.reply({ ephemeral: true, content: "حدث خطأ، حاول مجدداً" });
    }
  }
});

client.on("error", (e) => console.log("Client error:", e));
process.on("unhandledRejection", (e) => console.log("Unhandled:", e));

client.login(process.env.TOKEN);
