const { EmbedBuilder } = require("discord.js");

const prayers = [
  { name: "الفجر", time: "05:00" },
  { name: "الظهر", time: "12:30" },
  { name: "العصر", time: "16:00" },
  { name: "المغرب", time: "19:00" },
  { name: "العشاء", time: "20:30" }
];

let sentToday = new Set();

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function buildEmbed(p) {
  return new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle(`🕌 موعد صلاة ${p.name}`)
    .setDescription(`حان الآن وقت صلاة ${p.name}`)
    .setFooter({ text: "Prayer System" });
}

async function startPrayerSystem(client) {
  const channel = await client.channels.fetch("1516405973365952633").catch(() => null);

  if (!channel) {
    console.log("❌ Prayer channel not found");
    return;
  }

  console.log("✅ Prayer system started");

  // اختبار فوري
  channel.send({ content: "🕌 تم تشغيل نظام الصلاة" });

  setInterval(() => {
    const current = nowTime();

    for (const p of prayers) {
      if (p.time === current && !sentToday.has(p.name)) {
        channel.send({ embeds: [buildEmbed(p)] });
        sentToday.add(p.name);
      }
    }
  }, 30000);

  setInterval(() => {
    sentToday.clear();
  }, 24 * 60 * 60 * 1000);
}

module.exports = { startPrayerSystem };
