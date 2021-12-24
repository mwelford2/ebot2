//import discord.js
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')
const prefix = '!';
const talkedRecently = new Set();

const json = '{     "1": "You are what happens when women drink during pregnancy.",     "2": "When I look at you, I wish I could meet you again for the first time… and walk past.",     "3": "You are the sun in my life… now get 93 million miles away from me.",     "4": "You have such a beautiful face… But let’s put a bag over that personality.",     "5": "There is someone out there for everyone. For you, it’s a therapist.",     "6": "I would smack you, but I’m against animal abuse.",     "7": "If I wanted to kill myself, I would simply jump from your ego to your IQ.",     "8": "I can’t wait to spend my whole life without you.",     "9": "Whoever told you to be yourself, gave you a bad advice.",     "10": "I didn’t mean to offend you… but it was a huge plus.",     "11": "I don’t hate you, but if you were drowning, I would give you a high five.",     "12": "If I throw a stick, will you leave me too?",     "13": "Sorry I can’t think of an insult dumb enough for you to understand.",     "14": "I don’t know what makes you so stupid, but it works.",     "15": "Whatever doesn’t kill you, disappoints me.",     "16": "It is hilarious how you are trying to fit your entire vocabulary into one sentence.",     "17": "I like the way you comb your hair, so horns don’t show up.",     "18": "Have a nice day… somewhere else.",     "19": "I would call you an idiot, but it would be an insult for stupid people.",     "20": "I told my therapist about you; she didn’t believe me.",     "21": "Did you know your incubator had tinted windows? That explains a lot.",     "22": "The last time I saw something like you, it was behind metal grids.",     "23": "If I had a dollar every time you shut up, I would give it back as a thank you.",     "24": "You were so happy for the negativity of your Covid test, we didn’t want to spoil the happiness by telling you it was IQ test.",     "25": "Honey, only thing bothering me is placed between your ears.",     "26": "Only thing that is pleasing about our relationship is that you are no longer in it.",     "27": "Every time I have a stick in my hand, you look like a pinata.",     "28": "You are like a software update. every time I see you, I immediately think “not now”.",     "29": "When I look at you, I think to myself where have you been my whole life? Can you go back there?",     "30": "You are the reason why there are instructions on shampoo bottles.",     "31": "I think you just need a high five… in the face… with a chair.",     "32": "When I listen to you, I think you really going to go far. I hope you stay there.",     "33": "I look at you and think what a waste of two billion years of the evolution.",     "34": "It would be a great day If you used a glue stick instead of Chapstick.",     "35": "Yes, I’m fully vaccinated, but I will still not hang out with you.",     "36": "When I see you coming, I get pre annoyed. I’m just giving myself a head start.",     "37": "You are the reason why God is not talking to us anymore.",     "38": "You can’t imagine how much happiness you can bring… by leaving the room.",     "39": "I know you don’t like me, that says a lot. You need to acquire a better taste.",     "40": "It’s all about balance… you start talking, I stop listening.",     "41": "Are you talking to me? I thought you only talk behind my back.",     "42": "I’m sorry… did my back hurt your knife?",     "43": "Everyone is allowed to act stupid once, but you… you are abusing that privilege.",     "44": "Cry me a river, then drown yourself in it.",     "45": "Ola soy Dora. Can you help me find where we asked?",     "46": "Somewhere tree is producing oxygen for you. I’m sorry for it.",     "47": "Earth is full. Go home.",     "48": "Everyone has purpose in this life, yours is to become an organ donor.",     "49": "I am jealous of people who didn’t meet you.",     "50": "Why are you rolling your eyes? Are you looking for your brain?",     "51": "You didn’t change since last time I saw you. You should.",     "52": "What is wrong with you? Have you had too many drugs in mental hospital today?",     "53": "It is better to shut your mouth and make people think you are stupid than open it and remove all doubt.",     "54": "Hurting you is the least thing I want to do… but it’s still in the list.",     "55": "Oh, sorry, did the middle of my sentence interrupted the beginning of yours?",     "56": "Let me tell you. If I don’t answer you the first time, what makes you think the next 25 will work?",     "57": "I am not ignoring you; I am just giving you a time to understand what you just said.",     "58": "Every time I think you can’t get any dumber, you are proving me wrong.",     "59": "Where is your off button?"   } '

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
        const roasts = JSON.parse(json);
        var randnum = getRandomIntInclusive(1,59);
        var obj = roasts.randnum;
        message.channel.send(obj);
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
