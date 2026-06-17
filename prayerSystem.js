const { EmbedBuilder } = require("discord.js");

class PrayerSystem {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;

    this.prayers = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
    this.sent = new Set();
  }

  async sendPrayer(name) {
    const channel = await this.client.channels.fetch(this.channelId);

    const embed = new EmbedBuilder()
      .setColor("#FFD700")
      .setTitle(`🕌 ${name}`)
      .setDescription(`حان الآن وقت صلاة ${name}`)
      .setFooter({ text: "موعد الأذان قد يتغير من مدينة لأخرى" });

    await channel.send({ embeds: [embed] });
  }

  async start() {
    const run = async () => {
      for (let i = 0; i < this.prayers.length; i++) {
        const name = this.prayers[i];

        if (this.sent.has(name)) continue;

        await this.sendPrayer(name);
        this.sent.add(name);

        // ⏱️ دقيقة بين كل صلاة
        if (i < this.prayers.length - 1) {
          await new Promise((res) => setTimeout(res, 60 * 1000));
        }
      }
    };

    // تشغيل فوري عند تشغيل البوت
    run();
  }
}

module.exports = PrayerSystem;
