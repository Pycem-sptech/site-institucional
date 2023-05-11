var express = require("express");
var router = express.Router();

var chamadoController = require("../controllers/chamadoController");

router.get("/listar/:fkEmpresa", function (req, res) {
    chamadoController.listar(req, res);
});

router.post("/cadastrar/:fkEmpresa", function (req, res) {
    chamadoController.cadastrar(req, res);
})

router.put("/editar/:idChamado", function (req, res) {
    chamadoController.editar(req, res);
});

router.delete("/deletar/:idChamado", function (req, res) {
    chamadoController.deletar(req, res);
});

module.exports = router;