const { Client, GatewayIntentBits } = require("discord.js");

// ================= SYSTEMS =================

const { startPrayerSystem } = require("./prayerSystem");
const { startHadithSystem } = require("./hadithSystem");

// ================= CLIENT =================

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ================= ERRORS =================

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

// ================= READY =================

client.once("ready", () => {
  console.log("BOT READY");

  // تشغيل الصلاة
  startPrayerSystem(client);

  // تشغيل الأحاديث
  startHadithSystem(client);
});

// ================= LOGIN =================

client.login(process.env.TOKEN);
