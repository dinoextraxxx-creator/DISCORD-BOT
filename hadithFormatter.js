const { EmbedBuilder } = require("discord.js");

module.exports = function formatHadith(h) {

let body = "";

body += `🔸 ➤ قال رسول الله ﷺ: «${h.text}»`;

body += `\n\n👤 ➤ الراوي: ${h.rawi}`;

body += `\n\n📚 ➤ المصدر: ${h.source}`;

if (h.bayan) {
body += `\n\n📖 ➤ بيان: ${h.bayan}`;
}

return new EmbedBuilder()

.setColor("#FFD700")

.setAuthor({
name:"مُـــذَكّــــــر"
})

.setDescription(body)

.setFooter({
text:"4KO • YONKO. مُـــذَكّــــــر"
})

.setTimestamp();

};
