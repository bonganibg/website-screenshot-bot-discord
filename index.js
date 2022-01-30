require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,    
]});

client.on('ready', () =>{
    console.log(`the new champion ${client.user.tag} has entered the arena of battle`);
});

client.on('messageCreate', (mesasge) =>{
    if (mesasge.content == "something")
        mesasge.reply("I got you")
});

client.login(process.env.BOT_TOKEN);
