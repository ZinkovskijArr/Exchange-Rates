class Button {
    static mainMenuBtn = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Exchange Rates', callback_data: 'exchange_rates' },
                { text: 'Conversion', callback_data: 'conversion' }],
                [{ text: 'Menu', callback_data: 'menu' }]
            ]
        })
    };

    static sellBuy = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Sell', callback_data: 'sell' },
                { text: 'Buy', callback_data: 'buy' }],
                [{ text: 'Menu', callback_data: 'menu' }]
            ]
        })
    };
    static menu = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Menu', callback_data: 'menu' }]
            ]
        })
    };
}
module.exports = Button;