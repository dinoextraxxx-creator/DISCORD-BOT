const { EmbedBuilder } = require("discord.js");

class HadithSystem {
  constructor(client, channelId, hadiths) {
    this.client = client;
    this.channelId = channelId;
    this.hadiths = hadiths;
  }

  start() {
    const sendHadith = async () => {
      const channel = await this.client.channels.fetch(this.channelId);
      if (!channel) return;

      const random = this.hadiths[Math.floor(Math.random() * this.hadiths.length)];

      const embed = new EmbedBuilder()
        .setColor("#FFD700")
        .setDescription(`🔸 قال رسول الله ﷺ:\n\n«${random.text}»`)
        .addFields(
          { name: "👤 الراوي", value: random.rawi || "غير مذكور", inline: false },
          { name: "📚 المصدر", value: random.source || "غير مذكور", inline: false },
          { name: "📖 بيان", value: random.bayan || "لا يوجد", inline: false }
        )
        .setFooter({ text: "4KO • YONKO.Mُـــذَكّــــــر" });

      channel.send({ embeds: [embed] });
    };

    // أول تشغيل
    sendHadith();

    // كل 2 دقائق
    setInterval(sendHadith, 2 * 60 * 1000);
  }
}

module.exports = HadithSystem;
