var database = require("../database/config");

function listarRelatorio(fkMaquina) {
  console.log(fkMaquina)
  var instrucao = `select * from relatorio join totem on idTotem = fkTotem where fkTotem = ${fkMaquina};`;
  return database.executar(instrucao);
}

function buscarDadosRelatorio(idRelatorio) {
  var instrucao = `select convert(varchar, data_relatorio,  5) as dataRelatorio, titulo, descricao, tipo from relatorio where idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}

function cadastrarRelatorio(titulo, tipo, descricao, data, fkMaquina) {
  var instrucao = `INSERT INTO relatorio (titulo, tipo, descricao, data_relatorio, fkTotem) VALUES ( '${titulo}', '${tipo}', '${descricao}', '${data}', '${fkMaquina}');`;
  return database.executar(instrucao);
}

function editarRelatorio(titulo, tipo, descricao, data, idRelatorio) {
  var instrucao = `UPDATE relatorio SET titulo = '${titulo}', tipo = '${tipo}', descricao = '${descricao}', data_relatorio = '${data}' WHERE idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}


module.exports = {
  buscarDadosRelatorio,
  cadastrarRelatorio,
  editarRelatorio,
  listarRelatorio
};
