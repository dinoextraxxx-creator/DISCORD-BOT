const { Client, GatewayIntentBits } = require("discord.js");

const { startPrayerSystem } = require("./prayerSystem");
const { startHadithSystem } = require("./hadithSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ================= SAFETY =================

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

// ================= READY =================

client.once("ready", async () => {
  console.log("🔥 BOT READY");

  try {
    await startPrayerSystem(client);
    await startHadithSystem(client);

    console.log("✅ ALL SYSTEMS RUNNING");

  } catch (err) {
    console.log("❌ SYSTEM ERROR:", err);
  }
});

// ================= LOGIN =================

client.login(process.env.TOKEN);
