const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');
const bcrypt = require('bcrypt')

const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{ timestamps: true }
);

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
})

User.beforeBulkCreate(async (users) => {
    for(const user of users){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
    }
})

module.exports = User;