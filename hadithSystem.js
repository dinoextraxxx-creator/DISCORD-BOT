const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1516016586643734639";

let hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8"));

let used = new Set();

function getRandomHadith() {
  if (used.size >= hadiths.length) {
    used.clear(); // إعادة الدورة
  }

  let index;
  do {
    index = Math.floor(Math.random() * hadiths.length);
  } while (used.has(index));

  used.add(index);
  return hadiths[index];
}

function buildEmbed(hadith) {
  return new EmbedBuilder()
    .setTitle("﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾")
    .setDescription(hadith)
    .setColor("#E8C547")
    .setTimestamp();
}

async function sendHadith(client) {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) return;

    const hadith = getRandomHadith();

    await channel.send({
      embeds: [buildEmbed(hadith)]
    });

    console.log("HADITH SENT");
  } catch (err) {
    console.log("HADITH ERROR:", err);
  }
}

function startHadithSystem(client) {
  // 🔥 يبدأ فور التشغيل
  sendHadith(client);

  // 🔥 كل دقيقتين
  setInterval(() => {
    sendHadith(client);
  }, 2 * 60 * 1000);

  console.log("HADITH SYSTEM ACTIVE");
}

module.exports = { startHadithSystem };
