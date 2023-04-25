var historicoModel = require("../models/historicoModel");

var sessoes = [];

function listar(req, res) {
    var idUnidade = req.params.idUnidade;
    historicoModel.listar(idUnidade).then(function (resultado) {
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