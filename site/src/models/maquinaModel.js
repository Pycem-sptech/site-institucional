var database = require("../database/config");

function listar(fkEmpresa, fkUnidade) {
  var instrucao = `select unidade.nome as nomeUnidade, totem.usuario, totem.idTotem, totem.numeroSerie as numeroSerie, totem.estado as status from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = '${fkEmpresa}' and unidade.idUnidade = '${fkUnidade}';`;
  return database.executar(instrucao);
}

function listarStatusTotem(fkEmpresa) {
  var instrucao = `
  select count(t.estado) as totalDesligado,
    (select count(t.estado) from totem t join unidade u 
    on u.idUnidade = t.fkUnidade join empresa e on e.idEmpresa = u.fkEmpresa where idEmpresa = '${fkEmpresa}' and t.estado = 'Manutencao') as totalManutencao,
    (select count(t.estado) from totem t join unidade u 
    on u.idUnidade = t.fkUnidade join empresa e on e.idEmpresa = u.fkEmpresa where idEmpresa = '${fkEmpresa}' and t.estado = 'Disponivel') as totalDisponivel,
    (select count(t.idTotem) from totem t join unidade u 
    on u.idUnidade = t.fkUnidade join empresa e on e.idEmpresa = u.fkEmpresa where idEmpresa = '${fkEmpresa}') as totalMaquinas
  from totem t join unidade u 
  on u.idUnidade = t.fkUnidade join empresa e on e.idEmpresa = u.fkEmpresa where idEmpresa = '${fkEmpresa}' and t.estado = 'Desligado';`;
  return database.executar(instrucao);
}

function listarMaquinas(fkEmpresa) {
  var instrucao = `select unidade.nome as nomeUnidade, totem.usuario, totem.numeroSerie as numeroSerie, totem.idTotem from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function atualizarListaMaquinas(fkEmpresa) {
  var instrucao = `select totem.* from totem join unidade on fkUnidade = idUnidade join empresa on fkEmpresa = idEmpresa where idEmpresa = '${fkEmpresa}' and numeroSerie <> ' ';`;
  return database.executar(instrucao);
}
function atualizarListaMaquinasFiltradas(fkEmpresa, nomeDigitado) {
  var instrucao = `select totem.* from totem join unidade on fkUnidade = idUnidade join empresa on fkEmpresa = idEmpresa where idEmpresa = '${fkEmpresa}' and usuario like '${nomeDigitado}%' and numeroSerie <> ' ';`;
  return database.executar(instrucao);
}
function mudarEstadoMaquina(idTotem) {
  var instrucao = `select top 1 * from [dbo].[registro] where fkTotem = ${idTotem} order by  idRegistro desc;`;
  return database.executar(instrucao);
}

function listarDadosMaquina(idMaquina) {
  var instrucao = `select totem.* from totem where idTotem = ${idMaquina};`;
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

function filtrarMaquinas(nomeDigitado, fkEmpresa) {
  var instrucao = `select t.idTotem as idTotem, u.nome as nomeUnidade, t.usuario as usuario from totem t join unidade u on fkUnidade = idUnidade where t.usuario like '${nomeDigitado}%' and fkEmpresa = ${fkEmpresa};`;
  return database.executar(instrucao);
}

function filtrarMaquinasDash(nomeDigitado, idUnidade) {
  var instrucao = `select t.idTotem as idTotem, u.nome as nomeUnidade, t.usuario as usuario, t.estado as "status" from totem t join unidade u on fkUnidade = idUnidade where t.usuario like '${nomeDigitado}%' and fkUnidade = '${idUnidade}';`;
  return database.executar(instrucao);
}

function listarUsoMaquina(fkTotem) {
  var instrucao = `SELECT TOP 7 
  idRegistro, uso_processador, uso_ram, uso_hd, 
  CONVERT(varchar, DATEADD(hour, -03, data_registro), 108) AS data_registro 
FROM 
  registro 
WHERE 
  fkTotem = '${fkTotem}' 
ORDER BY 
  idRegistro DESC;`;
  return database.executar(instrucao);
}

function listarUltimosDados(fkTotem) {
  var instrucao = `select top 1 idRegistro,uso_processador,uso_ram,uso_hd,CONVERT(varchar, DATEADD(hour, -03, data_registro), 108) as data_registro from registro where fkTotem = '${fkTotem}' order by idRegistro desc`;
  return database.executar(instrucao);
}

function cadastrarMaquina(fkUnidade, nomeMachine, password) {
  var instrucao = `INSERT INTO totem (usuario, senha,fkUnidade) VALUES ( '${nomeMachine}', '${password}', '${fkUnidade}');`;
  return database.executar(instrucao);
}

function editar(fkUnidade,usuario,senha,numeroSerial, processador, ram, qtdArmazenamento, storageSelect, idMaquina) {
  var instrucao = `UPDATE totem SET usuario = '${usuario}', senha = '${senha}', numeroSerie = '${numeroSerial}', processador = '${processador}', ram = '${ram}', qtd_armazenamento = '${qtdArmazenamento}', tipo_armazenamento = '${storageSelect}',fkUnidade = '${fkUnidade}' WHERE idTotem = '${idMaquina}';`;
  return database.executar(instrucao);
}

function atualizarStatusMaquina(idMaquina,statusNovo) {
  atualizarHistoricoStatusMaquina(idMaquina,statusNovo)
  var instrucao = `UPDATE totem SET estado = '${statusNovo}' WHERE idTotem = ${idMaquina};`;
  return database.executar(instrucao);
}

function atualizarHistoricoStatusMaquina(idMaquina,statusNovo){
  var instrucao = `insert into historico_totem (estadoTotem,data_historico,fkTotem) values ('${statusNovo}',getdate(),'${idMaquina}')`;
  return database.executar(instrucao);
}

function deletarRegistroMaquina(idMaquina) {
  desatribuirMaquina(idMaquina)
  var instrucao = `DELETE FROM totem WHERE idTotem = '${idMaquina}';`;
  return database.executar(instrucao);
}
function desatribuirMaquina(idMaquina) {
  var instrucao = `exec DesatribuirTotem @idTotem = '${idMaquina}';`;
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarMaquinas,
  listarDadosMaquina,
  listarStatusMaqEmTempoReal,
  cadastrarMaquina,
  editar,
  desatribuirMaquina,
  deletarRegistroMaquina,
  filtrarMaquinas,
  listarUsoMaquina,
  listarUltimosDados,
  listarStatusTotem,
  atualizarStatusMaquina,
  filtrarMaquinasDash,
  atualizarListaMaquinasFiltradas,
  atualizarListaMaquinas,
  mudarEstadoMaquina,
  atualizarHistoricoStatusMaquina
};
