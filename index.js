const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// تحميل الأنظمة
require("./hadithSystem")(client);
require("./prayerSystem")(client);

// حماية كاملة ضد الكراش
process.on("uncaughtException", (err) => {
  console.log("🔥 Crash prevented:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.log("⚠️ Rejection handled:", err);
});

client.once("ready", () => {
  console.log(`✅ Bot ready: ${client.user.tag}`);
});

client.login(process.env.TOKEN);
