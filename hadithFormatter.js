const { EmbedBuilder } = require("discord.js");

module.exports = function(h,color,icon){

let text=`🔸 قال رسول الله ﷺ: «${h.text}»`;

text+=`\n\n👤 الراوي : ${h.rawi}`;
text+=`\n📚 المصدر : ${h.source}`;

if(h.bayan){
text+=`\n📖 بيان : ${h.bayan}`;
}

return new EmbedBuilder()

.setColor(color || "#FF0000")

.setAuthor({
name:"مُـــذَكّــــــر",
iconURL:icon
})

// ✅ العنوان المضاف
.setTitle(
"﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ﴾"
)

.setDescription(text)

.setFooter({
text:"4KO • YONKO.مُـــذَكّــــــر",
iconURL:icon
})

.setTimestamp();

};
