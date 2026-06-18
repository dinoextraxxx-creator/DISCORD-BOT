const formatter=require("./hadithFormatter");

const CHANNEL_ID="1516016586643734639";

const INTERVAL=120000;

// تحميل كل الأجزاء بشكل صحيح (بدون .partX)
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

// دمج كل الأحاديث
const hadiths=[
...part1,
...part2,
...part3,
...part4,
...part5,
...part6,
...part7,
...part8,
...part9,
...part10
];

module.exports=async(client)=>{

let last=-1;

const send=async()=>{

const channel=await client.channels.fetch(CHANNEL_ID);
if(!channel)return;

let index;

do{
index=Math.floor(Math.random()*hadiths.length);
}while(index===last && hadiths.length>1);

last=index;

await channel.send({
embeds:[formatter(hadiths[index])]
});

};

// أول إرسال مباشر
await send();

// كل دقيقتين
setInterval(send,INTERVAL);

};
