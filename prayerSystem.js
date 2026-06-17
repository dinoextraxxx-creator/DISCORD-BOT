const { EmbedBuilder } = require("discord.js");

const prayers = [
  { name: "الفجر", time: "05:00" },
  { name: "الظهر", time: "12:30" },
  { name: "العصر", time: "16:00" },
  { name: "المغرب", time: "19:00" },
  { name: "العشاء", time: "20:30" }
];

let sentToday = new Set();

function now() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function buildEmbed(prayer) {
  return new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle(`🕌 موعد صلاة ${prayer.name}`)
    .setDescription(`حان الآن وقت صلاة ${prayer.name}`)
    .setFooter({ text: "موعد الأذان قد يختلف حسب المدينة" });
}

function startPrayerSystem(client) {
  const channel = client.channels.cache.get("1516405973365952633");
  if (!channel) return;

  setInterval(() => {
    const current = now();

    for (const p of prayers) {
      if (p.time === current && !sentToday.has(p.name)) {
        channel.send({ embeds: [buildEmbed(p)] });
        sentToday.add(p.name);
      }
    }
  }, 30000);

  // reset يومي
  setInterval(() => {
    sentToday.clear();
  }, 24 * 60 * 60 * 1000);
}

module.exports = { startPrayerSystem };
