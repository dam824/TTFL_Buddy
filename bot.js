require('dotenv').config();

const TelegramBot = require("node-telegram-bot-api");

//token du bot
const token = process.env.TELEGRAM_TOKEN;

//Creation instance bot
const bot = new TelegramBot(token, { polling: true });

//function rappel pick
function sendReminder(chatId) {
  bot.sendMessage(
    chatId,
    "N'oubliez pas de pick votre joueur au risque de la carotte 🥕!"
  );
}

//demarer le rappel quotidien
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  //Welcom message
  bot.sendMessage(
    chatId,
    "Bonjour, je vous rappelerai chaques jours de faire votre pick TTFL afin d'éviter la 🥕 "
  );

  //configuration rappel quotidien
  const interval = setInterval(() => {
    const now = new Date();

    //configuration du rappel 12h et 18h
    if (
      (now.getHours() === 12 || now.getHours() === 18) &&
      now.getMinutes() === 0
    ) {
      sendReminder(chatId);
    }
  }, 60000 );

});
