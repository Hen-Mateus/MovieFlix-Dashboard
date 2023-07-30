var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'ai2', //BD
    'postgres',//user
    'henrique77',//password
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);
module.exports = sequelize;