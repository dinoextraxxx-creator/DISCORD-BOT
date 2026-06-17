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

  // 📖 الأحاديث (كل دقيقتين)
  const hadithBot = new HadithSystem(client, HADITH_CHANNEL, hadiths);
  hadithBot.start();

  // 🕌 الصلاة (فوري + دقيقة بين كل صلاة + بدون تكرار)
  const prayerBot = new PrayerSystem(client, PRAYER_CHANNEL);
  prayerBot.start();
});

client.login("PUT_YOUR_BOT_TOKEN_HERE");
