const { Client, GatewayIntentBits } = require("discord.js");

const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  hadithSystem.start(client);
  prayerSystem.start(client);
});

client.login(process.env.TOKEN);
