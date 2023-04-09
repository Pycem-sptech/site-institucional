var database = require("../database/config");


function buscarDadosRelatorio(idRelatorio) {
  var instrucao = `select * from relatorio where idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}

function cadastrarRelatorio(titulo, tipo, descricao, data, fkMaquina) {
  var instrucao = `INSERT INTO relatorio (titulo, tipo, descricao, data, fkMaquina) VALUES ( '${titulo}', '${tipo}', '${descricao}', '${data}', ${fkMaquina});`;
  return database.executar(instrucao);
}

function editarRelatorio(titulo, tipo, descricao, data, idRelatorio) {
  var instrucao = `UPDATE relatorio SET titulo = '${titulo}', tipo = '${tipo}', descricao = '${descricao}', data = '${data}' WHERE idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}


module.exports = {
  buscarDadosRelatorio,
  cadastrarRelatorio,
  editarRelatorio,
};
