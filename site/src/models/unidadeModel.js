var database = require("../database/config")

function listar(fkEmpresa) {
  console.log("ACESSEI O unidade MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
        SELECT nome, logradouro, idUnidade FROM unidade where fkEmpresa = '${fkEmpresa}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarDadosUnidade(fkEmpresa) {
  var instrucao = `
    select unidade.nome as nomeUnidade, totem.numeroSerie as numeroSerie, totem.idTotem from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = '${fkEmpresa}';

    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarUnidades(fkEmpresa) {
  console.log("ACESSEI O unidade MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
      SELECT nome, idUnidade FROM unidade where fkEmpresa = '${fkEmpresa}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log("ACESSEI O unidade MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
  var instrucao = `
        SELECT * FROM unidade WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, telefone, fkEmpresa, cep, uf, cidade, logragouro, bairro, numero, complemento) {
  var instrucao = `
    INSERT INTO unidade (nome, telefone, cep, sigla, cidade, logradouro, bairro, numero, complemento, fkEmpresa) VALUES ('${nome}', '${telefone}', '${cep}', '${uf}', '${cidade}', '${logragouro}', '${bairro}', '${numero}', '${complemento}' , '${fkEmpresa}');
`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editar(nome, logradouro, cep, uf, cidade, bairro, numero, telefone, idUnidade) {
  var instrucao = `
      UPDATE unidade SET nome = '${nome}', logradouro = '${logradouro}', cep = '${cep}', sigla = '${uf}', cidade = '${cidade}', 
      bairro = '${bairro}', numero = ${numero}, telefone = '${telefone}' WHERE idUnidade = ${idUnidade};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deletar(idUnidade) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
  var instrucao = `
        DELETE FROM aviso WHERE id = ${idUnidade};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificarTelefone(telefone) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarTelefone(): ",
    telefone
  );
  var instrucao = `
       select telefone from unidade where telefone = '${telefone}';
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificarNumero(numero) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarNumero(): ",
    numero
  );
  console.log(numero);
  var instrucao = `
       select numero from unidade where numero = '${numero}';
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  deletar,
  verificarTelefone,
  verificarNumero,
  listarUnidades, 
  editar,
  listarDadosUnidade
};