const { Client, GatewayIntentBits } = require("discord.js");

const { startPrayerSystem } = require("./prayerSystem");
const { startHadithSystem } = require("./hadithSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ================= DEBUG =================

console.log("🔥 FILE LOADED");

// ================= READY =================

client.once("ready", async () => {
  console.log("BOT READY");

  try {
    console.log("🟢 STARTING PRAYER SYSTEM");
    startPrayerSystem(client);

    console.log("🟢 STARTING HADITH SYSTEM");
    startHadithSystem(client);

    console.log("✅ ALL SYSTEMS LOADED");

  } catch (err) {
    console.log("❌ SYSTEM ERROR:", err);
  }
});

// ================= LOGIN =================

client.login(process.env.TOKEN);
