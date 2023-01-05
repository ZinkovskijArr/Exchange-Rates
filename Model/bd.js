const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('TG_Bot', 'postgres', 'root', {
    host: 'localhost',
    dialect: "postgres"
});

//Модель таблици User
const User = sequelize.define('Users', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    }
},
    {
        timestamps: false
    });


async function insert(user) {
    try {
        const data = await User.create({ id: user.id, first_name: user.first_name, username: user.username });
    } catch (error) {
        console.error(error);
    }
}
//возращает только id клиента
async function selectID() {
    try {
        const data = await User.findAll({
            attributes: ['id'],
          },{raw:true});
        return data;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = { insert, selectID, sequelize };
