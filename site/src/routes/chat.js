var express = require("express");
var router = express.Router();

var chatController = require("../controllers/chatController");

router.get("/listarchat/:idUnidade", function (req, res) {
    chatController.listarchat(req, res);
});

module.exports = router;