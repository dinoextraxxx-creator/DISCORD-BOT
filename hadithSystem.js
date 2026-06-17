const fs = require("fs");

module.exports = (client) => {
  const channelId = "1516016586643734633";

  client.once("ready", () => {
    console.log("📚 Hadith system ACTIVE");

    setInterval(() => {
      try {
        const raw = fs.readFileSync("./hadiths.json", "utf8");
        const data = JSON.parse(raw);

        const keys = Object.keys(data);
        if (!keys.length) return;

        const key = keys[Math.floor(Math.random() * keys.length)];
        const h = data[key];

        const channel = client.channels.cache.get(channelId);
        if (!channel) return;

        channel.send({
          embeds: [
            {
              color: 0xFFD700,
              description: h.text,
              fields: [
                { name: "👤 الراوي", value: h.rawi || "—", inline: false },
                { name: "📚 المصدر", value: h.source || "—", inline: false },
                { name: "📖 بيان", value: h.bayan || "—", inline: false }
              ],
              footer: {
                text: "4KO • YONKO.مُـــذَكّــــــر"
              }
            }
          ]
        }).catch(() => {});

      } catch (err) {
        console.log("Hadith safe error:", err.message);
      }
    }, 120000); // كل دقيقتين
  });
};
