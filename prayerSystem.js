const { EmbedBuilder } = require("discord.js");
const { PrayerTimes, Coordinates, CalculationMethod } = require("adhan");

class PrayerSystem {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
    this.sentToday = new Set();
  }

  getTimes() {
    const coords = new Coordinates(30.4278, -9.5981); // Agadir
    const params = CalculationMethod.MuslimWorldLeague();

    const date = new Date();
    return new PrayerTimes(coords, date, params);
  }

  async sendPrayer(name, time) {
    const channel = await this.client.channels.fetch(this.channelId);

    const embed = new EmbedBuilder()
      .setColor("#FFD700")
      .setTitle(`🕌 ${name}`)
      .setDescription(`حان الآن وقت صلاة ${name}`)
      .addFields({
        name: "⏰ الوقت",
        value: time.toLocaleTimeString(),
      })
      .setFooter({ text: "موعد الأذان قد يتغير من مدينة لأخرى" });

    channel.send({ embeds: [embed] });
  }

  start() {
    const run = async () => {
      const times = this.getTimes();

      const prayers = [
        { name: "الفجر", time: times.fajr },
        { name: "الظهر", time: times.dhuhr },
        { name: "العصر", time: times.asr },
        { name: "المغرب", time: times.maghrib },
        { name: "العشاء", time: times.isha }
      ];

      const now = new Date();

      for (const p of prayers) {
        const key = `${p.name}-${now.getDate()}`;

        // منع التكرار
        if (this.sentToday.has(key)) continue;

        const diff = Math.abs(new Date(p.time) - now);

        // إذا اقترب الوقت (دقيقة تقريباً)
        if (diff < 60000) {
          await this.sendPrayer(p.name, new Date(p.time));
          this.sentToday.add(key);
        }
      }
    };

    run();
    setInterval(run, 60 * 1000);
  }
}

module.exports = PrayerSystem;
