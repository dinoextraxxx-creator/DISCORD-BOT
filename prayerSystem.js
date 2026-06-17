module.exports = (client) => {
  const channelId = "1516405973365952633";

  client.once("ready", async () => {
    console.log("🕌 Prayer system ACTIVE");

    const channel = client.channels.cache.get(channelId);
    if (!channel) return;

    const prayers = [
      { name: "الفجر", text: "حان الآن موعد صلاة الفجر 🕌" },
      { name: "الظهر", text: "حان الآن موعد صلاة الظهر 🕌" },
      { name: "العصر", text: "حان الآن موعد صلاة العصر 🕌" },
      { name: "المغرب", text: "حان الآن موعد صلاة المغرب 🕌" },
      { name: "العشاء", text: "حان الآن موعد صلاة العشاء 🕌" }
    ];

    for (let i = 0; i < prayers.length; i++) {
      setTimeout(() => {
        channel.send({
          embeds: [
            {
              color: 0xFFD700,
              author: {
                name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة"
              },
              description: `🔸 ${prayers[i].text}`,
              footer: {
                text: "موعد الأذان قد يتغير من مدينة لأخرى • 4KO • YONKO.مُـــذَكّــــــر"
              }
            }
          ]
        }).catch(() => {});
      }, i * 60000); // ⬅️ دقيقة بين كل صلاة
    }
  });
};
