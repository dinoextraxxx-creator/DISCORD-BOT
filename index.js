const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// تحميل الأنظمة بشكل آمن
try {
  require("./hadithSystem")(client);
} catch (e) {
  console.log("Hadith module failed:", e.message);
}

try {
  require("./prayerSystem")(client);
} catch (e) {
  console.log("Prayer module failed:", e.message);
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// حماية نهائية ضد الكراش
process.on("uncaughtException", (err) => {
  console.log("🔥 Uncaught Exception:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.log("⚠️ Unhandled Rejection:", err);
});

client.login(process.env.TOKEN);
