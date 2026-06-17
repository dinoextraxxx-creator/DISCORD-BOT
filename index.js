const { Client, GatewayIntentBits } = require("discord.js");
const startPrayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // تشغيل نظام الصلاة مباشرة
  startPrayerSystem(client);
});

client.login(process.env.TOKEN);
