const axios = require("axios");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const PRAYER_DETAILS = require("./prayers");

const API =
  "https://api.aladhan.com/v1/timingsByCity?city=Casablanca&country=Morocco&method=18";

const CHANNEL = "1516405973365952633";
const ICON =
  "https://cdn.discordapp.com/attachments/1515161056975126705/1516909922040811610/-_4.jpg";

let cache = { date: null, timings: null };
let sentToday = { date: null, prayers: {} };

function hhmm(t) {
  return t.split(" ")[0].replace(/\(.*/, "").slice(0, 5);
}

async function fetchTimings() {
  const r = await axios.get(API, { timeout: 10000 });
  const t = r.data.data.timings;
  return {
    fajr: hhmm(t.Fajr),
    dhuhr: hhmm(t.Dhuhr),
    asr: hhmm(t.Asr),
    maghrib: hhmm(t.Maghrib),
    isha: hhmm(t.Isha)
  };
}

async function ensureToday() {
  const today = new Date().toDateString();

  if (cache.date !== today) {
    try {
      cache.timings = await fetchTimings();
      cache.date = today;
    } catch (e) {
      console.log("Prayer API fetch failed:", e.message);
      // يحاول مجدداً في الدورة القادمة بدون تحديث cache.date
      return null;
    }
  }

  if (sentToday.date !== today) {
    sentToday = { date: today, prayers: {} };
  }

  return cache.timings;
}

async function startPrayerSystem(client) {
  setInterval(async () => {
    try {
      const timings = await ensureToday();
      if (!timings) return;

      const now = new Date();
      const current = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      for (const id of Object.keys(timings)) {
        if (timings[id] !== current) continue;
        if (sentToday.prayers[id]) continue;

        sentToday.prayers[id] = true;

        const p = PRAYER_DETAILS[id];

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`pray_${id}`)
            .setLabel(`صلاة ${p.name}`)
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("azkar")
            .setLabel("أذكار الأذان")
            .setStyle(ButtonStyle.Secondary)
        );

        const embed = new EmbedBuilder()
          .setColor("#FFD700")
          .setAuthor({
            name: "مُـــذَكّــــــر | مواعـــيد الصــــلاة",
            iconURL: ICON
          })
          .setTitle(
            `حان موعد أذان صلاة ${p.name} حسب التوقيت المحلي لمدينة الدار البيضاء`
          )
          .setDescription(`**${p.name}**\n🕐 ${timings[id]}\n${p.verse}`)
          .setFooter({
            text: "موعد الأذان قد يتغير من مدينة لأخرى",
            iconURL: ICON
          })
          .setTimestamp();

        try {
          const ch = await client.channels.fetch(CHANNEL);
          await ch.send({ embeds: [embed], components: [row] });
        } catch (e) {
          console.log("Prayer send error:", e.message);
        }
      }
    } catch (e) {
      console.log("Prayer loop error:", e.message);
    }
  }, 30000);
}

module.exports = startPrayerSystem;
