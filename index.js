const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

// TOKEN fetched using @BotFather to create a new bot
const TOKEN = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
    const text = msg.text;

    console.log("Message received: ", text);

    bot.sendMessage(msg.chat.id, "You said: " + text);
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can I help you?");
});

bot.onText(/\/joke/, async (msg) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke');

    const setup = joke.data.setup;
    const punchline = joke.data.punchline;

    bot.sendMessage(msg.chat.id, setup + " " + punchline);
})