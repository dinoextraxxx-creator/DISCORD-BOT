const formatter = require("./hadithFormatter");

const CHANNEL_ID =
"1516016586643734639";

const CHANGE_INTERVAL =
120000;

const parts = [

...require("./hadiths_part1").part1,

...require("./hadiths_part2").part2,

...require("./hadiths_part3").part3,

...require("./hadiths_part4").part4,

...require("./hadiths_part5").part5,

...require("./hadiths_part6").part6,

...require("./hadiths_part7").part7,

...require("./hadiths_part8").part8,

...require("./hadiths_part9").part9,

...require("./hadiths_part10").part10

];

module.exports = async (client)=>{

let lastIndex = -1;

async function sendRandom(){

const channel =
await client.channels.fetch(
CHANNEL_ID
);

if(!channel)
return;

let index;

do{

index =
Math.floor(
Math.random()
*
parts.length
);

}

while(
index === lastIndex
&&
parts.length > 1
);

lastIndex =
index;

const hadith =
parts[index];

await channel.send({

embeds:[
formatter(
hadith
)
]

});

}

await sendRandom();

setInterval(
sendRandom,
CHANGE_INTERVAL
);

};
