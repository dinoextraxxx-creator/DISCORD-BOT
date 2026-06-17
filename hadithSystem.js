const fs = require("fs");

const HADITH_CHANNEL = "1516016586643734639";

let lastIndex = null;
let hadithData = null;

function loadHadiths() {
  const raw = fs.readFileSync("./hadiths.json", "utf8");
  hadithData = JSON.parse(raw);
}

function getRandomHadith() {
  const keys = Object.keys(hadithData);

  let index;
  do {
    index = Math.floor(Math.random() * keys.length);
  } while (index === lastIndex && keys.length > 1);

  lastIndex = index;
  return hadithData[keys[index]];
}

function buildEmbed(h) {
  const { EmbedBuilder } = require("discord.js");

  return new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("📖 حديث نبوي شريف")
    .setDescription(h.text)
    .addFields(
      { name: "👤 الراوي", value: h.rawi, inline: false },
      { name: "📚 المصدر", value: h.source, inline: false },
      { name: "📖 بيان", value: h.bayan, inline: false }
    )
    .setFooter({ text: "4KO • YONKO" });
}

function sendHadith(client) {
  const channel = client.channels.cache.get(HADITH_CHANNEL);
  if (!channel) return;

  const hadith = getRandomHadith();
  const embed = buildEmbed(hadith);

  channel.send({ embeds: [embed] }).catch(() => {});
}

function start(client) {
  loadHadiths();

  // 📖 كل دقيقتين
  sendHadith(client);
  setInterval(() => sendHadith(client), 120000);
}

module.exports = { start };
