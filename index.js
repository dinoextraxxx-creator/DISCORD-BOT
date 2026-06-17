const { Client, GatewayIntentBits } = require("discord.js");
const { startHadithSystem } = require("./hadithSystem");
const { startPrayerSystem } = require("./prayerSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  startHadithSystem(client);
  startPrayerSystem(client);
});

client.login(process.env.TOKEN);
