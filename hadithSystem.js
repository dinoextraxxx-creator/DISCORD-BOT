const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "YOUR_CHANNEL_ID";
const ICON = "YOUR_ICON";
const AUTHOR = "مُـــذَكّــــــر | الأحاديث";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= SAFE LOAD =================

let hadiths = [];

try {
  hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8")).hadiths;
} catch (err) {
  console.log("❌ JSON ERROR:", err);
  hadiths = [];
}

// ================= RANDOM =================

function getRandomHadith() {
  if (!hadiths || hadiths.length === 0) {
    return {
      text: "لا توجد أحاديث حالياً",
      narrator: "",
      source: ""
    };
  }

  return hadiths[Math.floor(Math.random() * hadiths.length)];
}

// ================= EMBED =================

function buildEmbed(h) {
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

// ================= SAFE SEND =================

async function sendHadith(client) {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
    if (!channel) return;

    const hadith = getRandomHadith();

    await channel.send({
      embeds: [buildEmbed(hadith)]
    });

  } catch (err) {
    console.log("❌ SEND ERROR:", err);
  }
}

// ================= SAFE LOOP (every 2 min) =================

function startHadithSystem(client) {
  console.log("📿 Hadith System Started");

  // إرسال فوري عند التشغيل
  sendHadith(client);

  // كل دقيقتين
  setInterval(() => {
    try {
      sendHadith(client);
    } catch (err) {
      console.log("❌ LOOP ERROR:", err);
    }
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
