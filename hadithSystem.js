const hadiths = require("./hadiths.json");

let interval = null;

function safeList() {
  try {
    return Object.values(hadiths || {});
  } catch (e) {
    console.log("❌ Invalid hadiths.json", e);
    return [];
  }
}

function randomHadith() {
  const arr = safeList();
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function embed(h) {
  return {
    color: 0xFFD700,
    title: "مُـــذَكّــــــر | حديث",
    fields: [
      { name: "🔸 الحديث", value: h?.text || "خطأ في البيانات" },
      { name: "👤 الراوي", value: h?.rawi || "غير متوفر" },
      { name: "📚 المصدر", value: h?.source || "غير متوفر" },
      { name: "📖 البيان", value: h?.bayan || "غير متوفر" }
    ]
  };
}

async function start(client) {
  const channelId = "1516016586643734639";

  if (interval) return;

  console.log("🚀 Hadith system booting...");

  let channel;
  try {
    channel = await client.channels.fetch(channelId);
  } catch (e) {
    console.log("❌ Cannot fetch hadith channel:", e);
    return;
  }

  if (!channel) {
    console.log("❌ Hadith channel not found");
    return;
  }

  console.log("✅ Hadith channel ready");

  interval = setInterval(async () => {
    try {
      const h = randomHadith();
      if (!h) return;

      await channel.send({ embeds: [embed(h)] });
      console.log("📨 Hadith sent");
    } catch (e) {
      console.log("❌ Hadith send error:", e);
    }
  }, 2 * 60 * 1000);
}

module.exports = { start };
