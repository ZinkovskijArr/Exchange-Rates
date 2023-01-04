const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('TG_Bot', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

//Модель таблици User
const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
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
        const data = await User.create({ id: user.id, first_name: user.first_name, username : user.username });
    } catch (error) {
        console.error(error);
    }
    //await sequelize.close()
}

async function select() {
    try {
        const data = await User.findAll();
        //console.log(JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    //await sequelize.close()
}


module.exports = {insert, select, sequelize};
