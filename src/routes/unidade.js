var express = require("express");
var router = express.Router();

var unidadeController = require("../controllers/unidadeController");

router.get("/", function (req, res) {
    unidadeController.testar(req, res);
});

router.get("/listar", function (req, res) {
    unidadeController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de unidadeController.js
router.post("/cadastrar", function (req, res) {
    unidadeController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    unidadeController.entrar(req, res);
});

module.exports = router;