const currencyCodes = require('currency-codes');// Код валюты в стандарте  ISO 4217
const MonoAPI = require('../Model/MonoAPI');
const { insert, select, sequelize } = require('../Model/bd');

class Controler {
    _data;
    #monoAPI;
    constructor() {
        this.#monoAPI = new MonoAPI();
    }
    async updateExchangeRates() {
        this._data = await this.#monoAPI.getDataFromAPI();
    }
    //Проверка тикера валюты
    checkTiket(tiker) {
        this._tiker = tiker;
        let currencyNumber = currencyCodes.code(tiker);
        //Код гривны 980, не может быть базвовой валютой
        if (currencyNumber && currencyNumber.number != 980) {
            currencyNumber = currencyNumber.number;
            return currencyNumber;
        }
        else {
            console.log("Currency code is not exist");
            return 0;
        }
    }
    //Формирование сообщение при просмотре курса валюты
    async returnMSG(tiker) {
        let msg = '';
        let chankOfAPI = await this.getChankOfAPIData(tiker);
        console.log("Dsfdfdsgfdgmdfklmgdf.kgdf");
        console.log(chankOfAPI);
        if (typeof chankOfAPI === 'string')
            return chankOfAPI;
        else if (chankOfAPI) {
            if (chankOfAPI.rateBuy == 0 || chankOfAPI.rateSell == 0)
                return "This currency is temporarily not traded on the market";
            msg = `${tiker}/UAH\nBuy ${await chankOfAPI.rateBuy}\nSell ${await chankOfAPI.rateSell}`;
            return await msg;
        }
        else {
            return 'Press tiker';
        }

    }
    //Получение объекта выбраной валюты
    async getChankOfAPIData(tiker) {
        let currencyNumber = this.checkTiket(tiker);
        if (currencyNumber) {
            await this.updateExchangeRates();
            let chankOfAPI;
            chankOfAPI = await this._data.data.find(cur => cur.currencyCodeA.toString() === currencyNumber);
            if (chankOfAPI.rateBuy == 0 || chankOfAPI.rateSell == 0)
                return "This currency is temporarily not traded on the market";
            return await chankOfAPI;
        }
        else
            return 'Incorrect tiker';
    }
    //Получение текста для конвертации
    async getConversionMSG(tiker, amount, rate) {
        let chank = await this.getChankOfAPIData(tiker);
        let result;
        let opion;
        if (typeof chank === 'string')
            return chank;
        else if (rate)// 0 - Buy
        {
            result = amount * chank.rateBuy;
            opion = "Buy";
        }
        else {
            result = amount * chank.rateSell;
            opion = "Sell";
        }
        result = result.toFixed(2);
        result = `We'll ${opion} ${tiker} for ${result} UAH`;
        return result;
    }

    async connection() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await User.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async checkDataInBD(user) {
        let data = await select();
        for (let i = 0; i < data.length; i++) {
            if (user.id === data[i].id) return 0;
        }
        await insert(user);
    }

}

module.exports = Controler;