const _telegramAPI = require('node-telegram-bot-api');
const token = require('./config'); //Токен бота
const Controler = require('./Controler/Controler');
const Button = require('./View/Button');

const bot = new _telegramAPI(token, { polling: true });

const controler = new Controler();
let rate = 0; //Для отображения курса валют
let selectedCurrency = -1;//Для отслеживания выбраной валюты конвертации
const _menuText = 'You can see the exchange rate\nor convert to hryvnia';

let tiker = '';

bot.on("message", async msg => {
  let parseNam = !Number.isNaN(Number.parseFloat(msg.text));

  if (msg.text == '/start') {
    await bot.sendMessage(msg.chat.id, _menuText, Button.mainMenuBtn);
    //await controler.connection();
    await controler.checkDataInBD({id: msg.from.id, first_name: msg.from.first_name,username: msg.from.username});
  }
  //true если это такер валюты
  else if (selectedCurrency != -1 && !parseNam) {
    tiker = msg.text;
    bot.sendMessage(msg.chat.id, 'Enter amount');
  }
  //true если это кол-во валюты
  else if ((selectedCurrency != -1) && parseNam) {
    let result = await controler.getConversionMSG(tiker, msg.text, selectedCurrency);
    await bot.sendMessage(msg.chat.id, result, Button.menu);
    selectedCurrency = -1;
  }
  else if (rate) {
    let userCode = msg.text;
    let msgFor = await controler.returnMSG(userCode);
    await bot.sendMessage(msg.chat.id, msgFor, Button.menu);
    rate = false;
  }
  else await bot.sendMessage(msg.chat.id, "Try again\n" + _menuText, Button.menu);
});

bot.on("callback_query", async msg => {
  const chatID = msg.message.chat.id;
  switch (msg.data) {
    case "exchange_rates":
      bot.sendMessage(chatID, 'Enter currency\nFor example USD');
      rate = 1;
      break;
    case "conversion":
      convert = true;
      bot.sendMessage(chatID, 'Select rate', Button.sellBuy);
      break;
    case "menu":
      selectedCurrency = -1;
      bot.sendMessage(chatID, _menuText, Button.mainMenuBtn);
      break;
    case "sell":
      selectedCurrency = 1;
      bot.sendMessage(chatID, "Enter currency\nFor example USD");
      break;
    case "buy":
      selectedCurrency = 0;
      bot.sendMessage(chatID, "Enter currency\nFor example USD");
      break;
  }
})

