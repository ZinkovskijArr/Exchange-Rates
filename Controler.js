const currencyCodes = require('currency-codes');// Код валюты в стандарте  ISO 4217
const MonoAPI = require('./MonoAPI');

class Controler {
    _data;
    async updateExchangeRates()
    {
        this._data = await MonoAPI.getDataFromAPI();
    }

    checkTiket(tiker)
    {
        this._tiker = tiker;
        let currencyNumber = currencyCodes.code(tiker);
        if(currencyCodes.code(tiker))
        {
            currencyNumber = currencyNumber.number;
            console.log('Controler tiker');
            console.log(currencyNumber);
            return currencyNumber;
        }
        else {
            console.log("Currency code is not exist");
            return 0;
        }
    }

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