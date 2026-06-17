const axios=require("axios");

const API=
"https://api.aladhan.com/v1/timingsByCity?city=Casablanca&country=Morocco&method=21";

let lastSent=null;

function toDate(t){
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

const prayers=[
["fajr",t.Fajr],
["dhuhr",t.Dhuhr],
["asr",t.Asr],
["maghrib",t.Maghrib],
["isha",t.Isha]
];

const now=new Date();

const next=prayers.find(p=>toDate(p[1])>now);

if(!next)return;

const [name,time]=next;

// منع التكرار
if(lastSent===name)return;

lastSent=name;

// هنا ضع channel ID
const channel=client.channels.cache.find(c=>c.isTextBased());
if(!channel)return;

channel.send({
embeds:[
{
title:`حان موعد ${name}`,
color:0x00ff66,
description:`الأذان القادم الآن`
}
]
});

}catch(e){
console.log("Prayer error:",e.message);
}

},60000); // كل دقيقة

}

module.exports=startPrayerSystem;
