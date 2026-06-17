const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

console.log("🔥 BOT STARTING...");

// ================= SAFE LOADER =================

async function safeLoad(name, fn) {
  try {

    console.log(`🟢 Loading ${name}...`);

    await fn(client);

    console.log(`✅ ${name} LOADED`);

  } catch (err) {

    console.log(`❌ ${name} ERROR`);

    console.log(err);

  }
}

// ================= READY =================

client.once("ready", async () => {

  console.log("✅ BOT READY");

  try {

    await safeLoad(
      "PRAYER",
      require("./prayerSystem").startPrayerSystem
    );

  } catch (e) {
    console.log("PRAYER LOAD FAILED");
  }

  try {

    await safeLoad(
      "HADITH",
      require("./hadithSystem").startHadithSystem
    );

  } catch (e) {
    console.log("HADITH LOAD FAILED");
  }

  console.log("🚀 SYSTEM ONLINE");

});

// ================= LOGIN =================

client.login(process.env.TOKEN);
