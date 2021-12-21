//import discord.js
const Discord = require('discord.js');
const prefix = '!';

//taken from stackoverflow, take notes???
const args = message.content.trim().split(/ +/g);
const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

//login to discord
const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS"
    ],
});

//Display when logged in
client.on("ready", () => {
    console.log('Logged in as E!');
});

//commands to look for
client.on("message", async message => {
    if (message.content === "!ping"){
        message.channel.send("Hello!");
    }
    if (message.content === "!salad"){
        message.channel.send("burgers are better");
    }
    if (message.content === "!E" || message.content === "!e"){
        if (!args[1]){
            message.channel.send("EEEEEEEEEEEEEEEEEEEEEEEEE");
        }
        else if (args[1].isNaN()){
            message.channel.send("EEEEEEEEEEEEEEEEEEEEEEEE");
        }
        else if (!args[1].isNaN()){
            var str = "";
            for (var i = 0; i < args[1]; i++){
                str += "E";
            }
            message.channel.send(str);
        }
    }
    if (message.content === "Kevin" || message.content === "kevin"){
        message.channel.send("https://gfycat.com/coarseneighboringhummingbird-kevin-what");
    }
    if (message.content.includes("http://") || message.content.includes("https://")){
        var m = getRandomIntInclusive(0, 4);
        getRandomMessage(m);
    }
})

//function to get a random message for links
function getRandomMessage(m){
    if (m == 0){
        getRandomMessage(getRandomIntInclusive(1,4));
    }
    if (m == 4){
        getRandomMessage(getRandomIntInclusive(0,3));
    }
    if (m == 1){
        message.channel.send("Is that a JOJO reference!!!!");
    }
    if (m == 2){
        message.channel.send("I think thats a rick roll, very sus ಠಿ_ಠ");
    }
    if (m == 3){
        message.channel.send("SSSSSSPPPPPPAAAAAAMMMMM");
    }
    return;
}

//random number
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

//login to discord
client.login(process.env.token);
