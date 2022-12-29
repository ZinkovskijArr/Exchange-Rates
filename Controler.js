const currencyCodes = require('currency-codes');// Код валюты в стандарте  ISO 4217
const MonoAPI = require('./MonoAPI');

class Controler {
    _data;
    #monoAPI;
    constructor()
    {
        this.#monoAPI = new MonoAPI();
    }
    async updateExchangeRates()
    {
        this._data = await this.#monoAPI.getDataFromAPI();
    }
    //Проверка тикера валюты
    checkTiket(tiker)
    {
        this._tiker = tiker;
        let currencyNumber = currencyCodes.code(tiker);
        //Код гривны 980, не может быть базвовой валютой
        if(currencyNumber && currencyNumber.number != 980)
        {
            currencyNumber = currencyNumber.number;
            return currencyNumber;
        }
        else {
            console.log("Currency code is not exist");
            return 0;
        }
    }
    //Формирование сообщение ответ, пользователю
    async returnMSG(tiker)
    {
        let msg = ''; 
        let currencyNumber = this.checkTiket(tiker);
        if(currencyNumber)
        {
            await this.updateExchangeRates();
            let chankOfAPI; 
            chankOfAPI = await this._data.data.find(cur => cur.currencyCodeA.toString() === currencyNumber);
            msg = `${tiker}/UAH\nBuy ${await chankOfAPI.rateBuy}\nSell ${await chankOfAPI.rateSell}`;
            return await msg;
        }
        else
        {
            return 'Press tiker';
        }

    }

}

module.exports = Controler;