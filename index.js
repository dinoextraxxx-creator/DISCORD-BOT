const { Client, GatewayIntentBits } = require("discord.js");

const { startPrayerSystem } = require("./prayerSystem");
const { startHadithSystem } = require("./hadithSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

client.once("ready", async () => {
  console.log("BOT READY");

  startPrayerSystem(client);
  startHadithSystem(client);
});

client.login(process.env.TOKEN);
