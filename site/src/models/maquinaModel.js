var database = require("../database/config");

function listar(fkEmpresa) {
  var instrucao = `select unidade.nome as nomeUnidade, totem.numeroSerie as numeroSerie, totem.idTotem, totem.estado as status from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function listarDadosMaquina(idMaquina) {
  var instrucao = `select * from totem where idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}

function filtrarMaquinas(nomeDigitado) {
  var instrucao = `select t.idTotem as idTotem, u.nome as nomeUnidade, t.numeroSerie as numeroSerie from totem t join unidade u on fkUnidade = idUnidade where t.numeroSerie like '${nomeDigitado}%';`;
  return database.executar(instrucao);
}

function cadastrarMaquina(nome, numeroSerial, processador, ram, qtdArmazenamento, storageSelect) {
  var instrucao = `INSERT INTO totem (numeroSerie, processador, ram, qtdArmazenamento, armazenamento, fkUnidade) VALUES ( '${numeroSerial}', '${processador}', '${ram}', '${qtdArmazenamento}', '${storageSelect}','${nome}');`;
  return database.executar(instrucao);
}

function editar(numeroSerial, processador, ram, qtdArmazenamento, storageSelect, idMaquina) {
  var instrucao = `UPDATE totem SET numeroSerie = '${numeroSerial}', processador = '${processador}', ram = '${ram}', qtdArmazenamento = '${qtdArmazenamento}', armazenamento = '${storageSelect}' WHERE idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}

function deletarRegistroMaquina(idMaquina) {
  var instrucao = `DELETE FROM totem WHERE idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarDadosMaquina,
  cadastrarMaquina,
  editar,
  deletarRegistroMaquina,
  filtrarMaquinas
};
