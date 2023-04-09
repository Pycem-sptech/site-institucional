var express = require("express");
var router = express.Router();

// var relatorioController = require("../controllers/relatorioController");

router.get("/", function (req, res) {
    relatorioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    relatorioController.listar(req, res);
});

router.get("/buscarDadosRelatorio", function (req, res) {
    relatorioController.buscarDadosRelatorio(req, res);
});

router.get("/verificarCnpj/:cnpj", function (req, res) {
    relatorioController.verificarCnpj(req, res);
});

router.get("/verificarEmail/:email", function (req, res) {
    relatorioController.verificarEmail(req, res);
});

router.post("/cadastrar", function (req, res) {
    relatorioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    relatorioController.entrar(req, res);
});

module.exports = router;