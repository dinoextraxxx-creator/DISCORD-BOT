const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const PRAYER_CHANNEL = "1516405973365952633";

// 🕌 بيانات تجريبية (تقدر تبدلها لاحقًا)
const prayers = [
  { name: "الفجر", time: "05:10" },
  { name: "الظهر", time: "13:30" },
  { name: "العصر", time: "17:00" },
  { name: "المغرب", time: "19:30" },
  { name: "العشاء", time: "21:00" }
];

let sentToday = new Set();

// ⏱️ جلب الوقت الحالي HH:MM
function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// 🕌 إنشاء الإيمبد
function buildPrayerEmbed(name) {
  return new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("🕌 أذان الصلاة")
    .setDescription(`حان الآن وقت صلاة **${name}**`)
    .setFooter({ text: "موعد الأذان قد يختلف حسب المدينة" });
}

// 🔘 زر الأذكار (اختياري ثابت)
function buildButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("adhkar")
      .setLabel("📿 الأذكار")
      .setStyle(ButtonStyle.Secondary)
  );
}

// 📤 إرسال الصلاة
function sendPrayer(client, prayer) {
  const channel = client.channels.cache.get(PRAYER_CHANNEL);
  if (!channel) return;

  const embed = buildPrayerEmbed(prayer.name);

  channel.send({
    embeds: [embed],
    components: [buildButtons()]
  }).catch(() => {});
}

// 🔄 فحص الصلوات
function checkPrayers(client) {
  const t = nowTime();

  for (const p of prayers) {
    if (p.time === t && !sentToday.has(p.name)) {
      sendPrayer(client, p);
      sentToday.add(p.name);
    }
  }
}

// 🔁 reset يومي
function reset() {
  sentToday.clear();
}

// 🚀 التشغيل
function start(client) {
  console.log("🕌 Prayer System Started");

  // تشغيل فوري
  checkPrayers(client);

  // كل دقيقة فحص (بدون كراش)
  setInterval(() => checkPrayers(client), 60000);

  // إعادة تعيين يومي
  setInterval(reset, 24 * 60 * 60 * 1000);
}

module.exports = { start };
