const _telegramAPI = require('node-telegram-bot-api');
const token = require('./config'); //Токен бота
const Controler = require('./Controler');

const bot = new _telegramAPI(token, {polling : true});

const controler = new Controler();

bot.on("message", async msg => {
    let userCode = msg.text;
    let msgFor = await controler.returnMSG(userCode);
    await bot.sendMessage(msg.chat.id, msgFor); 
});

