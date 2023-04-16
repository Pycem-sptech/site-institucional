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

function filtrarTodasUnidades(nomeDigitado, fkEmpresa) {
  var instrucao = `select idUnidade, nome as nomeUnidade, 
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Disponivel' and nome = '${nomeDigitado}') as Disponivel,
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Manutencao' and nome = '${nomeDigitado}') as Manutencao,
        (select count(t.estado) from totem t join unidade u on u.idUnidade = t.fkUnidade where estado = 'Desligado' and nome = '${nomeDigitado}') as Desligado,
        (select count(t.idTotem) from totem t join unidade u on u.idUnidade = t.fkUnidade where nome = '${nomeDigitado}') as totalMaquinasUnidade
        from unidade where fkEmpresa = '${fkEmpresa}' and nome like '${nomeDigitado}%'`;;
  return database.executar(instrucao);
}
function ocorrenciasPorMes(fkEmpresa) {
  var instrucao = `
  WITH meses AS (
    SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION 
    SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
  )
  
  SELECT u.nome AS unidade, m.mes, COALESCE(COUNT(r.idRelatorio), 0) AS quantidade
  FROM unidade u
  JOIN empresa e ON u.fkEmpresa = e.idEmpresa
  CROSS JOIN (
    SELECT DISTINCT YEAR(data_relatorio) AS ano, mes
    FROM relatorio
    CROSS JOIN meses
  ) m
  LEFT JOIN totem t ON u.idUnidade = t.fkUnidade
  LEFT JOIN relatorio r ON t.idTotem = r.fkTotem AND YEAR(r.data_relatorio) = m.ano AND MONTH(r.data_relatorio) = m.mes
  WHERE e.idEmpresa = ${fkEmpresa}
  GROUP BY u.nome, m.mes
  ORDER BY u.nome, m.mes
        `;
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
  filtrarTodasUnidades,
  ocorrenciasPorMes
};