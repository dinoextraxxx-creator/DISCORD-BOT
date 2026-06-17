const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

const hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8"));

let lastIndex = -1;

function getRandomHadith() {
  let index;
  do {
    index = Math.floor(Math.random() * hadiths.length);
  } while (index === lastIndex && hadiths.length > 1);

  lastIndex = index;
  return hadiths[index];
}

function buildEmbed(h) {
  return new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("📜 حديث نبوي شريف")
    .setDescription(`🔸 ${h.text}`)
    .addFields(
      { name: "👤 الراوي", value: h.rawi || "غير مذكور", inline: false },
      { name: "📚 المصدر", value: h.source || "غير مذكور", inline: false },
      { name: "📖 البيان", value: h.bayan || "لا يوجد", inline: false }
    )
    .setFooter({ text: "4KO • YONKO" });
}

function startHadithSystem(client, channelId) {
  setInterval(() => {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return;

    const hadith = getRandomHadith();
    channel.send({ embeds: [buildEmbed(hadith)] });
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
