const { EmbedBuilder }=require("discord.js");

module.exports=function(h){

let desc=`🔸 ➤ قال رسول الله ﷺ: «${h.text}»`;

desc+=`\n\n👤 ➤ الراوي: ${h.rawi}`;

desc+=`\n\n📚 ➤ المصدر: ${h.source}`;

if(h.bayan){
desc+=`\n\n📖 ➤ بيان: ${h.bayan}`;
}

return new EmbedBuilder()
.setColor("#FFD700")
.setAuthor({
name:"مُـــذَكّــــــر"
})
.setDescription(desc)
.setFooter({
text:"4KO • YONKO.مُـــذَكّــــــر"
})
.setTimestamp();

};
