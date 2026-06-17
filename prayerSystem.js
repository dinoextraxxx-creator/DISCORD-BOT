const prayers = require("./prayers.json");

let started = false;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function safePrayers() {
  try {
    return Object.values(prayers || {});
  } catch (e) {
    console.log("❌ Invalid prayers.json", e);
    return [];
  }
}

function embed(p) {
  return {
    color: 0xFFD700,
    title: "مُـــذَكّــــــر | صلاة",
    fields: [
      { name: "🕌 الصلاة", value: p?.name || "N/A" },
      { name: "⏰ الوقت", value: p?.time || "N/A" },
      { name: "📖 الفضل", value: p?.fadl || "N/A" },
      { name: "📚 الحديث", value: p?.hadith || "N/A" }
    ]
  };
}

async function start(client) {
  const channelId = "1516405973365952633";

  if (started) return;
  started = true;

  console.log("🚀 Prayer system booting...");

  let channel;
  try {
    channel = await client.channels.fetch(channelId);
  } catch (e) {
    console.log("❌ Cannot fetch prayer channel:", e);
    return;
  }

  if (!channel) {
    console.log("❌ Prayer channel not found");
    return;
  }

  console.log("✅ Prayer channel ready");

  const list = safePrayers();

  if (list.length === 0) {
    console.log("❌ prayers.json empty");
    return;
  }

  for (let i = 0; i < list.length; i++) {
    try {
      await channel.send({ embeds: [embed(list[i])] });
      console.log("📨 Prayer sent");
    } catch (e) {
      console.log("❌ Prayer send error:", e);
    }

    await sleep(60 * 1000);
  }

  console.log("✅ Prayer cycle finished");
}

module.exports = { start };
