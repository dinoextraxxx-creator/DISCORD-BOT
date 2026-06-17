const prayers = require("./prayers.json");

let started = false;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function buildEmbed(prayer) {
  return {
    color: 0xFFD700,
    author: {
      name: "مُـــذَكّــــــر | مواعيد الصلاة"
    },
    fields: [
      {
        name: "🕌 الصلاة",
        value: prayer.name || "غير متوفر"
      },
      {
        name: "⏰ الوقت",
        value: prayer.time || "غير متوفر"
      },
      {
        name: "📖 الفضل",
        value: prayer.fadl || "لا يوجد"
      },
      {
        name: "📚 الحديث",
        value: prayer.hadith || "لا يوجد"
      }
    ],
    footer: {
      text: "موعد الأذان قد يتغير من مدينة لأخرى"
    }
  };
}

async function start(client) {
  const channelId = "1516405973365952633";

  if (started) return;
  started = true;

  console.log("Prayer system started...");

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    const keys = Object.keys(prayers);

    for (const key of keys) {
      const prayer = prayers[key];

      const embed = buildEmbed(prayer);
      await channel.send({ embeds: [embed] });

      // فرق دقيقة بين كل صلاة
      await sleep(60 * 1000);
    }

    console.log("Prayer cycle finished (no repeat).");

  } catch (err) {
    console.error("Prayer system error:", err);
  }
}

module.exports = { start };
