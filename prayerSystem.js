const axios=require("axios");
const { EmbedBuilder }=require("discord.js");

const API=
"https://api.aladhan.com/v1/timingsByCity?city=Casablanca&country=Morocco&method=21";

let lastSent=null;
let lastDate="";

function toDate(t){
const [h,m]=t.split(":");
const d=new Date();
d.setHours(+h);
d.setMinutes(+m);
d.setSeconds(0);
d.setMilliseconds(0);
return d;
}

async function startPrayerSystem(client){

setInterval(async()=>{

try{

const res=await axios.get(API);
const t=res.data.data.timings;

const prayers=[
["fajr",t.Fajr],
["dhuhr",t.Dhuhr],
["asr",t.Asr],
["maghrib",t.Maghrib],
["isha",t.Isha]
];

const now=new Date();
const today=now.toDateString();

// reset يومي
if(lastDate!==today){
lastDate=today;
lastSent=null;
}

const next=prayers.find(p=>toDate(p[1])>now);
if(!next)return;

const [name,time]=next;

// منع التكرار
if(lastSent===name)return;
lastSent=name;

// قناة (عدّلها لو تريد)
const channel=client.channels.cache.find(c=>c.isTextBased());
if(!channel)return;

// 🔥 Embed الصلاة (حسب طلبك: أصفر)
const embed=new EmbedBuilder()
.setColor("#FFD700")
.setAuthor({
name:"مُـــذَكّــــــر | مواعـــيد الصــــلاة"
})
.setTitle(`حان موعد صلاة ${name} حسب التوقيت المحلي لمدينة الدار البيضاء`)
.setDescription(`الأذان الآن لصلاة ${name}`)
.setFooter({
text:"4KO • YONKO.مُـــذَكّــــــر"
})
.setTimestamp();

channel.send({embeds:[embed]});

}catch(e){
console.log("Prayer error:",e.message);
}

},60000);

}

module.exports=startPrayerSystem;
