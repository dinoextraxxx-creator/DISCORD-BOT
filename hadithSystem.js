const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1516405973365952633";
const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | الأحاديث";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

let hadiths = [];

try {
  hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8")).hadiths || [];
} catch (e) {
  console.log("JSON ERROR:", e);
}

function randomHadith() {
  if (!hadiths.length) return null;
  return hadiths[Math.floor(Math.random() * hadiths.length)];
}

function build(h) {
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
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) return;

    const h = randomHadith();
    if (!h) return;

    await channel.send({ embeds: [build(h)] });

    console.log("📿 Hadith sent");

  } catch (err) {
    console.log("SEND ERROR:", err);
  }
}

function startHadithSystem(client) {
  console.log("📿 Hadith system loaded");

  // إرسال فوري عند التشغيل
  send(client);

  // كل دقيقتين
  setInterval(() => {
    send(client);
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
