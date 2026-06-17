const { Client, GatewayIntentBits } = require("discord.js");
const { startHadithSystem } = require("./hadithSystem");
const { startPrayerSystem } = require("./prayerSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  await startHadithSystem(client);
  await startPrayerSystem(client);
});

client.login(process.env.TOKEN);
