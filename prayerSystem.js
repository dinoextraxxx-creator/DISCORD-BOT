const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const CHANNEL_ID = "1516405973365952633";

const ICON =
  "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg";

const prayers = [
  "الفجر",
  "الظهر",
  "العصر",
  "المغرب",
  "العشاء"
];

let sent = new Set();

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function verse(prayer) {
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
  }
}

function embed(prayer) {
  return {
    color: 0xFFFF00,
    author: {
      name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
      iconURL: ICON
    },
    title: `حان موعد أذان ${prayer} حسب التوقيت المحلي لمدينة الدار البيضاء`,
    description: verse(prayer),
    footer: {
      text: "قد يختلف موعد الأذان من مدينة لأخرى"
    },
    timestamp: new Date()
  };
}

function buttons(prayerKey, prayerName) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`pray_${prayerKey}`)
      .setLabel(`صلاة ${prayerName}`)
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId(`azkar_${prayerKey}`)
      .setLabel("اذكار الصلاة")
      .setStyle(ButtonStyle.Secondary)
  );
}

async function send(client, prayerName, key) {
  if (sent.has(key)) return;
  sent.add(key);

  const channel = await client.channels.fetch(CHANNEL_ID);

  await channel.send({
    embeds: [embed(prayerName)],
    components: [buttons(key, prayerName)]
  });
}

module.exports = async function startPrayerSystem(client) {
  console.log("Prayer system started");

  const keys = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
  const names = prayers;

  for (let i = 0; i < keys.length; i++) {
    await send(client, names[i], keys[i]);

    // 1 دقيقة بين كل أذان
    if (i < keys.length - 1) {
      await wait(60000);
    }
  }

  console.log("All prayers sent once");
};
