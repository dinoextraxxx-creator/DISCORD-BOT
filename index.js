const { Client, GatewayIntentBits } = require("discord.js");

const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// حماية من أي كراش نهائي
process.on("unhandledRejection", (err) => {
  console.log("❌ UNHANDLED REJECTION:");
  console.log(err);
});

process.on("uncaughtException", (err) => {
  console.log("❌ UNCAUGHT EXCEPTION:");
  console.log(err);
});

// تأكد من التوكن
if (!process.env.TOKEN) {
  console.log("❌ TOKEN is missing in environment variables");
  process.exit(1);
}

client.once("ready", async () => {
  console.log("✅ BOT ONLINE:", client.user.tag);

  try {
    await hadithSystem.start(client);
    await prayerSystem.start(client);
  } catch (e) {
    console.log("❌ SYSTEM START ERROR:", e);
  }
});

client.login(process.env.TOKEN);
