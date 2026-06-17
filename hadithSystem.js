const fs = require("fs");

module.exports = (client) => {
  let hadithIntervalStarted = false;

  client.once("ready", () => {
    if (hadithIntervalStarted) return;
    hadithIntervalStarted = true;

    console.log("📚 Hadith system started");

    setInterval(() => {
      try {
        const data = JSON.parse(fs.readFileSync("./hadiths.json", "utf8"));

        const keys = Object.keys(data);
        if (!keys.length) return;

        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const h = data[randomKey];

        const channel = client.channels.cache.get("1516016586643734633");
        if (!channel) return;

        channel.send({
          embeds: [
            {
              color: 0xFFD700,
              description: h.text,
              fields: [
                { name: "👤 الراوي", value: h.rawi || "—" },
                { name: "📚 المصدر", value: h.source || "—" },
                { name: "📖 بيان", value: h.bayan || "—" }
              ],
              footer: { text: "4KO • YONKO.مُـــذَكّــــــر" }
            }
          ]
        });

      } catch (err) {
        console.log("❌ Hadith error:", err.message);
      }
    }, 2 * 60 * 1000); // كل دقيقتين
  });
};
