//import discord.js
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')
const prefix = '!';
const talkedRecently = new Set();

const json = require('./roast.json');
const json2 = require('./comeback.json');

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
    //client.users.cache.get("process.env.maffeo").send("E bot updated!");
    client.channels.cache.get("922547657816277082").send("E bot updated!");
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
    if (mess === "!salad"){
        message.channel.send("burgers are better");
    }
    if (mess.includes("!e")){
        if (talkedRecently.has(message.author.id)){
            message.reply("please wait 1 minute before using this command");
        }
        else{
            try{
                var e = "E";
                var arg = parseInt(args[1]);
                if (arg > 120) { arg = 120; }
                if (arg < 0) { arg = 0; }
                var send = e.repeat(arg);
                message.channel.send(send);
            } catch(e){ 
                message.channel.send("EEEEEEEEEEEEEEEEEEEEEEEEE");
                console.log(e);
            }

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 6000);
    }
        
    }
    if(mess === '!membercount'){
        message.channel.send(`There are ${message.guild.memberCount} members in this server, including bots`);
    }
    if(mess === '!randommember' || mess === '!rndmember'){
        if (talkedRecently.has(message.author.id) && message.author.id !== process.env.maffeo){ //checks if talkedRecently array has the messanger's id and that its not me. I get excluded for testing purposes. Any other collaborators can add their id's too
            message.reply("Please wait 1 minute before using this command again.");
        }
        else{
            var mCount = message.guild.memberCount; //gets the amount of members in the server
            const Guild = message.guild; //gets the server the message was sent in 
            const Members = Guild.members.cache.map(member => member.id); //makes a list of all users in the "guild" or server
            const rndUser = Members[getRandomIntInclusive(0,mCount)]; //picks a random user from the list
            message.channel.send(`Random user picked: ${client.users.cache.get(rndUser)}`); //sends the name of the random user picked

            talkedRecently.add(message.author.id);

            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 6000)
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
        // this commented code doesn't work, its supposed to join a voice call but I haven't figured out how to do that yet, this was an idea...
        /*joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })*/

        //another approach
        var channel_info = message.member.guild.voiceStates.cache.find(user => user.id == message.author.id);

        var vc = message.guild.channels.cache.find(channel => channel.id == channel_info.channel.ID);
        if (!vc){
        //    vc = guild.channels.cache.get('903033540747333644');
        }
        vc.join()
            .then(connection => {
                const dispatcher = connection.playFile('./yt1s.com - Home Alone 2 Kevins Not Here-[AudioTrimmer.com].mp3');
                dispatcher.on('end', end => vc.leave());
            })
            .catch(console.error);

    };
    if (mess.includes("http://") || mess.includes("https://") && !(message.author.id === client.user.id) && !mess.includes("https://giphy") && !mess.includes("https://tenor") && !mess.includes(".gif")){
        var m = getRandomIntInclusive(0, 4);
        getRandomMessage(m);
    }

    if (mess.includes("!your mom")){
        message.channel.send("https://tenor.com/view/smtv-smt5-shin-megami-tensei-v-shin-megami-tensei5-smt-gif-22270369");
    }

    if (message.content.toLowerCase() === "!give role pastryy" &&  message.author === client.users.cache.get(process.env.maffeo)){ //only I can use command, really op
        var role = message.guild.roles.cache.find(role => role.id === '785173527036690462');
        message.author.roles.add(role);
        message.channel.send("Role given!");
    }
    else if (message.content.toLowerCase() === "!give role pastryy" && message.author.id !== client.id && message.author.id !== process.env.maffeo){
        message.channel.send("Sorry, you are not allowed to use this command");
    }

    //sends the story only if the user id is not logged in talkedRecently: done to make sure that they don't spam this command 
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

    //JOAQUIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (mess === "joaquin" || mess === "joaquin!" || mess === "joaquine" || mess === "joaquine!" || mess === "!joaquin" || mess === "!joaquine"){
        const joaquin = 'https://media.giphy.com/media/t81fkadfyqX2kojUNJ/giphy.gif';
        message.channel.send(joaquin);
    }

    if (mess === "!roast"){
        const keys = Object.keys(json);
        const randIndex = Math.floor(Math.random() * keys.length);
        const randKey = keys[randIndex];
        var roast = json[randKey];
        message.channel.send(roast);
    }

    if(mess === "!comeback"){
        message.channel.send(getComback);
    }
    if (mess === "-roast"){
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === '923283150573010964', {time: 10000});
        collector.on('complete',message => {
            if (message.author.id === '923283150573010964'){
                message.channel.send(getComback);
            }
        });
    }

    function getComback(){
        const keys = Object.keys(json2);
        const randIndex = Math.floor(Math.random() * keys.length);
        const randKey = keys[randIndex];
        const comeback = json2[randKey];
        return comeback;
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
