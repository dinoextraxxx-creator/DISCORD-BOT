const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1516016586643734639"; // قناة الأحاديث
const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | الأحاديث";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

let hadiths = [];

try {
  hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8")).hadiths || [];
  console.log("📖 Hadiths loaded:", hadiths.length);
} catch (err) {
  console.log("❌ JSON ERROR:", err);
}

function getRandom() {
  if (!hadiths.length) return null;
  return hadiths[Math.floor(Math.random() * hadiths.length)];
}

function embed(h) {
  return new EmbedBuilder()
    .setColor("#E8C547")
    .setDescription(
`🔸 ➤ قال رسول الله ﷺ: «${h.text.replace("قال رسول الله ﷺ:", "").trim()}»

👤 ➤ الراوي : ${h.narrator}

📚 ➤ المصدر : ${h.source}`
    )
    .setFooter({ text: FOOTER, iconURL: ICON })
    .setTimestamp();
}

async function send(client) {
  try {
    console.log("📡 Trying to send hadith...");

    const channel = await client.channels.fetch(CHANNEL_ID).catch(err => {
      console.log("❌ CHANNEL FETCH ERROR:", err);
      return null;
    });

    if (!channel) {
      console.log("❌ Channel not found");
      return;
    }

    const h = getRandom();

    if (!h) {
      console.log("❌ No hadiths found");
      return;
    }

    await channel.send({ embeds: [embed(h)] });

    console.log("✅ HADITH SENT SUCCESS");

  } catch (err) {
    console.log("❌ SEND ERROR:", err);
  }
}

function startHadithSystem(client) {
  console.log("📿 Hadith system started");

  send(client);

  setInterval(() => {
    send(client);
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
