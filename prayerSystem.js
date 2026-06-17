const fs = require("fs");

const PRAYER_CHANNEL = "1516405973365952633";
const sent = new Set();
let prayers = [];

function loadPrayers() {
  prayers = JSON.parse(fs.readFileSync("./prayers.json", "utf8"));
}

function getTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

async function sendPrayer(client, prayer) {
  try {
    const channel = await client.channels.fetch(PRAYER_CHANNEL).catch(() => null);
    if (!channel) return console.log("❌ Prayer channel not found");

    const embed = {
      color: 0xFFD700,
      title: `🕌 ${prayer.name}`,
      description: prayer.text,
      author: {
        name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
      },
    };

    await channel.send({ embeds: [embed] });
    console.log(`🕌 Sent: ${prayer.name}`);
  } catch (err) {
    console.log("❌ Prayer error:", err);
  }
}

function checkPrayers(client) {
  const now = getTime();

  for (const p of prayers) {
    if (p.time === now && !sent.has(p.name)) {
      sendPrayer(client, p);
      sent.add(p.name);
    }
  }
}

function start(client) {
  loadPrayers();
  console.log("🕌 Prayer system started");

  // فحص أول مرة عند بدء التشغيل
  checkPrayers(client);

  // فحص كل دقيقة
  setInterval(() => {
    checkPrayers(client);
  }, 60 * 1000);
}

module.exports = { start };
