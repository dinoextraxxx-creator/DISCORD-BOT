const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

console.log("🔥 BOT STARTING...");

async function safeLoad(name, fn) {
  try {
    console.log(`🟢 Loading ${name}...`);
    await fn(client);
    console.log(`✅ ${name} LOADED`);
  } catch (err) {
    console.log(`❌ ${name} ERROR:`, err.message);
  }
}

client.once("ready", async () => {
  console.log("✅ BOT READY");

  // تشغيل الأنظمة بشكل آمن
  safeLoad("PRAYER", require("./prayerSystem").startPrayerSystem);
  safeLoad("HADITH", require("./hadithSystem").startHadithSystem);

  console.log("🚀 SYSTEM ONLINE");
});

client.login(process.env.TOKEN);
