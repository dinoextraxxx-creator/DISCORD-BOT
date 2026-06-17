const fs = require("fs");

module.exports = (client) => {
  const channelId = "1516405973365952633";

  let started = false;

  client.once("ready", () => {
    if (started) return;
    started = true;

    console.log("🕌 Prayer system started");

    try {
      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const prayers = [
        { name: "الفجر", delay: 0 },
        { name: "الظهر", delay: 60000 },
        { name: "العصر", delay: 120000 },
        { name: "المغرب", delay: 180000 },
        { name: "العشاء", delay: 240000 }
      ];

      prayers.forEach((p) => {
        setTimeout(() => {
          try {
            channel.send({
              embeds: [
                {
                  color: 0xFFD700,
                  title: `🕌 صلاة ${p.name}`,
                  description: `حان الآن موعد صلاة ${p.name}`,
                  footer: { text: "موعد الأذان قد يتغير من مدينة لأخرى" }
                }
              ]
            });
          } catch (e) {
            console.log("Prayer send error:", e.message);
          }
        }, p.delay);
      });

    } catch (err) {
      console.log("Prayer system crash safe:", err.message);
    }
  });
};
