const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const CHANNEL_ID = "1516405973365952633";

const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | مواعيد الصلاة";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

const prayers = [
  {
    name: "الفجر",
    text: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "صلاة الفجر نور للمؤمن",
    rakah: "• عدد الركعات: 2"
  },
  {
    name: "الظهر",
    text: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "أول صلاة مفروضة",
    rakah: "• عدد الركعات: 4"
  },
  {
    name: "العصر",
    text: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "الصلاة الوسطى",
    rakah: "• عدد الركعات: 4"
  },
  {
    name: "المغرب",
    text: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "وتر النهار",
    rakah: "• عدد الركعات: 3"
  },
  {
    name: "العشاء",
    text: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "أثقل صلاة على المنافقين",
    rakah: "• عدد الركعات: 4"
  }
];

function buildEmbed(p) {
  return new EmbedBuilder()
    .setColor("#E8C547")
    .setAuthor({ name: AUTHOR, iconURL: ICON })
    .setTitle(`حان موعد أذان صلاة ${p.name}`)
    .setDescription(
`${p.text}

${p.desc}

${p.rakah}`
    )
    .setFooter({ text: FOOTER, iconURL: ICON })
    .setTimestamp();
}

function buttons(key) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`pray_${key}`)
      .setLabel(`صلاة ${prayers[key].name}`)
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("azkar")
      .setLabel("أذكار الأذان")
      .setStyle(ButtonStyle.Secondary)
  );
}

async function startPrayerSystem(client) {
  const channel = await client.channels.fetch(CHANNEL_ID);

  if (!channel) return console.log("❌ Prayer channel missing");

  let i = 0;

  // أول صلاة فور التشغيل
  await send(i);

  async function send(index) {
    const p = prayers[index];

    await channel.send({
      embeds: [buildEmbed(p)],
      components: [buttons(index)]
    });

    console.log("🟢 PRAYER SENT:", p.name);
  }

  // كل دقيقة صلاة التالية
  setInterval(async () => {
    i++;

    if (i >= prayers.length) i = 0;

    await send(i);

  }, 60 * 1000);
}

module.exports = { startPrayerSystem };
