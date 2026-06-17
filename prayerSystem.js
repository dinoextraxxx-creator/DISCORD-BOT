
const { EmbedBuilder } = require("discord.js");
const prayers = require("./prayers");

const CHANNEL_ID = "1516016586643734639";

function buildEmbed(prayer) {
  return new EmbedBuilder()
    .setTitle(`حان موعد أذان صلاة ${prayer.title} حسب التوقيت المحلي لمدينة الرباط`)
    .setDescription(`قال تعالى :\n\n***﴿ ${prayer.verse} ﴾***`)
    .setColor("#E8C547")
    .setTimestamp();
}

function startPrayerSystem(client) {
  const schedule = prayers;

  function sendPrayer(prayer) {
    client.channels.fetch(CHANNEL_ID)
      .then(ch => {
        if (!ch) return;
        ch.send({ embeds: [buildEmbed(prayer)] });
      })
      .catch(console.log);
  }

  function checkPrayerTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    for (let key in schedule) {
      const p = schedule[key];

      if (p.hour === hour && p.minute === minute) {
        sendPrayer(p);
      }
    }
  }

  setInterval(checkPrayerTime, 60 * 1000);

  console.log("PRAYER SYSTEM ACTIVE");
}

module.exports = { startPrayerSystem };
