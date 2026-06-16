const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("Bot is ready");
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "hadith") {
    await interaction.reply({
      content: "📜 هذا حديث خاص لك فقط",
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
