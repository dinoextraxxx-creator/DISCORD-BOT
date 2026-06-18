const formatter=require("./hadithFormatter");

const CHANNEL_ID="1516016586643734639";

const SCHEDULE=[
{h:7,m:15},
{h:12,m:0},
{h:18,m:15},
{h:21,m:30}
];

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

const hadiths=[
...part1,...part2,...part3,...part4,...part5,
...part6,...part7,...part8,...part9,...part10
];

module.exports=(client,options={})=>{

const icon=options.icon;
const color=options.color||"#FFA500";

let last=-1;
let sent=new Set();

function randomHadith(){
let i;
do{
i=Math.floor(Math.random()*hadiths.length);
}while(i===last && hadiths.length>1);
last=i;
return hadiths[i];
}

async function send(){
const ch=await client.channels.fetch(CHANNEL_ID);
if(!ch)return;
await ch.send({embeds:[formatter(randomHadith(),color,icon)]});
}

function tick(){

const now=new Date();
const time=new Date(now.toLocaleString("en-US",{timeZone:"Africa/Casablanca"}));

const h=time.getHours();
const m=time.getMinutes();

const key=`${h}:${m}`;

if(sent.has(key))return;

for(const s of SCHEDULE){
if(s.h===h && s.m===m){
send();
sent.add(key);
}
}
}

function reset(){
sent.clear();
}

setInterval(tick,60000);
setInterval(reset,86400000);

console.log("Hadith system running...");
};
