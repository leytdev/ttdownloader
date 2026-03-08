var Telegram = require('node-telegram-bot-api');
var request = require("request");
var token = '7630050543:AAFyaGdyDimEcXU1JyjIBGx3V8cmiTNhhTc';


var opt = {
  polling: true
};

var bot = new Telegram(token, opt);


bot.on("message", function (msg) {
  var text = msg.text;

  if (text == '/start') {

    bot.sendMessage(msg.chat.id, "Привет! Я твой помощник по скачиванию видео из TikTok без водяного знака.");


    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(500).then(() => bot.sendMessage(msg.chat.id, "Пожалуйста, пришлите ссылку на видео."));
  } else if (text.includes('tiktok.com')) {

    bot.sendMessage(msg.chat.id, "Жди...");


    var reqvideourl = "https://www.tikwm.com/api/?url=" + text + "&hd=1";
    request(reqvideourl, function (error, response, body) {
      var json = JSON.parse(body);


      if (json.data == undefined) {
        bot.sendMessage(msg.chat.id, "Извините, я не могу скачать это видео прямо сейчас. Пожалуйста, попробуйте позже.");
      } else {

        function delay(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }

        delay(500).then(() => bot.sendVideo(msg.chat.id, json.data.hdplay));
      }
    });
  } else {

    bot.sendMessage(msg.chat.id, "Пожалуйста, пришлите действительную ссылку на видео");
  }
});