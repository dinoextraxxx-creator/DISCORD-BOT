const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1516016586643734639";

const ICON = "YOUR_ICON_URL";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

let data = JSON.parse(fs.readFileSync("./hadiths.json", "utf8"));

let hadiths = data.hadiths || [];

let used = new Set();

function getHadith() {
  if (used.size >= hadiths.length) used.clear();

  let i;
  do {
    i = Math.floor(Math.random() * hadiths.length);
  } while (used.has(i));

  used.add(i);

  return hadiths[i];
}

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

async function startHadithSystem(client) {
  const channel = await client.channels.fetch(CHANNEL_ID);

  if (!channel) return console.log("❌ Hadith channel missing");

  // أول حديث فور التشغيل
  await channel.send({ embeds: [buildEmbed(getHadith())] });

  console.log("📿 HADITH STARTED");

  setInterval(async () => {
    const h = getHadith();

    await channel.send({ embeds: [buildEmbed(h)] });

    console.log("📿 HADITH SENT");
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
