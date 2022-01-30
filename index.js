require('dotenv').config();
const axios = require('axios');

const { Client, Intents, Message } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,    
]});

// Base URL for screenshot api website
const SCREENSHOT_BASE_URL = 'https://shot.screenshotapi.net/screenshot'

client.on('ready', () =>{
    console.log(`the new champion ${client.user.tag} has entered the arena of battle`);
});

client.on('messageCreate', async (mesasge) =>{
    
    // the user will need to send 'takeashot' along with the URL to call the bot
    if (mesasge.content.includes('takeashot'))
    {
        // remove 'takeashot' and empty paces
        var text = mesasge.content.toString().replace("takeashot","").trim();                
        
        // send the message with the url
        mesasge.reply(await getScreenShot(text));
    }
        
});


// get the image from the api
async function getScreenShot(url)
{
    // search parameters
    var data = {
        'token': process.env.SHOT_API_KEY,
        'url': url,
        'width': 1080,
        'height':720,
        'fresh': true,
        'output': "image",
        'file_type': "png",
        'wait_for_event': "load"
    };

    // return message which will contain the url
    let message = "...";

    // call the API and get the image
    await axios({
        method: 'get',
        url: SCREENSHOT_BASE_URL,
        params: data,
        headers: {'Content-Type': 'multipart/form-data'},
    })    
    .then((response) =>{
        console.log(response.request.res.responseUrl)
        console.log("It worked");        
        message = response.request.res.responseUrl.toString();      
    })
    .catch((error) =>{
        console.log(error);
        // sends a replacement image if something goes wrong
        message = "https://image.freepik.com/free-vector/comic-speech-bubble-with-oh-no-text_1308-54579.jpg";
    });     
    
    return message;
}


client.login(process.env.BOT_TOKEN);
