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

client.once("ready", async () => {

console.log("READY EVENT FIRED");

console.log("✅ BOT READY");

await safe("PRAYER", require("./prayerSystem").startPrayerSystem);

await safe("HADITH", require("./hadithSystem").startHadithSystem);

console.log("🚀 SYSTEM ONLINE");

});

// BUTTONS

client.on("interactionCreate", async (i) => {

if(!i.isButton()) return;

if(i.customId.startsWith("prayer_")){

const name = i.customId.replace("prayer_","");

return i.reply({
content:`تفاصيل صلاة ${name}`,
ephemeral:true
});

}

if(i.customId === "azkar"){

return i.reply({
content:"أذكار الأذان",
ephemeral:true
});

}

});

client.login(process.env.TOKEN);
