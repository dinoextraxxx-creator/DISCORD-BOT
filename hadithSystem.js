const fs = require("fs");

module.exports = (client) => {
  const CHANNEL_ID = "1516016586643734639";

  let hadiths;
  try {
    hadiths = JSON.parse(fs.readFileSync("./hadiths.json", "utf8"));
  } catch (err) {
    console.error("❌ خطأ في قراءة hadiths.json:", err);
    return;
  }

  const keys = Object.keys(hadiths);

  function sendHadith() {
    try {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const h = hadiths[randomKey];

      const channel = client.channels.cache.get(CHANNEL_ID);
      if (!channel) return console.log("❌ قناة الأحاديث غير موجودة");

      const message =
        `${h.text}\n\n` +
        `${h.rawi}\n` +
        `${h.source}\n` +
        `${h.bayan}`;

      channel.send(message);
    } catch (err) {
      console.error("❌ خطأ في إرسال الحديث:", err);
    }
  }

  client.once("ready", () => {
    console.log("📖 نظام الأحاديث شغال");

    // إرسال أول حديث فور التشغيل
    sendHadith();

    // كل دقيقتين
    setInterval(sendHadith, 120000);
  });
};
