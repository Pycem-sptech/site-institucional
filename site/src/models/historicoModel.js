var database = require("../database/config")

function listar(idUnidade) {
    var instrucao = `select h.* from historico_totem h join totem t on fkTotem = idTotem join unidade on fkUnidade = idUnidade where idUnidade = '${idUnidade}' order by fkTotem;`;
    return database.executar(instrucao);
}

module.exports = {
    listar
};