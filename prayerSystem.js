const prayers = require("./prayers");

// القناة (عدّلها إذا تحتاج)
const CHANNEL_ID = "1516405973365952633";

// لمنع التكرار
let sent = new Set();

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function buildEmbed(prayerName) {
  return {
    color: 0xFFFF00,
    author: {
      name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
      iconURL: "https://cdn.discordapp.com/attachments/1515161056975126705/1515903883430465647/-_1.jpg"
    },
    title: `حان موعد أذان ${prayerName} حسب التوقيت المحلي لمدينة الدار البيضاء`,
    description: "﴿وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا﴾\n\nقرآن الفجر : صلاة الفجر",
    footer: {
      text: "قد يختلف موعد الأذان من مدينة لأخرى"
    },
    timestamp: new Date()
  };
}

function buildButtons(prayerName) {
  return {
    type: 1,
    components: [
      {
        type: 2,
        style: 2,
        label: `صلاة ${prayerName}`,
        custom_id: `pray_${prayerName}`
      },
      {
        type: 2,
        style: 2,
        label: "اذكار الصلاة",
        custom_id: `azkar_${prayerName}`
      }
    ]
  };
}

async function sendPrayer(client, prayer) {
  if (sent.has(prayer.name)) return;
  sent.add(prayer.name);

  const channel = await client.channels.fetch(CHANNEL_ID);

  await channel.send({
    embeds: [buildEmbed(prayer.name)],
    components: [buildButtons(prayer.name)]
  });
}

module.exports = async function startPrayerSystem(client) {
  console.log("Prayer system started");

  let index = 0;

  // 🔥 يبدأ مباشرة عند تشغيل البوت
  while (index < prayers.length) {
    const prayer = prayers[index];

    await sendPrayer(client, prayer);

    index++;

    // ⏱️ فرق دقيقة بين كل صلاة (60 ثانية)
    if (index < prayers.length) {
      await wait(60000);
    }
  }

  console.log("All prayers sent once (test mode complete)");
};
