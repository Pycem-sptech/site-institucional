var database = require("../database/config");

function listarRelatorio(idUnidade) {
  var instrucao = `select idRelatorio, titulo, descricao, tipo, FORMAT(data_relatorio,'%d/%M/20%y') as data_relatorio from relatorio join totem on idTotem = fkTotem join unidade on idUnidade = fkUnidade where idUnidade = ${idUnidade};`;
  return database.executar(instrucao);
}

function listarRelatoriosTotem(idTotem) {
  var instrucao = `select idRelatorio, titulo, descricao, FORMAT(data_relatorio,'%d/%M/20%y') as data_relatorio from relatorio join totem on idTotem = fkTotem where idTotem = ${idTotem} order by data_relatorio desc;`;
  return database.executar(instrucao);
}

function filtrarRelatorios(idTotem, nomeDigitado) {
  var instrucao = `select idRelatorio, titulo, descricao, FORMAT(data_relatorio,'%d/%M/20%y') as data_relatorio from relatorio join totem on idTotem = fkTotem where idTotem = ${idTotem} and titulo like '${nomeDigitado}%' order by  data_relatorio;`;
  return database.executar(instrucao);
}


function buscarDadosRelatorio(idRelatorio) {
  var instrucao = `select FORMAT(data_relatorio,'%d/%M/20%y') as dataRelatorio, titulo, descricao, tipo, fkTotem from relatorio where idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}

function cadastrarRelatorio(titulo, tipo, descricao, data, fkMaquina) {
  var instrucao = `INSERT INTO relatorio (titulo, tipo, descricao, data_relatorio, fkTotem) VALUES ( '${titulo}', '${tipo}', '${descricao}', '${data}' , '${fkMaquina}');`;
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
  listarRelatorio,
  listarRelatoriosTotem,
  filtrarRelatorios
};
