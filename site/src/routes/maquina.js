var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function (req, res) {
    maquinaController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    maquinaController.listar(req, res);
});

router.get("/listarDadosMaquina/:idMaquina", function (req, res) {
    maquinaController.listarDadosMaquina(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.put("/editar/:idMaquina", function (req, res) {
    maquinaController.editar(req, res);
});

router.delete("/deletar/:idMaquina", function (req, res) {
    maquinaController.deletarRegistroMaquina(req, res);
});

module.exports = router;