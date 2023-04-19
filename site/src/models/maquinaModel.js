var database = require("../database/config");

function listar(fkEmpresa, fkUnidade) {
  var instrucao = `select unidade.nome as nomeUnidade, totem.idTotem, totem.numeroSerie as numeroSerie, totem.estado as status from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = '${fkEmpresa}' and unidade.idUnidade = '${fkUnidade}';`;
  return database.executar(instrucao);
}

function listarMaquinas(fkEmpresa) {
  var instrucao = `select unidade.nome as nomeUnidade, totem.idTotem, totem.numeroSerie as numeroSerie, totem.idTotem from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}

function listarDadosMaquina(idMaquina) {
  var instrucao = `select * from totem where idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}
function listarStatusMaqEmTempoReal(fkUnidade) {
  var instrucao = `select count(idTotem) as totalMaquinas,
      (select count(estado) from totem where estado = 'Disponivel' and fkUnidade = '${fkUnidade}') as Disponivel,
      (select count(estado) from totem where estado = 'Manutencao' and fkUnidade = '${fkUnidade}') as Manutencao,
      (select count(estado) from totem where estado = 'Desligado' and fkUnidade = '${fkUnidade}') as Desligado
      from totem where fkUnidade = '${fkUnidade}'`;
  return database.executar(instrucao);
}

function filtrarMaquinas(nomeDigitado) {
  var instrucao = `select t.idTotem as idTotem, u.nome as nomeUnidade, t.numeroSerie as numeroSerie from totem t join unidade u on fkUnidade = idUnidade where t.numeroSerie like '${nomeDigitado}%';`;
  return database.executar(instrucao);
}

function listarUsoMaquina(fkTotem) {
  var instrucao = `select top 7 idRegistro,uso_processador,uso_ram,uso_hd,FORMAT(data_registro,'%H:%m:%s') as data_registro from registro where fkTotem = '${fkTotem}' order by  idRegistro desc;`;
  return database.executar(instrucao);
}
function listarUltimosDados(fkTotem) {
  var instrucao = `select top 1 idRegistro,uso_processador,uso_ram,uso_hd,FORMAT(data_registro,'%H:%m:%s') as data_registro from registro where fkTotem = '${fkTotem}' order by idRegistro desc`;
  return database.executar(instrucao);
}

function cadastrarMaquina(nome, numeroSerial, processador, ram, qtdArmazenamento, storageSelect, freq) {
  var instrucao = `INSERT INTO totem (numeroSerie, processador, ram, qtd_armazenamento, tipo_armazenamento, freq_processador, fkUnidade) VALUES ( '${numeroSerial}', '${processador}', '${ram}', '${qtdArmazenamento}', '${storageSelect}', '${freq}', '${nome}');`;
  return database.executar(instrucao);
}

function editar(numeroSerial, processador, ram, qtdArmazenamento, storageSelect, freq, idMaquina) {
  var instrucao = `UPDATE totem SET numeroSerie = '${numeroSerial}', processador = '${processador}', ram = '${ram}', qtd_armazenamento = '${qtdArmazenamento}', tipo_armazenamento = '${storageSelect}', freq_processador = '${freq}' WHERE idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}

function deletarRegistroMaquina(idMaquina) {
  var instrucao = `DELETE FROM totem WHERE idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarMaquinas,
  listarDadosMaquina,
  listarStatusMaqEmTempoReal,
  cadastrarMaquina,
  editar,
  deletarRegistroMaquina,
  filtrarMaquinas,
  listarUsoMaquina,
  listarUltimosDados
};
