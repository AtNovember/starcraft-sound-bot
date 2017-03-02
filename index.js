const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const token = '344155317:AAGKB6zS-mJ31WQi1roHSv-EPYgaG2ZRIdo';
const bot = new TelegramBot(token, {polling: true});
const sounds = require('./sound.js');

// бот реагирует на команду /echo
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  console.log('resp', resp);
  bot.sendMessage(chatId, resp);
});

// бот реагирует на сообщение
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
  console.log('Received your message', msg.text);

    var index = Math.floor(Math.random() * (sounds.sounds.length - 0)) + 0;
    var randomVoice = sounds.sounds[index];

    const buffer = fs.readFileSync(randomVoice);
    bot.sendVoice(chatId, buffer);
});
