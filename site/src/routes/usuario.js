var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/filtrarFuncionarios/:nomeDigitado/:fkEmpresa", function (req, res) {
    usuarioController.filtrarFuncionarios(req, res);
});

router.get("/listarFuncionarios/:fkEmpresa", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.get("/listarTecnicos/:fkEmpresa", function (req, res) {
    usuarioController.listarTecnicos(req, res);
});
router.get("/listarChamadosUsuario/:idUsuario", function (req, res) {
    usuarioController.listarChamadosUsuario(req, res);
});

router.get("/verificarCpf/:cpf", function (req, res) {
    usuarioController.verificarCpf(req, res);
});

router.get("/verificarEmail/:email", function (req, res) {
    usuarioController.verificarEmail(req, res);
});

router.get("/listarDadosFuncionario/:idFuncionario", function (req, res) {
    usuarioController.listarDadosFuncionario(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/editar/:idFuncionario", function (req, res) {
    usuarioController.editarFuncinario(req, res);
});

router.delete("/deletar/:idFuncionario", function (req, res) {
    usuarioController.deletar(req, res);
});

module.exports = router;