const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log("Bot is ready");

  try {
    const channel = await client.channels.fetch("1516072447219335415");

    const embed = new EmbedBuilder()
      .setTitle("📖 اختبار البوت")
      .setDescription("إذا ظهرت هذه الرسالة، فالبوت يعمل بشكل صحيح ✔");

    await channel.send({ embeds: [embed] });

  } catch (err) {
    console.error("Error sending message:", err);
  }
});

client.login(process.env.TOKEN);
