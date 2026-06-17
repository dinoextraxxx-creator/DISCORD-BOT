const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const CHANNEL_ID = "1516405973365952633";

const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | مواعيد الصلاة";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

const prayers = {
  fajr: {
    title: "الفجر",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "صلاة الفجر هي مقياس براءة الإنسان من النفاق",
    rakah: "• عدد ركعاتها: 2"
  },
  dhuhr: {
    title: "الظهر",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "صلاة الظهر هي أول صلاة فُرضت",
    rakah: "• عدد ركعاتها: 4"
  },
  asr: {
    title: "العصر",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "صلاة العصر هي الصلاة الوسطى",
    rakah: "• عدد ركعاتها: 4"
  },
  maghrib: {
    title: "المغرب",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "صلاة المغرب هي وتر النهار",
    rakah: "• عدد ركعاتها: 3"
  },
  isha: {
    title: "العشاء",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    desc: "صلاة العشاء هي أثقل صلاة على المنافقين",
    rakah: "• عدد ركعاتها: 4"
  }
};

// ================= EMBED =================

function buildEmbed(p) {
  return new EmbedBuilder()
    .setColor("#E8C547")
    .setAuthor({ name: AUTHOR, iconURL: ICON })
    .setTitle(`حان موعد أذان صلاة ${p.title}`)
    .setDescription(
`${p.verse}

${p.desc}

${p.rakah}`
    )
    .setFooter({ text: FOOTER, iconURL: ICON })
    .setTimestamp();
}

// ================= BUTTONS =================

function buildButtons(key) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`pray_${key}`)
      .setLabel(`صلاة ${prayers[key].title}`)
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("azkar")
      .setLabel("أذكار الأذان")
      .setStyle(ButtonStyle.Secondary)
  );
}

// ================= START =================

async function startPrayerSystem(client) {
  console.log("🟢 Prayer System Started");

  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);

  if (!channel) return console.log("❌ PRAYER CHANNEL NOT FOUND");

  // إرسال تجريبي دفعة واحدة عند التشغيل
  for (const key of Object.keys(prayers)) {
    await channel.send({
      embeds: [buildEmbed(prayers[key])],
      components: [buildButtons(key)]
    });
  }

  console.log("✅ PRAYERS SENT (TEST MODE)");
}

module.exports = { startPrayerSystem };
