var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listar/:fkEmpresa/:fkUnidade", function (req, res) {
    maquinaController.listar(req, res);
});
router.get("/listarStatusTotem/:fkEmpresa", function (req, res) {
    maquinaController.listarStatusTotem(req, res);
});
router.get("/listarMaquinas/:fkEmpresa", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});

router.get("/listarDadosMaquina/:idMaquina", function (req, res) {
    maquinaController.listarDadosMaquina(req, res);
});

router.get("/listarStatusMaqEmTempoReal/:fkUnidade", function (req, res) {
    maquinaController.listarStatusMaqEmTempoReal(req, res);
});

router.get("/filtrarMaquinas/:nomeDigitado", function (req, res) {
    maquinaController.filtrarMaquinas(req, res);
});

router.get("/listarUsoMaquina/:fkTotem", function (req, res) {
    maquinaController.listarUsoMaquina(req, res);
});

router.get("/listarUltimosDados/:fkTotem", function (req, res) {
    maquinaController.listarUltimosDados(req, res);
});

router.get("/listarTodasMaquinas/:fkEmpresa/:idUnidade", function (req, res) {
    maquinaController.listarTodasMaquinas(req, res);
});

router.get("/atualizarListaMaquinasFiltradas/:fkEmpresa/:nomeDigitado", function (req, res) {
    maquinaController.atualizarListaMaquinasFiltradas(req, res);
});

router.get("/atualizarListaMaquinas/:fkEmpresa", function (req, res) {
    maquinaController.atualizarListaMaquinas(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})


router.put("/editar/:idMaquina", function (req, res) {
    maquinaController.editar(req, res);
});
router.put("/atualizarStatusMaquina/:idMaquina", function (req, res) {
    maquinaController.atualizarStatusMaquina(req, res);
});

router.delete("/deletar/:idMaquina", function (req, res) {
    maquinaController.deletarRegistroMaquina(req, res);
});

module.exports = router;