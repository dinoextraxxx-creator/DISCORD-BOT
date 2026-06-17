const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const prayers = require("./prayers");

const CHANNEL_ID = "1516405973365952633";

const IMAGE =
  "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

let sent = new Set();

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getVerse(prayer) {
  switch (prayer) {
    case "الفجر":
      return `**﴿وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا﴾**\n\nقرآن الفجر : صلاة الفجر`;

    case "الظهر":
      return `**﴿فَأَقِيمُوا الصَّلَاةَ ۚ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾**`;

    case "العصر":
      return `**﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ﴾**`;

    case "المغرب":
      return `**﴿وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا﴾**`;

    case "العشاء":
      return `**﴿وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ﴾**`;

    default:
      return "";
  }
}

function buildEmbed(prayer) {
  return {
    color: 0xffff00,
    author: {
      name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
      iconURL: IMAGE
    },
    title: `حان موعد أذان ${prayer} حسب التوقيت المحلي لمدينة الدار البيضاء`,
    description: getVerse(prayer),
    footer: {
      text: "قد يختلف موعد الأذان من مدينة لأخرى"
    },
    timestamp: new Date()
  };
}

function buildButtons(prayer) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`prayer_${prayer}`)
      .setLabel(`صلاة ${prayer}`)
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId(`azkar_${prayer}`)
      .setLabel("اذكار الصلاة")
      .setStyle(ButtonStyle.Secondary)
  );
}

async function sendPrayer(client, prayer) {
  if (sent.has(prayer)) return;
  sent.add(prayer);

  const channel = await client.channels.fetch(CHANNEL_ID);

  await channel.send({
    embeds: [buildEmbed(prayer)],
    components: [buildButtons(prayer)]
  });
}

module.exports = async function startPrayerSystem(client) {
  console.log("Prayer system started");

  let index = 0;

  while (index < prayers.length) {
    const prayer = prayers[index].name;

    await sendPrayer(client, prayer);

    index++;

    // 1 دقيقة بين كل صلاة
    if (index < prayers.length) {
      await wait(60000);
    }
  }

  console.log("All prayers sent");
};
