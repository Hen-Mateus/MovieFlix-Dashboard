var Generos = require('../model/generos');
var sequelize = require('../model/database');
const controllers = {}
sequelize.sync()

controllers.generos_list = async (req, res) => {
    const data = await Generos.findAll({
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.generos_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Generos.findAll({
        where: { id: id }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.generos_create = async (req, res) => {
    // data
    const { id, descricao} = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await Generos.create({
        id: id,
        descricao: descricao,
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
        message: "Gênero criado com sucesso!",
        data: data
    });
    console.log('Dados salvos:', data);
}

controllers.generos_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { descricao} = req.body;
    // Update data
    const data = await Generos.update({
        descricao: descricao,
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

controllers.generos_delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Generos.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

module.exports = controllers;