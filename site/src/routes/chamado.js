var express = require("express");
var router = express.Router();

var chamadoController = require("../controllers/chamadoController");

router.get("/listarChamado/:fkEmpresa", function (req, res) {
    chamadoController.listar(req, res);
});

router.get("/listarChamadoFiltrado/:fkUsuario", function (req, res) {
    chamadoController.listar(req, res);
});

router.post("/cadastrarChamado/", function (req, res) {
    chamadoController.cadastrar(req, res);
})

router.put("/editarChamado/:idChamado", function (req, res) {
    chamadoController.editar(req, res);
});

router.delete("/deletarChamado/:idChamado", function (req, res) {
    chamadoController.deletar(req, res);
});

module.exports = router;