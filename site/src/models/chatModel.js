var database = require("../database/config")

function listar() {
    var instrucao = `select * from chat;`;
    return database.executar(instrucao);
}

module.exports = {
    listar,
};