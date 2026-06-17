module.exports = (client) => {
  const CHANNEL_ID = "1516405973365952633";

  // ⛔ عدل هذه الأوقات حسب مدينتك
  const prayers = [
    { name: "الفجر", time: "05:10" },
    { name: "الظهر", time: "13:30" },
    { name: "العصر", time: "17:00" },
    { name: "المغرب", time: "19:30" },
    { name: "العشاء", time: "21:00" }
  ];

  const sentToday = new Set();

  function getMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function nowMinutes() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }

  function resetAtMidnight() {
    sentToday.clear();
  }

  function checkPrayers() {
    const now = nowMinutes();

    for (const p of prayers) {
      const key = p.name;

      if (sentToday.has(key)) continue;

      if (now >= getMinutes(p.time)) {
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
          channel.send(`🕌 حان الآن وقت صلاة ${p.name}`);
          sentToday.add(key);
        }
      }
    }
  }

  client.once("ready", () => {
    console.log("🕌 نظام الصلاة شغال");

    // تشغيل فوري
    checkPrayers();

    // فحص كل دقيقة
    setInterval(checkPrayers, 60000);

    // إعادة التصفير يومياً (كل 24 ساعة)
    setInterval(resetAtMidnight, 24 * 60 * 60 * 1000);
  });
};
