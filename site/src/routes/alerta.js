var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listarAlertas/:fkEmpresa", function (req, res) {
    alertaController.listarAlertas(req, res);
});

router.put("/editarFrequenciaAtualizacao/:fkEmpresa", function (req, res) {
    alertaController.editarFrequenciaAtualizacao(req, res);
});

router.put("/editarProcessadorAlerta/:fkEmpresa", function (req, res) {
    alertaController.editarProcessadorAlerta(req, res);
});

router.put("/editarProcessadorAlertaCritico/:fkEmpresa", function (req, res) {
    alertaController.editarProcessadorAlertaCritico(req, res);
});

router.put("/editarRamAlerta/:fkEmpresa", function (req, res) {
    alertaController.editarRamAlerta(req, res);
});

router.put("/editarRamAlertaCritico/:fkEmpresa", function (req, res) {
    alertaController.editarRamAlertaCritico(req, res);
});

router.put("/editarHdAlerta/:fkEmpresa", function (req, res) {
    alertaController.editarHdAlerta(req, res);
});

router.put("/editarHdAlertaCritico/:fkEmpresa", function (req, res) {
    alertaController.editarHdAlertaCritico(req, res);
});

router.put("/padronizarTodosAlertas/:fkEmpresa", function (req, res) {
    alertaController.padronizarTodosAlertas(req, res);
});

router.put("/padronizarFrequenciaAtualizacao/:fkEmpresa", function (req, res) {
    alertaController.padronizarFrequenciaAtualizacao(req, res);
});

router.put("/padronizarProcessadorAlerta/:fkEmpresa", function (req, res) {
    alertaController.padronizarProcessadorAlerta(req, res);
});

router.put("/padronizarRamAlerta/:fkEmpresa", function (req, res) {
    alertaController.padronizarRamAlerta(req, res);
});

router.put("/padronizarHdAlerta/:fkEmpresa", function (req, res) {
    alertaController.padronizarHdAlerta(req, res);
});


module.exports = router;