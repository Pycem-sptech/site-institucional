var express = require("express");
var router = express.Router();

var unidadeController = require("../controllers/unidadeController");

router.get("/listar/:fkEmpresa", function (req, res) {
    unidadeController.listar(req, res);
});

router.get("/listarUnidades/:fkEmpresa", function (req, res) {
    unidadeController.listarUnidades(req, res);
});

router.get("/listarDadosUnidade/:idUnidade", function (req, res) {
    unidadeController.listarDadosUnidade(req, res);
});

router.get("/listarTodasUnidades/:fkEmpresa/:idUnidade", function (req, res) {
    unidadeController.listarTodasUnidades(req, res);
});
router.get("/atualizarListaUnidades/:fkEmpresa", function (req, res) {
    unidadeController.atualizarListaUnidades(req, res);
});
router.get("/atualizarListaUnidadesFiltradas/:fkEmpresa/:nomeDigitado", function (req, res) {
    unidadeController.atualizarListaUnidadesFiltradas(req, res);
});

router.get("/verificarNumero/:numero", function (req, res) {
    unidadeController.verificarNumero(req, res);
});

router.get("/verificarTelefone/:telefone", function (req, res) {
    unidadeController.verificarTelefone(req, res);
});

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

router.get("/filtrarUnidades/:nomeDigitado/:fkEmpresa", function (req, res) {
    unidadeController.filtrarUnidades(req, res);
});

router.get("/filtrarTodasUnidades/:nomeDigitado/:fkEmpresa", function (req, res) {
    unidadeController.filtrarTodasUnidades(req, res);
});

router.get("/ocorrenciasPorMes/:fkEmpresa", function (req, res) {
    unidadeController.ocorrenciasPorMes(req, res);
});


module.exports = router;