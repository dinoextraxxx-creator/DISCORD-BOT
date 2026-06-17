const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

console.log("🔥 BOT STARTING...");

// ================= SAFE LOADER =================

async function loadSystem(name, fn) {
  try {
    console.log(`🟢 Loading ${name}...`);
    await fn(client);
    console.log(`✅ ${name} loaded`);
  } catch (err) {
    console.log(`❌ ${name} FAILED:`, err);
  }
}

client.once("ready", async () => {
  console.log("✅ BOT READY");

  // تحميل كل نظام بشكل آمن (بدون كراش كامل للبوت)
  await loadSystem("PRAYER", require("./prayerSystem").startPrayerSystem);
  await loadSystem("HADITH", require("./hadithSystem").startHadithSystem);

  console.log("🚀 SYSTEM BOOT FINISHED");
});

client.login(process.env.TOKEN);
