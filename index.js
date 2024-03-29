//prerequisites
require('dotenv').config();
const keepAlive = require(`./server`);
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')
const prefix = '!';
const talkedRecently = new Set();

const Roasts = require('./roast.json');
const Comebacks = require('./comeback.json');
const kevinquotes = require('./kevinquotes.json');
const Qkeys = Object.keys(kevinquotes);
const Rkeys = Object.keys(Roasts);
const Ckeys = Object.keys(Comebacks);

var TheQuote = "";
var roastOrComebackNumber;

// dont' work

let today = new Date();
var update;
function getUpdateTime() {
    return today.getHours() + `:` + today.getMinutes() + `:` + today.getSeconds(); //the day broke so only hours
}
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
    update = getUpdateTime();
    
});

//commands to look for
client.on('messageCreate', async message => {
    var mess = message.content.toLowerCase();
    //taken from stackoverflow, take notes???
    const args = mess.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

    if (mess === "!update" || mess === "!lastupdate"){
        message.channel.send(`Last update: ${update}`);
    }

    //if there are no arguments it will ask for them. If there are it will ping the user a specified number of times. Default ping number is 20
    if (mess.includes("!ping") && !message.author.bot){
        if (!args[1]){
            message.channel.send("Usage of !ping command: !ping [@persontoping] [number of pings]");
        }
        else{
            let ping = args[1];
            let numPings = 20;
            if (args[2]){
                numPings = args[2];
            }
            
            //limit ping number to be between 0 and 50 inclusive so people don't spam
            if (numPings > 50 ) { numPings = 50; }
            if (numPings < 0) { numPings = 0; }

            for (let i = 0; i < numPings; i++){
                message.channel.send(ping);
            }
            message.channel.send("Done Pinging!");
        }
    }
    if (mess.includes("ball")){
        message.channel.send("https://giphy.com/gifs/shiny-AxpvyWYDHuIH6");
    }
    if (mess === "!salad"){
        message.channel.send("burgers are better");
    }
    if (mess === "!ebot"){
        message.channel.send("What the fuck you calling me for?");
    }
    if (mess.includes("!e ")){
        if (talkedRecently.has(message.author.id)){
            message.reply("please wait 1 minute before using this command");
        }
        else if (args){
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
    else{
        message.channel.send("EEEEEEEEEEEEEEEEEEEEEEEEE");

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

    if (mess.includes("kevin") && !(message.author.id === client.user.id) && !(mess.includes("http://"))  && !(mess.includes("https://")) && !(mess.includes("!kevinquote"))){
        message.channel.send("https://gfycat.com/coarseneighboringhummingbird-kevin-what");
        // this commented code doesn't work, its supposed to join a voice call but I haven't figured out how to do that yet, this was an idea...
        /*joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })*/

        //another approach
        /*var channel_info = message.member.guild.voiceStates.cache.find(user => user.id == message.author.id);

        var vc = message.guild.channels.cache.find(channel => channel.id == channel_info.channel.ID);
        if (!vc){
        //    vc = guild.channels.cache.get('903033540747333644');
        }
        vc.join()
            .then(connection => {
                const dispatcher = connection.playFile('./yt1s.com - Home Alone 2 Kevins Not Here-[AudioTrimmer.com].mp3');
                dispatcher.on('end', end => vc.leave());
            })
            .catch(console.error);*/

    };
    if (mess.includes("http://") || mess.includes("https://") && !(message.author.id === client.user.id) && !mess.includes("https://giphy") && !mess.includes("https://tenor") && !mess.includes(".gif")){
        var m = getRandomIntInclusive(0, 4);
        getRandomMessage(m);
    }

    if (mess.includes("!yourmom")){
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

    //Roasts/Comeback stuff
    if (mess.includes("!roast") && !mess.includes("!roastnum")){
        var num = false;
        if (args[1]){
            try{
                num = true;
                var arg = parseInt(args[1]);
                if (arg >= Rkeys.length){ arg = Rkeys.length-1 }
                if (arg < 0){ arg = 0 }
                const Key = Rkeys[arg];
                var roast = Roasts[Key];
                roastOrComebackNumber = Rkeys[arg]; // stores the roast number in a variable
            }
            catch(e){ console.log(e) };
        }
        
        const randIndex = Math.floor(Math.random() * Rkeys.length); 
        const randKey = Rkeys[randIndex];
        var roast2 = Roasts[randKey];
        if (!args[1]){
            roastOrComebackNumber = randIndex + 1; // stores the roast number in a variable
        }
        
        if (num)
            message.channel.send("" + roast);
        else
            message.channel.send("" + roast2)
    }

    if (mess.includes("!addroast")){
        if (args[1]){
            var r = args[1];
            var l = Rkeys.length;
            var newRoast = { [""+l]:[r]};
            Roasts.push(newRoast);
            message.reply(`Added roast number ${l}`);
        }
        else{
            message.reply(`Incorrect ussage: Please provide a new roast`);
        }
    }



    if(mess.includes("!comeback") && !mess.includes("!comebacknum")){
        var num = false;
        var comeback = "";
        if (args[1]){
            try{
                num = true;
                var arg = parseInt(args[1]);
                if (arg >= Ckeys.length){ arg = Ckeys.length - 1 };
                if (arg < 0){ arg = 0 };
                const Key = Ckeys[arg];
                comeback = Comebacks[Key];
                roastOrComebackNumber = Ckeys[arg]; // stores the comeback number in a variable
            }
            catch(e) { console.log(e) };
        }
        
        const randIndex = Math.floor(Math.random() * Ckeys.length);
        const randKey = Ckeys[randIndex];
        const comeback2 = Comebacks[randKey];
        if (!args[1]) { roastOrComebackNumber = randKey; } // stores the comeback number in a variable, in if statement to not interfere with other statements
        
        if (num)
            message.channel.send("" +comeback);
        else
            message.channel.send("" +comeback2);
    }

    if (mess.includes("!addcomeback")) {
        if (args[1]){
            var c = args[1];
            var l = Ckeys.length;
            var newComeback = { [""+l] : [c]};
            Comebacks.push(newComeback);
            message.reply(`Added comeback number ${l}`);
        }
        else{
            message.reply(`Incorrect ussage: Please provide a new comeback`);
        }
    }

    if (mess === "!roastnumber" || mess === "!roastnum" || mess === "!comebacknumber" || mess === "!comebacknum"){ // tells the author of the message what the last roast or comeback number was
        if (roastOrComebackNumber != null && roastOrComebackNumber != undefined){
            message.reply(`Roast/Comeback number: ${roastOrComebackNumber - 1}`);
        }
        else{
            message.reply(`I don't know which roast/comeback you're talking about.`);
        }
    }
    if (mess === "-roast"){
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === '923283150573010964', {time: 10000});
        collector.on('collect',message => {
            if (message.author.id === '923283150573010964'){
                setTimeout(() => {
                    const keys = Object.keys(Comebacks);
                    const randIndex = Math.floor(Math.random() * keys.length);
                    const randKey = keys[randIndex];
                    const comeback = Comebacks[randKey];
                    message.reply(comeback);
                }, 1000);
            }
        });
    }
    
    //joe mama
    if (mess.includes('mama') && !mess.includes("tenor") && !message.bot){
        message.channel.send("https://tenor.com/view/joe-mama-gif-21567953"); //sends gif of joe mama, (ctrl+click ot see, this can be changed at any point, so if you find a better one please put it)
    }

    //message: !armstrong
    if (mess === '!armstrong'){
        message.channel.send(`Shut the fuck up! Its not funny anymore!`);
    }

    //message: !spam
    if (mess.includes("spam")){
        if (args[1]){
            var i = 10;
            var spamMess = args[1];
            if (args[2]){
                i = args[2];
            }
            if (args[3]){
                spamMess += " " + args[3];
            }
            
            if (i > 20) { i = 20; }
            if ( i < 0 ) { i = 0; }
            for (var j = 0; j < i; j++) {
                message.channel.send(spamMess);
            }
        }
        else { message.reply("This command was used incorrectly, correct format:\n!spam <@user> <number of times (opt)> <message (opt)>"); }
    }

    //kevin quote
    //TODO: This doesn't work, make it work
    if (mess.includes("!kevinquote")){
        var num = false;
        var quote = "";
        if (args[1]){
            try{
                num = true;
                var arg = parseInt(args[1]) - 1;
                if (arg >= Qkeys.length) { arg = Qkeys.length-1; }
                if (arg < 0) { arg = 0; } 
                const Key = Qkeys[arg];
                quote = kevinquotes[Key]
                TheQuote = Key;
            }
            catch(e){
                console.log(e);
            }
        }

        if (!num){
            const randIndex = Math.floor(Math.random() * Qkeys.length);
            const randKey = Qkeys[randIndex];
            quote = kevinquotes[randKey];
            TheQuote = randKey;
        }
        message.channel.send("" + quote); //the "" are added to ensure that the message is not emtpy
    }

    if (mess.includes("!quote")){
        message.reply(`Last Quote Number: ${TheQuote - 1}`);
        }

    if (mess.includes("!addquote")){
        if (args[1]){
            var q = args[1];
            var l = Qkeys.length
            var newQuote = { [""+l] : [q] };
            kevinquotes.push(newQuote);
            message.reply(`Added quote number ${l}`);
        }else{
            message.reply(`Incorrect ussage: Please provide a quote after the \"!addquote\" command`);
        }
    }

    if (mess.includes("fault") && message.author.id != '778274994430017546'){
        message.channel.send(`ITS GRACE MALTEZ\'S FAULT. YOU SHOULD KNOW THAT ${message.author}`);
    }

    /*daily message don't work
    var job1 = new cron.CronJob('12 00 00', message.channel.chache.get('922547657816277082').send("I have a boner (contributed gratefully by monsier alliamo)"));
    job1.start();
    //daily message test
    var job2 = new cron.CronJob('20 51 00', message.channel.cache.get('922547657816277082').send("It works!"));
    job2.start(); */
//random number
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    function makeString(num){
        var str = "";
        return str += num.toString();
    }
});

//login to discord
client.login(process.env.token); 
keepAlive();
