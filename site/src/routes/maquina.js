var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function (req, res) {
    maquinaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    maquinaController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.put("/editar/:idMaquina", function (req, res) {
    maquinaController.editar(req, res);
});

router.delete("/deletar/:idMaquina", function (req, res) {
    maquinaController.deletar(req, res);
});

module.exports = router;