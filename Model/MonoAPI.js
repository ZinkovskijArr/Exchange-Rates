const axsios = require('axios');

class MonoAPI
{
    #data;
    #time;
    #setDataFromAPI()
    {
        this.#time = new Date();
        console.log(this.#time);
        this.#data = axsios.get('https://api.monobank.ua/bank/currency')
        .then(res => res);
    }
    //Геттер данных с Моно, Инфа в Моно обновляется раз в 5 мин
    getDataFromAPI()
    {
        let firstCondition = typeof this.#time === 'undefined';
        if(firstCondition || (new Date().valueOf() - this.#time.valueOf()) > 300000)
            this.#setDataFromAPI();
        return this.#data;
    }
}

module.exports = MonoAPI;