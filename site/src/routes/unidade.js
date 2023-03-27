var express = require("express");
var router = express.Router();

var unidadeController = require("../controllers/unidadeController");

router.get("/", function (req, res) {
    unidadeController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    unidadeController.listar(req, res);
});

router.get("/listarUnidades/:fkEmpresa", function (req, res) {
    unidadeController.listarUnidades(req, res);
});

router.get("/verificarNumero/:numero", function (req, res) {
    unidadeController.verificarNumero(req, res);
});

router.get("/verificarTelefone/:telefone", function (req, res) {
    unidadeController.verificarTelefone(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de unidadeController.js
router.post("/cadastrar", function (req, res) {
    unidadeController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    unidadeController.entrar(req, res);
});

router.delete("/deletar/:idUnidade", function (req, res) {
    unidadeController.deletar(req, res);
});

router.put("/editar/:idUnidade", function (req, res) {
    unidadeController.editar(req, res);
});


module.exports = router;