const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

console.log("🔥 BOT STARTING...");

async function safe(name, fn){
try{
console.log(`🟢 Loading ${name}...`);
await fn(client);
console.log(`✅ ${name} LOADED`);
}catch(err){
console.log(`❌ ${name} ERROR`);
console.log(err);
}
}

client.once("clientReady", async () => {

console.log("✅ BOT READY");

await safe("PRAYER", require("./prayerSystem").startPrayerSystem);

console.log("🚀 SYSTEM ONLINE");
});

// 🟢 BUTTON HANDLER (FIXED)

client.on("interactionCreate", async (interaction) => {

if(!interaction.isButton()) return;

if(interaction.customId.startsWith("prayer_")){

const name = interaction.customId.replace("prayer_","");

return interaction.reply({
content: `تفاصيل صلاة ${name}`,
ephemeral: true
});

}

if(interaction.customId === "azkar"){

return interaction.reply({
content: "أذكار الأذان",
ephemeral: true
});

}

});

client.login(process.env.TOKEN);
