const fs = require("fs");
const path = require("path");
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

const STATE_FILE = path.join(__dirname, "hadith_state.json");
const TWO_HOURS = 2 * 60 * 60 * 1000;

let lastGroup = -1;

function loadState() {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return { lastSent: 0 };
  }
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state));
  } catch (e) {
    console.log("Hadith state save error:", e.message);
  }
}

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
      saveState({ lastSent: Date.now() });
    } catch (e) {
      console.log("Hadith send error:", e.message);
    }
  }

  const state = loadState();
  const elapsed = Date.now() - (state.lastSent || 0);

  if (elapsed >= TWO_HOURS) {
    // مر وقت كافٍ منذ آخر إرسال → يرسل الآن
    await send();
  } else {
    console.log(
      `Hadith: skipping immediate send, last one was ${Math.round(
        elapsed / 60000
      )} minutes ago`
    );
  }

  setInterval(send, TWO_HOURS);
}

module.exports = startHadithSystem;
