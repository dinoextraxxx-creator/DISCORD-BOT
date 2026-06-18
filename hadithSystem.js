const formatter=require("./hadithFormatter");

const CHANNEL_ID="1516016586643734639";

const SCHEDULE=[
{h:7,m:15},
{h:12,m:0},
{h:18,m:15},
{h:21,m:30}
];

const parts=[
require("./hadiths_part1"),
require("./hadiths_part2"),
require("./hadiths_part3"),
require("./hadiths_part4"),
require("./hadiths_part5"),
require("./hadiths_part6"),
require("./hadiths_part7"),
require("./hadiths_part8"),
require("./hadiths_part9"),
require("./hadiths_part10")
];

const hadiths=parts.flat();

module.exports=(client,options={})=>{

const icon=options.icon;
const color=options.color;

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

async function sendHadith(){
const channel=await client.channels.fetch(CHANNEL_ID);
if(!channel)return;

await channel.send({
embeds:[formatter(randomHadith(),color,icon)]
});
}

// 🧠 مهم: لا يعمل قبل جاهزية البوت
function check(){

if(!client.isReady()) return;

const now=new Date();
const time=new Date(now.toLocaleString("en-US",{timeZone:"Africa/Casablanca"}));

const h=time.getHours();
const m=time.getMinutes();

const key=`${h}:${m}`;

if(sent.has(key)) return;

for(const s of SCHEDULE){
if(s.h===h && s.m===m){
sendHadith();
sent.add(key);
}
}
}

setInterval(check,60000);
setInterval(()=>sent.clear(),86400000);

console.log("Hadith system locked & running");
};
