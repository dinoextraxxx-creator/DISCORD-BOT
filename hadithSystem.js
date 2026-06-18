const part1=require("./hadiths_part1");
const part2=require("./hadiths_part2");
const part3=require("./hadiths_part3");
const part4=require("./hadiths_part4");
const part5=require("./hadiths_part5");
const part6=require("./hadiths_part6");
const part7=require("./hadiths_part7");
const part8=require("./hadiths_part8");
const part9=require("./hadiths_part9");
const part10=require("./hadiths_part10");

const { EmbedBuilder }=require("discord.js");

let lastHadith=null;

const ALL=[
...part1,...part2,...part3,...part4,...part5,
...part6,...part7,...part8,...part9,...part10
];

function randomHadith(){
let h;
do{
h=ALL[Math.floor(Math.random()*ALL.length)];
}while(lastHadith && h.text===lastHadith.text);

lastHadith=h;
return h;
}

// ⏰ أوقات الإرسال
const TIMES=[
"07:15",
"12:00",
"18:15",
"21:30"
];

function startHadithSystem(client,{channelId,icon,color="#FF0000"}){

setInterval(()=>{

const now=new Date();
const hhmm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

if(!TIMES.includes(hhmm))return;

const channel=client.channels.cache.get(channelId);
if(!channel)return;

const h=randomHadith();

const embed=new EmbedBuilder()
.setColor(color)
.setAuthor({
name:"مُـــذَكّــــــر",
iconURL:icon
})
.setTitle("حديث نبوي شريف")
.setDescription(`🔸 قال رسول الله ﷺ:
«${h.text}»

👤 الراوي : ${h.rawi}
📚 المصدر : ${h.source}
📖 بيان : ${h.bayan || "—"}`)
.setFooter({
text:"4KO • YONKO.مُـــذَكّــــــر",
iconURL:icon
})
.setTimestamp();

channel.send({embeds:[embed]});

},60000); // كل دقيقة

}

module.exports=startHadithSystem;
