var database = require("../database/config");

function listar() {
  var instrucao = `select email from usuario;`;
  return database.executar(instrucao);
}
function autenticar(email) {
  var instrucao = `SELECT fkEmpresa FROM usuario WHERE email = '${email}';`;
  return database.executar(instrucao);
}
function verificarEmail(email) {
  var instrucao = `select email from usuario where email = '${email}';`;
  return database.executar(instrucao);
}
function verificarCpf(cpf) {
  var instrucao = `select cpf from usuario where cpf = '${cpf}';`;
  return database.executar(instrucao);
}
function listarDadosFuncionario(idFuncionario) {
  var instrucao = `select * from usuario where idUsuario = ${idFuncionario};`;
  return database.executar(instrucao);
}
function listarFuncionarios(fkEmpresa) {
  var instrucao = `select nome, cargo, idUsuario from usuario where fkEmpresa = ${fkEmpresa} AND (cargo = 'Tecnico' OR cargo = 'Supervisor');`;
  return database.executar(instrucao);
}
function listarTecnicos(fkEmpresa) {
  var instrucao = `select nome, idUsuario from usuario where fkEmpresa = ${fkEmpresa} AND cargo = 'Tecnico';`;
  return database.executar(instrucao);
}

function filtrarFuncionarios(nomeDigitado, fkEmpresa) {
  var instrucao = `select idUsuario, nome, cargo from usuario where nome like '${nomeDigitado}%' and (cargo in ('Supervisor', 'Tecnico')) and fkEmpresa = ${fkEmpresa};`;
  return database.executar(instrucao);
}

function deletar(idFuncionario) {
  var instrucao = `DELETE FROM usuario where idUsuario = ${idFuncionario};`;
  return database.executar(instrucao);
}

function editarFuncionario(nome, cargo, email, cpf, senha, idFuncionario) {
  var instrucao = ''
  if(process.env.AMBIENTE_PROCESSO == "producao"){
    instrucao = `
    IF (SELECT senha FROM usuario where idUsuario = ${idFuncionario}) = '${senha}'

      BEGIN

      UPDATE usuario SET nome = '${nome}', cargo = '${cargo}', email = '${email}', cpf = '${cpf}' WHERE idUsuario =' ${idFuncionario}'

      END

    ELSE

      BEGIN

      UPDATE usuario SET nome = '${nome}', cargo = '${cargo}', email = '${email}', cpf = '${cpf}', senha = (HASHBYTES('SHA2_256','${senha}')) WHERE idUsuario =' ${idFuncionario}'

      END`;
  }else{
    instrucao = `UPDATE usuario SET nome = '${nome}', cargo = '${cargo}', email = '${email}', cpf = '${cpf}', senha = sha2('${senha}', 256) WHERE idUsuario = '${idFuncionario}';`;
  }
  return database.executar(instrucao);
}

function entrar(email, senha) {
  var instrucao = ''
  if(process.env.AMBIENTE_PROCESSO == "producao"){
    instrucao = `SELECT 
    (SELECT SUBSTRING(nome, 1, CHARINDEX(' ', nome + ' ') - 1) AS primeiro_nome FROM usuario WHERE email = '${email}' AND senha = (HASHBYTES('SHA2_256','${senha}'))) as nome,nome as nomeCompleto, idUsuario, email, cpf, senha, cargo, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = (HASHBYTES('SHA2_256','${senha}'));`;
  }else{
    instrucao = `SELECT * FROM usuario WHERE email = '${email}' AND senha = sha2('${senha}', 256);`;
  }
  return database.executar(instrucao);
}

function cadastrar(nome, email, cpf, senha) {
  var instrucao = ''
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao = `insert into [dbo].[usuario] (nome, email, cpf, senha, cargo) values ('${nome}','${email}','${cpf}',HASHBYTES('SHA2_256','${senha}'),'Dono');`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao = `INSERT INTO usuario (nome, email, cpf, senha, cargo ) VALUES ('${nome}', '${email}','${cpf}',sha2('${senha}', 256),'Dono');`;
  } else {
    return
  }
  return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, cpf, senha, cargo, fkEmpresa) {
  var instrucao = ''
  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucao = `INSERT INTO usuario (nome, email, cpf, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${cpf}',HASHBYTES('SHA2_256','${senha}'),'${cargo}','${fkEmpresa}');`
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucao = `INSERT INTO usuario (nome, email, cpf, senha, cargo, fkEmpresa) VALUES ('${nome}', '${email}', '${cpf}',sha2('${senha}', 256),'${cargo}','${fkEmpresa}');`;
  } else {
    return
  }
  return database.executar(instrucao);
}

module.exports = {
  listar,
  listarFuncionarios,
  listarTecnicos,
  listarDadosFuncionario,
  verificarCpf,
  verificarEmail,
  entrar,
  autenticar,
  cadastrar,
  cadastrarFuncionario,
  editarFuncionario,
  deletar,
  filtrarFuncionarios
};
