const { EmbedBuilder }=require("discord.js");

module.exports=function(h,color="#FFA500",icon){

let text=`🔸 ➤ قال رسول الله ﷺ: «${h.text}»`;

text+=`\n\n👤 ➤ الراوي: ${h.rawi}`;
text+=`\n\n📚 ➤ المصدر: ${h.source}`;

if(h.bayan){
text+=`\n\n📖 ➤ بيان: ${h.bayan}`;
}

return new EmbedBuilder()
.setColor(color)
.setAuthor({name:"مُـــذَكّــــــر",iconURL:icon})
.setDescription(text)
.setFooter({text:"4KO • YONKO.مُـــذَكّــــــر",iconURL:icon})
.setTimestamp();
};
