const { Client, GatewayIntentBits } = require("discord.js");

// ================= SYSTEMS =================

const { startPrayerSystem } = require("./prayerSystem");
const { startHadithSystem } = require("./hadithSystem");

// ================= CLIENT =================

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ================= SAFETY =================

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

// ================= READY =================

client.once("ready", () => {
  console.log("BOT READY");

  // تشغيل نظام الصلاة (أوقات + إرسال طبيعي)
  startPrayerSystem(client);

  // تشغيل نظام الأحاديث (كل دقيقتين + بدون تكرار)
  startHadithSystem(client);
});

// ================= LOGIN =================

client.login(process.env.TOKEN);
