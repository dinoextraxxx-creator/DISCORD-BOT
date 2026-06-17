const { Client, GatewayIntentBits } = require("discord.js");
const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// 📌 تشغيل عند الجاهزية
client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // 🕌 تشغيل نظام الصلاة
  prayerSystem.start(client);

  // 📖 تشغيل نظام الأحاديث
  hadithSystem.start(client);
});

client.login("YOUR_BOT_TOKEN");
