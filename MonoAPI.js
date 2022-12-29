const axsios = require('axios');

class MonoAPI
{
    #data;
    #time;
    async #setDataFromAPI()
    {
        this.#time = new Date();
        console.log(this.#time);
        this.#data = await axsios.get('https://api.monobank.ua/bank/currency');
    }
    //Геттер данных с Моно, Инфа в Моно обновляется раз в 5 мин
    async getDataFromAPI()
    {
        let firstCondition = typeof this.#time === 'undefined';
        if(firstCondition || (new Date().valueOf() - this.#time.valueOf()) > 300000)
            await this.#setDataFromAPI();
        return await this.#data;
    }
}

module.exports = MonoAPI;