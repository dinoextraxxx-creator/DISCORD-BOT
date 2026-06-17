const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

const CHANNEL_ID = "1516016586643734639";

const ICON = "YOUR_ICON_URL";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

let data = { hadiths: [] };

try {
  data = JSON.parse(fs.readFileSync("./hadiths.json", "utf8"));
} catch (err) {
  console.log("❌ JSON ERROR:", err.message);
}

let hadiths = data.hadiths || [];

let used = new Set();

function getHadith() {
  if (!hadiths.length) return null;

  if (used.size >= hadiths.length) {
    used.clear();
  }

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
  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);

  if (!channel) {
    console.log("❌ Hadith channel not found");
    return;
  }

  const first = getHadith();

  if (first) {
    await channel.send({ embeds: [buildEmbed(first)] });
  }

  console.log("📿 FIRST HADITH SENT");

  setInterval(async () => {
    const h = getHadith();

    if (!h) return;

    await channel.send({ embeds: [buildEmbed(h)] });

    console.log("📿 HADITH SENT");
  }, 2 * 60 * 1000);
}

module.exports = { startHadithSystem };
