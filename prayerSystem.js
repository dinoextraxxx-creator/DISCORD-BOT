const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

// ================= CONFIG =================

const CHANNEL_ID = "1516405973365952633";

const ICON = "YOUR_ICON_URL";
const AUTHOR = "مُـــذَكّــــــر | مواعيد الصلاة";
const FOOTER = "مواعيد الصلاة قد تتغير من مدينة الى الاخرى";

// ================= PRAYERS TEST DATA =================

const prayers = {
  fajr: {
    title: "الفجر",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    description: "صلاة الفجر هي مقياس براءة الإنسان من النفاق",
    rakah: "• عدد ركعاتها: 2"
  },
  dhuhr: {
    title: "الظهر",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    description: "صلاة الظهر هي أول صلاة فُرضت وصُلّيت",
    rakah: "• عدد ركعاتها: 4"
  },
  asr: {
    title: "العصر",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    description: "صلاة العصر هي الصلاة الوسطى",
    rakah: "• عدد ركعاتها: 4"
  },
  maghrib: {
    title: "المغرب",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    description: "صلاة المغرب هي وتر النهار",
    rakah: "• عدد ركعاتها: 3"
  },
  isha: {
    title: "العشاء",
    verse: "﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾",
    description: "صلاة العشاء هي أثقل صلاة على المنافقين",
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

${p.description}

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

// ================= TEST SEND ALL =================

async function startPrayerSystem(client) {
  console.log("🟢 PRAYER TEST MODE STARTED");

  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);

  if (!channel) {
    console.log("❌ CHANNEL NOT FOUND");
    return;
  }

  // إرسال كل الصلوات فور التشغيل (TEST ONLY)
  for (const key of Object.keys(prayers)) {
    await channel.send({
      embeds: [buildEmbed(prayers[key])],
      components: [buildButtons(key)]
    });

    console.log("📤 SENT:", key);
  }

  console.log("✅ ALL PRAYERS SENT (TEST COMPLETE)");
}

module.exports = { startPrayerSystem };
