const { Client, GatewayIntentBits } = require("discord.js");

const hadithSystem = require("./hadithSystem");
const prayerSystem = require("./prayerSystem");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// تشغيل عند جاهزية البوت
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // تشغيل نظام الحديث
  hadithSystem.start(client);

  // تشغيل نظام الصلاة
  prayerSystem.start(client);
});

// توكن البوت
client.login(process.env.TOKEN);
