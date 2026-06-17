const {
Client,
GatewayIntentBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

// ================= PRAYER SYSTEM =================
const { startPrayerSystem } = require("./prayerSystem");

// ================= HADITH SYSTEM =================
const { startHadithSystem } = require("./hadithSystem");

// ================= CLIENT =================

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

// ================= ERROR SAFETY =================

process.on("unhandledRejection", console.log);
process.on("uncaughtException", console.log);

// ================= READY =================

client.once("ready", () => {
console.log("BOT READY");

// تشغيل نظام الصلاة
startPrayerSystem(client);

// تشغيل نظام الأحاديث
startHadithSystem(client);
});

// ================= LOGIN =================

client.login(process.env.TOKEN);
