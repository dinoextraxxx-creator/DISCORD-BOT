const { Client, GatewayIntentBits } = require("discord.js");
const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // تشغيل النظامين بعد 5 ثوانٍ من التشغيل
  setTimeout(async () => {
    await prayerSystem.start(client);
    await hadithSystem.start(client);
  }, 5000);
});

client.login(process.env.TOKEN);
