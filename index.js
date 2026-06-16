const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log("Bot is ready");

  // ضع هنا ID القناة
  const channel = await client.channels.fetch("1516072447219335415");

  const embed = new EmbedBuilder()
    .setTitle("📖 رسالة اختبار")
    .setDescription("إذا رأيت هذه الرسالة فهذا يعني أن البوت يعمل بشكل صحيح ✔")
    .setColor(0xFFD700)
    .setFooter({ text: "بوت الأحاديث" });

  await channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
