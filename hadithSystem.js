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
      { name: "👤 الراوي", value: h.rawi || "غير مذكور" },
      { name: "📚 المصدر", value: h.source || "غير مذكور" },
      { name: "📖 البيان", value: h.bayan || "لا يوجد" }
    )
    .setFooter({ text: "Hadith System" });
}

async function startHadithSystem(client) {
  const channel = await client.channels.fetch("1516016586643734639").catch(() => null);

  if (!channel) {
    console.log("❌ Hadith channel not found");
    return;
  }

  console.log("✅ Hadith system started");

  // إرسال اختبار فوري عند التشغيل
  channel.send({ content: "📜 تم تشغيل نظام الأحاديث" });

  setInterval(async () => {
    const hadith = getRandomHadith();
    await channel.send({ embeds: [buildEmbed(hadith)] });
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
