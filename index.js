//import discord.js
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')
const prefix = '!';
const talkedRecently = new Set();

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
    client.users.cache.get("504759739289305089").send("E bot updated!");
});

//commands to look for
client.on('messageCreate', async message => {
    var mess = message.content.toLowerCase();
    //taken from stackoverflow, take notes???
    const args = mess.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

    if (mess === "!ping"){
        message.channel.send("Hello!");
    }
    if (mess.includes("balls") || message.content.toLowerCase().includes("ball")){
        message.channel.send("https://giphy.com/gifs/shiny-AxpvyWYDHuIH6");
    }
    if (message === "!salad"){
        message.channel.send("burgers are better");
    }
    if (cmd === "!e" || mess.includes("!e") || mess.includes("!E")){
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

    if (mess.includes("kevin") && !(message.author.id === client.user.id) && !(mess.includes("http://"))  && !(mess.includes("https://"))){
        message.channel.send("https://gfycat.com/coarseneighboringhummingbird-kevin-what");
        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
    };
    if (mess.includes("http://") || mess.includes("https://") && !(message.author.id === client.user.id) && !mess.includes("https://giphy") && !mess.includes("https://tenor") && !mess.includes(".gif")){
        var m = getRandomIntInclusive(0, 4);
        getRandomMessage(m);
    }

    if (mess.includes("!your mom")){
        message.channel.send("https://tenor.com/view/smtv-smt5-shin-megami-tensei-v-shin-megami-tensei5-smt-gif-22270369");
    }

    if (message.content.toLowerCase() === "!give role pastryy" &&  message.author === client.users.cache.get("504759739289305089")){ //only I can use command, really op
        var role = member.guild.roles.cache.find(role => role.name === "Pastryy");
        member.roles.add(role);
        message.channel.send("Role given!");
    }
    else if (message.content.toLowerCase() === "!give role pastryy" && message.author.id !== client.id && message.author.id !== 504759739289305089){
        message.channel.send("Sorry, you are not allowed to use this command");
    }

    if (mess === "!story"){
        if (talkedRecently.has(message.author.id)){
            message.channel.send("Please wait 1 minute before using this command again");
        }
        else{
            message.channel.send("Once opun a tim der was a catus that wamted to go to plaay. De catus was hapy cuz it got to pla witttttttttttth a tele fon. The tele fpon got a cael one day and the catus got scard. The catus ran away cuz he got fritened and he became scard of everything. He transformd into a cat one day, and he got fownd by a person names chiara. Thes person nawamed the cat Loki cux he lookd loco. Loki is scard of everything to this da. Amd he likds pets.");
            talkedRecently.add(message.author.id);

            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 6000);
        }
    }

//random number
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
})

//login to discord
client.login(process.env.token); 
