const hadiths = require("./hadiths.json");

let interval = null;

// مهم جداً: تحويل Object → Array
function getHadithList() {
  return Object.values(hadiths);
}

function getRandomHadith() {
  const list = getHadithList();
  return list[Math.floor(Math.random() * list.length)];
}

function buildEmbed(hadith) {
  return {
    color: 0xFFD700,
    author: {
      name: "مُـــذَكّــــــر | الأحاديث النبوية"
    },
    fields: [
      {
        name: "🔸 الحديث",
        value: hadith.text || "غير متوفر"
      },
      {
        name: "👤 الراوي",
        value: hadith.rawi || "غير متوفر"
      },
      {
        name: "📚 المصدر",
        value: hadith.source || "غير متوفر"
      },
      {
        name: "📖 البيان",
        value: hadith.bayan || "لا يوجد"
      }
    ],
    footer: {
      text: "4KO • YONKO.مُـــذَكّــــــر"
    }
  };
}

function start(client) {
  const channelId = "1516016586643734639";

  if (interval) return;

  console.log("Hadith system started...");

  interval = setInterval(async () => {
    try {
      const channel = await client.channels.fetch(channelId);
      if (!channel) return;

      const hadith = getRandomHadith();
      const embed = buildEmbed(hadith);

      await channel.send({ embeds: [embed] });

    } catch (err) {
      console.error("Hadith error:", err);
    }
  }, 2 * 60 * 1000); // كل دقيقتين
}

module.exports = { start };
