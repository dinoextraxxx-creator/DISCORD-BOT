const format=require("./hadithFormatter");

const p1=require("./hadiths_part1");
const p2=require("./hadiths_part2");
const p3=require("./hadiths_part3");
const p4=require("./hadiths_part4");
const p5=require("./hadiths_part5");
const p6=require("./hadiths_part6");
const p7=require("./hadiths_part7");
const p8=require("./hadiths_part8");
const p9=require("./hadiths_part9");
const p10=require("./hadiths_part10");

const ALL=[
...p1,...p2,...p3,...p4,...p5,
...p6,...p7,...p8,...p9,...p10
];

let last=null;

function pick(){

let h;

do{
h=ALL[Math.floor(Math.random()*ALL.length)];
}
while(last && h.text===last.text);

last=h;

return h;

}

async function startHadithSystem(client,opt){

const channel=
await client.channels.fetch(
opt.channelId
);

if(!channel)return;

async function send(){

const h=pick();

const embed=
format(
h,
opt.color,
opt.icon
);

await channel.send({
embeds:[embed]
});

}

setTimeout(()=>{

send();

setInterval(
send,
150*60*1000
);

},150*60*1000);

}

module.exports=
startHadithSystem;
