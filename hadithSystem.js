const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

// ================= CONFIG =================

const CHANNEL_ID = "1516405973365952633";
const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | الأحاديث";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= SAFE LOAD =================

let hadiths = [];

try {
  const data = fs.readFileSync("./hadiths.json", "utf8");
  const json = JSON.parse(data);
  hadiths = json.hadiths || [];
} catch (err) {
  console.log("❌ HADITH JSON ERROR:", err);
  hadiths = [];
}

// ================= RANDOM =================

function getRandomHadith() {
  if (!hadiths.length) {
    return {
      text: "لا توجد أحاديث حالياً",
      narrator: "",
      source: ""
    };
  }

  return hadiths[Math.floor(Math.random() * hadiths.length)];
}

// ================= EMBED FORMAT =================

function buildEmbed(h) {
  const cleanText = h.text
    .replace("قال رسول الله ﷺ:", "")
    .trim();

  return new EmbedBuilder()
    .setColor("#E8C547")
    .setDescription(
`🔸 ➤ قال رسول الله ﷺ: «${cleanText}»

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

    console.log("📿 HADITH SENT");

  } catch (err) {
    console.log("❌ SEND ERROR:", err);
  }
}

// ================= LOOP SYSTEM (2 MIN TEST) =================

function startHadithSystem(client) {
  console.log("📿 Hadith System Started");

  // إرسال مباشر عند التشغيل
  sendHadith(client);

  // كل دقيقتين
  setInterval(() => {
    try {
      sendHadith(client);
    } catch (err) {
      console.log("❌ INTERVAL ERROR:", err);
    }
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
