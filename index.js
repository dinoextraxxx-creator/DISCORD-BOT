const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const PRAYER_CHANNEL = "1516405973365952633";
const HADITH_CHANNEL = "1516016586643734639";

console.log("🔥 BOT LOADING");

const prayers = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];

let hadiths = [
  {
    text: "إنما الأعمال بالنيات",
    narrator: "عمر بن الخطاب",
    source: "البخاري"
  },
  {
    text: "من صلى علي صلاة صلى الله عليه بها عشرا",
    narrator: "أبو هريرة",
    source: "مسلم"
  }
];

function sendPrayerTest(channel) {
  prayers.forEach(p => {
    const embed = new EmbedBuilder()
      .setColor("#E8C547")
      .setTitle(`حان موعد أذان صلاة ${p}`)
      .setDescription("🟢 اختبار النظام")
      .setTimestamp();

    channel.send({ embeds: [embed] });
  });
}

function sendHadith(channel) {
  const h = hadiths[Math.floor(Math.random() * hadiths.length)];

  const embed = new EmbedBuilder()
    .setColor("#E8C547")
    .setDescription(
`🔸 ➤ قال رسول الله ﷺ: «${h.text}»

👤 ➤ الراوي : ${h.narrator}

📚 ➤ المصدر : ${h.source}`
    )
    .setTimestamp();

  channel.send({ embeds: [embed] });
}

client.once("ready", async () => {
  console.log("✅ BOT READY");

  const prayerChannel = await client.channels.fetch(PRAYER_CHANNEL);
  const hadithChannel = await client.channels.fetch(HADITH_CHANNEL);

  if (!prayerChannel || !hadithChannel) {
    return console.log("❌ CHANNEL ERROR");
  }

  // إرسال فوري للتأكد
  sendPrayerTest(prayerChannel);
  sendHadith(hadithChannel);

  // hadith كل دقيقتين
  setInterval(() => {
    sendHadith(hadithChannel);
  }, 2 * 60 * 1000);

  console.log("🟢 SYSTEM RUNNING");
});

client.login(process.env.TOKEN);
