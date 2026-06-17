const { Client, GatewayIntentBits, Events } = require("discord.js");
const startPrayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);

  startPrayerSystem(client);
});

// 🔘 HANDLER للأزرار
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  const id = interaction.customId;

  const prayerMap = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء"
  };

  // 🕌 زر الصلاة
  if (id.startsWith("pray_")) {
    const prayer = id.replace("pray_", "");

    const name = prayerMap[prayer];

    return interaction.reply({
      ephemeral: true,
      embeds: [{
        color: 0xFFFF00,
        author: {
          name: "مُـــذَكّــــــر",
          iconURL: ICON
        },
        footer: {
          text: "4KO • YONKO.مُـــذَكّــــــر"
        },
        title: "",
        description: "تفاصيل الصلاة تظهر هنا حسب النظام",
        timestamp: new Date()
      }]
    });
  }

  // 📿 زر الأذكار (ثابت)
  if (id.startsWith("azkar_")) {
    return interaction.reply({
      ephemeral: true,
      embeds: [{
        color: 0xFFFF00,
        author: {
          name: "مُـــذَكّــــــر",
          iconURL: ICON
        },
        footer: {
          text: "4KO • YONKO.مُـــذَكّــــــر"
        },
        title: "",
        description:
`1- يقول مثل ما يقول المؤذن إلا في "حي على الصلاة و حي على الفلاح" فيقول "لا حول ولا قوة إلا بالله"

2- يقول "وأنا أشهد أن لا إله إلا الله، وحده لا شريك له، وأن محمد عبده ورسوله، رضيت بالله ربًا، وبمحمدٍ رسولًا وبالإسلام دينًا"

3- يصلي على النبي ﷺ

4- اللهم رب هذه الدعوة التامة، والصلاة القائمة، آت محمدًا الوسيلة والفضيلة...

5- يدعو لنفسه بين الأذان والإقامة`,
        timestamp: new Date()
      }]
    });
  }
});

client.login(process.env.TOKEN);
