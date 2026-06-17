const { Client, GatewayIntentBits } = require("discord.js");
const HadithSystem = require("./hadithSystem");
const PrayerSystem = require("./prayerSystem");
const hadiths = require("./hadiths.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// القنوات
const HADITH_CHANNEL = "1516016586643734639";
const PRAYER_CHANNEL = "1516405973365952633";

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // 📖 نظام الأحاديث
  const hadithBot = new HadithSystem(client, HADITH_CHANNEL, hadiths);
  hadithBot.start();

  // 🕌 نظام الصلاة
  const prayerBot = new PrayerSystem(client, PRAYER_CHANNEL);
  await prayerBot.start();
});

client.login("PUT_YOUR_BOT_TOKEN_HERE");
