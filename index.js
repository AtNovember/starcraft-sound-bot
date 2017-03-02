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

    // bot.sendMessage(chatId, 'Received your message');
    console.log('Received your message', msg.text);

    // random Voice:
      var index = Math.floor(Math.random() * (sounds.sounds.length - 0)) + 0;
      var randomVoice = sounds.sounds[index];
      // const buffer = fs.readFileSync(randomVoice);
      // if (!!buffer) {
      //   console.log('error in file ' + randomVoice, error);
      //   bot.sendMessage(chatId, randomVoice.toString());
      // } else {
      //   bot.sendVoice(chatId, buffer);
      // }

      try {
        var data = fs.readFileSync(randomVoice)
      } catch (err) {
        // If the type is not what you want, then just throw the error again.
        if (err.code !== 'ENOENT') throw err;
          bot.sendMessage(chatId, randomVoice.toString());
          console.log();
        // Handle a file-not-found error
      }
        bot.sendVoice(chatId, data);

    // for (let i = 0; i < sounds.sounds.length + 1; i++) {
    //     var bad = [];
    //     var testSound = sounds.sounds[i]
    //     var buffer = fs.readFileSync(testSound);
    //
    //     if (!buffer) {
    //         console.log('error in file', testSound);
    //         bad.push(testSound);
    //         fs.writeFile("sounds.log", bad, function(err) {
    //             if (err) {
    //                 return console.log(err);
    //             }
    //             console.log("The file was saved!");
    //         });
    //     }
    // }
});
