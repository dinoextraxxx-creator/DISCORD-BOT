const format = require("./hadithFormatter");

const groups = [
  require("./hadiths_part1"),
  require("./hadiths_part2"),
  require("./hadiths_part3"),
  require("./hadiths_part4"),
  require("./hadiths_part5"),
  require("./hadiths_part6"),
  require("./hadiths_part7"),
  require("./hadiths_part8"),
  require("./hadiths_part9"),
  require("./hadiths_part10"),
  require("./hadiths_part11"),
  require("./hadiths_part12"),
  require("./hadiths_part13"),
  require("./hadiths_part14"),
  require("./hadiths_part15"),
  require("./hadiths_part16"),
  require("./hadiths_part17"),
  require("./hadiths_part18"),
  require("./hadiths_part19"),
  require("./hadiths_part20")
];

let lastGroup = -1;

function pickHadith() {
  let groupIndex;

  do {
    groupIndex = Math.floor(Math.random() * groups.length);
  } while (groupIndex === lastGroup && groups.length > 1);

  lastGroup = groupIndex;

  const group = groups[groupIndex];
  const hadith = group[Math.floor(Math.random() * group.length)];

  return hadith;
}

async function startHadithSystem(client, opt) {
  const channel = await client.channels.fetch(opt.channelId);
  if (!channel) return;

  async function send() {
    try {
      const h = pickHadith();
      const embed = format(h, opt.color, opt.icon);
      await channel.send({ embeds: [embed] });
    } catch (e) {
      console.log("Hadith send error:", e.message);
    }
  }

  await send();

  setInterval(send, 2 * 60 * 60 * 1000);
}

module.exports = startHadithSystem;
