const axsios = require('axios');

class MonoAPI
{
    static async getDataFromAPI()
    {
        return await axsios.get('https://api.monobank.ua/bank/currency');
        // .then(res => 
        // {
        //     console.log(res.data[0]);
        //     return res;
        // });
    }
}

module.exports = MonoAPI;