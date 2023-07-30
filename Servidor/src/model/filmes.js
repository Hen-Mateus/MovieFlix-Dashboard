var Sequelize = require('sequelize');
var sequelize = require('./database');

var Generos = require('./generos');
var Filmes = sequelize.define('filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: Sequelize.STRING,
    titulo: Sequelize.STRING,
    foto: Sequelize.STRING,
    generoId: {
        type: Sequelize.INTEGER,
        references: {
            model: Generos,
            key: 'id'
        }
    }
},
    {
        timestamps: false,
    });

Filmes.belongsTo(Generos);
Generos.hasMany(Filmes);
module.exports = Filmes