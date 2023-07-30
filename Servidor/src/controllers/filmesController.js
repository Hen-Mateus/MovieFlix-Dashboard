var Filmes = require('../model/filmes');
var Generos = require('../model/generos');
var sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

controllers.filme_list = async (req, res) => {
    const data = await Filmes.findAll({
        include: [Generos]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.filme_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Filmes.findAll({
        where: { id: id },
        include: [Generos]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.filme_create = async (req, res) => {
    // data
    const { id, descricao, titulo, foto, generoId } = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await Filmes.create({
        id: id,
        descricao: descricao,
        titulo: titulo,
        foto: foto,
        generoId: generoId
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        })
    // return res
    res.status(200).json({
        success: true,
        message: "Registado",
        data: data
    });
    console.log('Dados salvos:', data);
}

controllers.filme_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { descricao, titulo, foto, generoId } = req.body;
    // Update data
    const data = await Filmes.update({
        descricao: descricao,
        titulo: titulo,
        foto: foto,
        generoId: generoId
    },
        {
            where: { id: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Updated successful" });
}

controllers.filme_delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Filmes.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

module.exports = controllers;