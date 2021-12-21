//import discord.js
const Discord = require('discord.js');
const prefix = '!';

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
    console.log(`Logged in as ${client.user.tag}`);
});

//commands to look for
client.on("message", async message => {
    //taken from stackoverflow, take notes???
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

    if (message.content === "!ping"){
        message.channel.send("Hello!");
    }
    if (message.content.toLowerCase().includes("balls") || message.content.toLowerCase().includes("ball")){
        message.channel.send("https://giphy.com/gifs/shiny-AxpvyWYDHuIH6");
    }
    if (message.content === "!salad"){
        message.channel.send("burgers are better");
    }
    if (cmd === "!e" || message.content.includes("!e") || message.content.includes("!E")){
        if (args[1])
            message.channel.send(args[1]);
        if (!args[1] || !Number.isInteger(args[1])){
            message.channel.send("EEEEEEEEEEEEEEEEEEEEEEEEE");
        }
        else{
            var str = "";
            for (var i = 0; i < args[1]; i++){
                str += "E";
            }
            message.channel.send(str);
        }
    }
    var command = message.content;
    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }

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

    var mess = message.content.toLowerCase();
    if (message.content.toLowerCase().includes("kevin") && !(message.author.id === client.user.id) && !(message.content.includes("http://"))  && !(message.content.includes("https://"))){
        message.channel.send("https://gfycat.com/coarseneighboringhummingbird-kevin-what");
        var vc = client.channels.get("903033540747333644");
        vc.join().then(connection => {
            const dispatcher = connection.playFile('./yt1s.com - Home Alone 2 Kevins Not Here-[AudioTrimmer.com].mp3')
            dispatcher.on("end", end => {vc.leave()});
        })
        .catch(console.error);
    };
    if (message.content.includes("http://") || message.content.includes("https://") && !(message.author.id === client.user.id) && !message.content.includes("https://giphy")){
        var m = getRandomIntInclusive(0, 4);
        getRandomMessage(m);
    }

    if (message.content.toLowerCase().includes("!your mom")){
        message.channel.send("https://tenor.com/view/smtv-smt5-shin-megami-tensei-v-shin-megami-tensei5-smt-gif-22270369");
    }


//function to get a random message for links


//random number
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
})

//login to discord
client.login(process.env.token); 
