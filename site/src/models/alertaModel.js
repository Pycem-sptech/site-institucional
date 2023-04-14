var database = require("../database/config");

function listarAlertas(fkEmpresa) {
  var instrucao = `select * from alerta where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarFrequenciaAtualizacao(fkEmpresa, novaFrequencia) {
  var instrucao = `update alerta set freq_alerta = '${novaFrequencia}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarProcessadorAlerta(fkEmpresa, novoAlerta) {
  var instrucao = `update alerta set cpu_alerta = '${novoAlerta}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarProcessadorAlertaCritico(fkEmpresa, novoAlerta) {
  var instrucao = `update alerta set cpu_critico = '${novoAlerta}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarRamAlerta(fkEmpresa, novoAlerta) {
  var instrucao = `update alerta set ram_alerta = '${novoAlerta}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarRamAlertaCritico(fkEmpresa, novoAlerta) {
  var instrucao = `update alerta set ram_critico = '${novoAlerta}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarHdAlerta(fkEmpresa, novoAlerta) {
  var instrucao = `update alerta set hd_alerta = '${novoAlerta}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function editarHdAlertaCritico(fkEmpresa, novoAlerta) {
  var instrucao = `update alerta set hd_critico = '${novoAlerta}' where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function padronizarTodosAlertas(fkEmpresa) {
  var instrucao = `update alerta set freq_alerta = 5,cpu_alerta = 50,cpu_critico = 80,ram_alerta = 50,ram_critico = 80,hd_alerta = 50,hd_critico = 80 where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function padronizarFrequenciaAtualizacao(fkEmpresa) {
  var instrucao = `update alerta set freq_alerta = 5 where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function padronizarProcessadorAlerta(fkEmpresa) {
  var instrucao = `update alerta set cpu_alerta = 50,cpu_critico = 80 where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function padronizarRamAlerta(fkEmpresa) {
  var instrucao = `update alerta set ram_alerta = 50,ram_critico = 80 where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function padronizarHdAlerta(fkEmpresa) {
  var instrucao = `update alerta set hd_alerta = 50,hd_critico = 80 where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}

module.exports = {
  listarAlertas,
  editarFrequenciaAtualizacao,
  editarProcessadorAlerta,
  editarProcessadorAlertaCritico,
  editarRamAlerta,
  editarRamAlertaCritico,
  editarHdAlerta,
  editarHdAlertaCritico,
  padronizarTodosAlertas,
  padronizarFrequenciaAtualizacao,
  padronizarProcessadorAlerta,
  padronizarRamAlerta,
  padronizarHdAlerta
};
