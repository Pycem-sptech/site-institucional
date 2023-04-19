var database = require("../database/config");

function listarRelatorio(idUnidade) {
  var instrucao = `select idRelatorio, titulo, descricao, data_relatorio from relatorio join totem on idTotem = fkTotem join unidade on idUnidade = fkUnidade where idUnidade = ${idUnidade};`;
  return database.executar(instrucao);
}

function buscarDadosRelatorio(idRelatorio) {
  var instrucao = `select data_relatorio as dataRelatorio, titulo, descricao, tipo, fkTotem from relatorio where idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}

function cadastrarRelatorio(titulo, tipo, descricao, data, fkMaquina) {
  var instrucao = `INSERT INTO relatorio (titulo, tipo, descricao, data_relatorio, fkTotem) VALUES ( '${titulo}', '${tipo}', '${descricao}', '${data}', '${fkMaquina}');`;
  return database.executar(instrucao);
}

function editarRelatorio(titulo, tipo, descricao, data, idRelatorio, fkMaquina) {
  var instrucao = `UPDATE relatorio SET titulo = '${titulo}', tipo = '${tipo}', descricao = '${descricao}', data_relatorio = '${data}', fkTotem = '${fkMaquina}' WHERE idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}


module.exports = {
  buscarDadosRelatorio,
  cadastrarRelatorio,
  editarRelatorio,
  listarRelatorio
};