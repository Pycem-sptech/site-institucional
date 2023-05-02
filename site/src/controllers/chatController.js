var chatModel = require("../models/chatModel");

var sessoes = [];

function listar(req, res) {
    chatModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    listar
}