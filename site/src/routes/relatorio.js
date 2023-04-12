var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.get("/", function (req, res) {
    relatorioController.testar(req, res);
});

router.get("/listarRelatorio/:fkMaquina", function (req, res) {
    relatorioController.listarRelatorio(req, res);
});

router.get("/buscarDadosRelatorio/:idRelatorio", function (req, res) {
    relatorioController.buscarDadosRelatorio(req, res);
});

router.post("/cadastrarRelatorio", function (req, res) {
    relatorioController.cadastrarRelatorio(req, res);
})

router.put("/editarRelatorio/:idRelatorio", function (req, res) {
    relatorioController.editarRelatorio(req, res);
});



module.exports = router;