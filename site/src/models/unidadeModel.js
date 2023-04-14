var database = require("../database/config")

function listar(fkEmpresa) {
  var instrucao = `select nome, logradouro, idUnidade from unidade where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function listarUnidades(fkEmpresa) {
  var instrucao = `select nome, idUnidade from unidade where fkEmpresa = ${fkEmpresa};`;
  return database.executar(instrucao);
}
function listarDadosUnidade(idUnidade) {
  var instrucao = `select nome as nomeUnidade, telefone as telefoneUnidade, sigla as ufUnidade, cidade as cidadeUnidade, logradouro as logradouroUnidade, bairro as bairroUnidade, numero as numeroUnidade, cep as cepUnidade from unidade where idUnidade = ${idUnidade};`;
  return database.executar(instrucao);
}
function listarTodasUnidades(fkEmpresa, idUnidade) {
  var instrucao = `select idUnidade, nome as nomeUnidade, 
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Disponivel' and idUnidade = '${idUnidade}') as Disponivel,
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Manutencao' and idUnidade = '${idUnidade}') as Manutencao,
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Desligado' and idUnidade = '${idUnidade}') as Desligado,
        (select count(t.idTotem) from totem t join unidade u on u.idUnidade = t.fkUnidade where idUnidade = '${idUnidade}') as totalMaquinasUnidade
        from unidade where fkEmpresa = '${fkEmpresa}' and idUnidade = '${idUnidade}';`;
  return database.executar(instrucao);
}
function atualizarListaUnidades(fkEmpresa) {
  var instrucao = `select idUnidade from unidade where fkEmpresa = '${fkEmpresa}';`;
  return database.executar(instrucao);
}
function filtrarUnidades(nomeDigitado, fkEmpresa) {
  var instrucao = `select * from unidade where nome like '${nomeDigitado}%' and fkEmpresa = ${fkEmpresa};`;
  return database.executar(instrucao);
}

function filtrarTodasUnidades(nomeDigitado, idUnidade, fkEmpresa) {
  var instrucao = `select idUnidade, nome as nomeUnidade, 
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Disponivel' and idUnidade = '${idUnidade}') as Disponivel,
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Manutencao' and idUnidade = '${idUnidade}') as Manutencao,
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Desligado' and idUnidade = '${idUnidade}') as Desligado,
        (select count(t.idTotem) from totem t join unidade u on u.idUnidade = t.fkUnidade where idUnidade = '${idUnidade}') as totalMaquinasUnidade
        from unidade where fkEmpresa = '${fkEmpresa}' and nomeUnidade = ${nomeDigitado};`;;
  return database.executar(instrucao);
}

function verificarTelefone(telefone) {
  var instrucao = `select telefone from unidade where telefone = '${telefone}';`;
  return database.executar(instrucao);
}
function verificarNumero(numero) {
  var instrucao = `select numero from unidade where numero = '${numero}';`;
  return database.executar(instrucao);
}
function entrar(email, senha) {
  var instrucao = `select * from unidade WHERE email = '${email}' AND senha = '${senha}';`;
  return database.executar(instrucao);
}

function cadastrar(nome, telefone, fkEmpresa, cep, uf, cidade, logragouro, bairro, numero) {
  var instrucao = `INSERT INTO unidade (nome, telefone, cep, sigla, cidade, logradouro, bairro, numero, fkEmpresa) VALUES ('${nome}', '${telefone}', '${cep}', '${uf}', '${cidade}', '${logragouro}', '${bairro}', '${numero}', '${fkEmpresa}');`;
  return database.executar(instrucao);
}

function editar(nome, logradouro, cep, uf, cidade, bairro, numero, telefone, idUnidade) {
  var instrucao = `UPDATE unidade SET nome = '${nome}', logradouro = '${logradouro}', cep = '${cep}', sigla = '${uf}', cidade = '${cidade}', bairro = '${bairro}', numero = ${numero}, telefone = '${telefone}' WHERE idUnidade = ${idUnidade};`;
  return database.executar(instrucao);
}

function deletar(idUnidade) {
  var instrucao = `DELETE u from unidade u left JOIN totem on u.idUnidade = totem.FkUnidade where u.idUnidade = ${idUnidade};`;
  return database.executar(instrucao);
}

module.exports = {
  atualizarListaUnidades,
  listar,
  listarUnidades,
  listarDadosUnidade,
  listarTodasUnidades,
  verificarTelefone,
  verificarNumero,
  entrar,
  cadastrar,
  editar,
  deletar,
  filtrarUnidades,
  filtrarTodasUnidades
};