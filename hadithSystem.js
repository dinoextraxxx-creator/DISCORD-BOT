const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

// ================= CONFIG =================

const CHANNEL_ID = "1516016586643734639";

const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | الأحاديث";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= LOAD HADITHS =================

let hadiths = [];

try {
  hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8")).hadiths || [];
} catch (err) {
  console.log("❌ JSON ERROR:", err);
  hadiths = [];
}

// ================= NO REPEAT SYSTEM =================

let used = new Set();

// ================= GET RANDOM WITHOUT REPEAT =================

function getHadith() {
  if (!hadiths.length) return null;

  // إعادة التصفير بعد انتهاء 100%
  if (used.size >= hadiths.length) {
    used.clear();
  }

  let index;

  do {
    index = Math.floor(Math.random() * hadiths.length);
  } while (used.has(index));

  used.add(index);

  return hadiths[index];
}

// ================= EMBED =================

function buildEmbed(h) {
  const text = h.text.replace("قال رسول الله ﷺ:", "").trim();

  return new EmbedBuilder()
    .setColor("#E8C547")
    .setDescription(
`🔸 ➤ قال رسول الله ﷺ: «${text}»

👤 ➤ الراوي : ${h.narrator}

📚 ➤ المصدر : ${h.source}`
    )
    .setFooter({ text: FOOTER, iconURL: ICON })
    .setTimestamp();
}

// ================= SEND =================

async function sendHadith(client) {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) return;

    const h = getHadith();
    if (!h) return;

    await channel.send({ embeds: [buildEmbed(h)] });

    console.log("📿 HADITH SENT");

  } catch (err) {
    console.log("❌ SEND ERROR:", err);
  }
}

// ================= START SYSTEM =================

function startHadithSystem(client) {
  console.log("📿 Hadith System Started");

  // إرسال فوري عند التشغيل
  sendHadith(client);

  // كل دقيقتين
  setInterval(() => {
    sendHadith(client);
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
