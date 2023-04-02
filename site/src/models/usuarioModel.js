var database = require("../database/config");

function listar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
         select email from usuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarFuncionarios(fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
         select nome, cargo, idUsuario from usuario where fkEmpresa = ${fkEmpresa} AND (cargo = 'Tecnico' OR cargo = 'Supervisor');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {

  var instrucao = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucao = `SELECT * FROM [dbo].[usuario] WHERE email = '${email}' AND senha = (select HASHBYTES('SHA2_256','${senha}'));`;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucao = `SELECT * FROM usuario WHERE email = '${email}' AND senha = (select sha2('${senha}', 256));
      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  return database.executar(instrucao);
}

function autenticar(email) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email
  );
  var instrucao = `
        SELECT fkEmpresa FROM usuario WHERE email = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, cpf, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,email,senha
  );

  instrucao = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucao = `insert into [dbo].[usuario] (nome, email, cpf, senha, cargo) values ('${nome}', '${email}', '${cpf}',HASHBYTES('SHA2_256','${senha}'),'Dono');`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucao = `INSERT INTO usuario (nome, email, cpf, senha, cargo ) VALUES ('${nome}', '${email}','${cpf}',sha2('${senha}', 256),'Dono');
      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, cpf, senha, cargo, fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,email,senha,cargo,fkEmpresa
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
            INSERT INTO usuario (nome, email, cpf, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${cpf}',sha2('${senha}', 256),'${cargo}','${fkEmpresa}');
        `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificarEmail(email) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarEmail(): ",
    email
  );
  var instrucao = `
     select email from usuario where email = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificarCpf(cpf) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    cpf
  );
  console.log(cpf);
  var instrucao = `
     select cpf from usuario where cpf = '${cpf}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editarFuncionario(nome, cargo, email, cpf, senha, idFuncionario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarEmail(): ",
    email
  );
  var instrucao = `
     UPDATE usuario SET nome = '${nome}', cargo = '${cargo}', email = '${email}', cpf = '${cpf}', senha = sha2('${senha}', 256)
    WHERE idUsuario = ${idFuncionario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deletar(idFuncionario) {
  var instrucao = `
      DELETE FROM usuario where idUsuario = ${idFuncionario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  listarFuncionarios,
  verificarCpf,
  verificarEmail,
  autenticar,
  cadastrarFuncionario,
  editarFuncionario,
  deletar
};
