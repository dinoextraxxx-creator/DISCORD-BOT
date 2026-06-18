const axios=require("axios");
const { EmbedBuilder }=require("discord.js");

const API="https://api.aladhan.com/v1/timingsByCity?city=Casablanca&country=Morocco&method=21";

let last=null;
let todayReset="";

function parse(t){
const [h,m]=t.split(":");
const d=new Date();
d.setHours(+h);
d.setMinutes(+m);
d.setSeconds(0);
return d;
}

async function startPrayerSystem(client){

setInterval(async()=>{

try{

const res=await axios.get(API);
const t=res.data.data.timings;

const list=[
["fajr",t.Fajr],
["dhuhr",t.Dhuhr],
["asr",t.Asr],
["maghrib",t.Maghrib],
["isha",t.Isha]
];

const now=new Date();

const day=now.toDateString();
if(todayReset!==day){
todayReset=day;
last=null;
}

const next=list.find(p=>parse(p[1])>now);
if(!next)return;

const [name]=next;

if(last===name)return;
last=name;

const channel=client.channels.cache.find(c=>c.isTextBased());
if(!channel)return;

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
