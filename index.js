const { Client, GatewayIntentBits } = require("discord.js");

const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// كشف أي كراش
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

client.once("ready", async () => {
  console.log("✅ BOT ONLINE:", client.user.tag);

  try {
    await hadithSystem.start(client);
    await prayerSystem.start(client);
  } catch (e) {
    console.error("❌ START ERROR:", e);
  }
});

client.login(process.env.TOKEN);
