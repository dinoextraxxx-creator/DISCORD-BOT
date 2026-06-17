const hadiths = require("./hadiths.json");

let interval = null;

function list() {
  return Object.values(hadiths);
}

function randomHadith() {
  const arr = list();
  return arr[Math.floor(Math.random() * arr.length)];
}

function embed(h) {
  return {
    color: 0xFFD700,
    author: { name: "مُـــذَكّــــــر | الأحاديث" },
    fields: [
      { name: "🔸 الحديث", value: h.text || "N/A" },
      { name: "👤 الراوي", value: h.rawi || "N/A" },
      { name: "📚 المصدر", value: h.source || "N/A" },
      { name: "📖 البيان", value: h.bayan || "N/A" }
    ]
  };
}

async function start(client) {
  const channelId = "1516016586643734639";

  if (interval) return;

  console.log("🚀 Hadith system starting...");

  let channel;
  try {
    channel = await client.channels.fetch(channelId);
  } catch (e) {
    console.error("❌ Channel fetch failed (HADITH):", e);
    return;
  }

  if (!channel) {
    console.error("❌ Hadith channel not found");
    return;
  }

  console.log("✅ Hadith channel OK");

  // إرسال أول حديث فوراً
  try {
    const first = randomHadith();
    await channel.send({ embeds: [embed(first)] });
    console.log("📨 First hadith sent");
  } catch (e) {
    console.error("❌ First send failed:", e);
  }

  interval = setInterval(async () => {
    try {
      const h = randomHadith();
      await channel.send({ embeds: [embed(h)] });
      console.log("📨 Hadith sent");
    } catch (e) {
      console.error("❌ Hadith interval error:", e);
    }
  }, 2 * 60 * 1000);
}

module.exports = { start };
