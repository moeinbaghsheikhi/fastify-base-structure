const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fastify_shop', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize