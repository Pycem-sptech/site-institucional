var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});
router.get("/listarFuncionarios/:fkEmpresa", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.get("/verificarCpf/:cpf", function (req, res) {
    usuarioController.verificarCpf(req, res);
});

router.get("/verificarEmail/:email", function (req, res) {
    usuarioController.verificarEmail(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
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



module.exports = router;