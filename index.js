const { Client, GatewayIntentBits } = require("discord.js");

const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// 🛑 حماية من أي كراش غير متوقع
process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.log("❌ Uncaught Exception:", err);
});

// 🚀 تشغيل الأنظمة
client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    // تأخير بسيط لتجنب cache issues
    setTimeout(() => {
      prayerSystem.start(client);
      hadithSystem.start(client);
    }, 3000);

  } catch (err) {
    console.log("❌ Error in systems startup:", err);
  }
});

client.login(process.env.TOKEN);
