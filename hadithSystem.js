const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1516016586643734639";

const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | الأحاديث";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

let hadiths = [];

// ================= SAFE JSON LOAD =================

try {
  const raw = fs.readFileSync("./hadiths.json", "utf8");
  const parsed = JSON.parse(raw);

  if (Array.isArray(parsed.hadiths)) {
    hadiths = parsed.hadiths;
  } else {
    console.log("❌ hadiths.json format error");
  }

} catch (err) {
  console.log("❌ JSON LOAD ERROR:", err);
}

// ================= STATE =================

let used = new Set();

// ================= GET HADITH (NO REPEAT) =================

function getHadith() {
  if (!hadiths.length) return null;

  if (used.size >= hadiths.length) {
    used.clear(); // إعادة التدوير
  }

  let i;

  do {
    i = Math.floor(Math.random() * hadiths.length);
  } while (used.has(i));

  used.add(i);

  return hadiths[i];
}

// ================= EMBED =================

function buildEmbed(h) {
  const text = (h.text || "").replace("قال رسول الله ﷺ:", "").trim();

  return new EmbedBuilder()
    .setColor("#E8C547")
    .setDescription(
`🔸 ➤ قال رسول الله ﷺ: «${text}»

👤 ➤ الراوي : ${h.narrator || "غير معروف"}

📚 ➤ المصدر : ${h.source || "غير معروف"}`
    )
    .setFooter({ text: FOOTER, iconURL: ICON })
    .setTimestamp();
}

// ================= SEND SAFE =================

async function sendHadith(client) {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
    if (!channel) return console.log("❌ CHANNEL NOT FOUND");

    const h = getHadith();
    if (!h) return console.log("❌ NO HADITHS");

    await channel.send({ embeds: [buildEmbed(h)] });

    console.log("📿 HADITH SENT");

  } catch (err) {
    console.log("❌ SEND ERROR:", err);
  }
}

// ================= START SYSTEM =================

async function startHadithSystem(client) {
  console.log("📿 Hadith System Started");

  // إرسال فوري
  await sendHadith(client);

  // كل دقيقتين
  setInterval(() => {
    sendHadith(client);
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
