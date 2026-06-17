const prayers = require("./prayers.json");

let started = false;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function embed(p) {
  return {
    color: 0xFFD700,
    author: { name: "مُـــذَكّــــــر | الصلاة" },
    fields: [
      { name: "🕌 الصلاة", value: p.name || "N/A" },
      { name: "⏰ الوقت", value: p.time || "N/A" },
      { name: "📖 الفضل", value: p.fadl || "N/A" },
      { name: "📚 الحديث", value: p.hadith || "N/A" }
    ]
  };
}

async function start(client) {
  const channelId = "1516405973365952633";

  if (started) return;
  started = true;

  console.log("🚀 Prayer system starting...");

  let channel;
  try {
    channel = await client.channels.fetch(channelId);
  } catch (e) {
    console.error("❌ Channel fetch failed (PRAYER):", e);
    return;
  }

  if (!channel) {
    console.error("❌ Prayer channel not found");
    return;
  }

  console.log("✅ Prayer channel OK");

  const keys = Object.keys(prayers);

  if (keys.length === 0) {
    console.error("❌ prayers.json is empty");
    return;
  }

  for (let i = 0; i < keys.length; i++) {
    const p = prayers[keys[i]];

    try {
      await channel.send({ embeds: [embed(p)] });
      console.log(`📨 Prayer sent: ${keys[i]}`);
    } catch (e) {
      console.error("❌ Prayer send error:", e);
    }

    await sleep(60 * 1000);
  }

  console.log("✅ Prayer cycle finished");
}

module.exports = { start };
