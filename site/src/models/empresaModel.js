var database = require("../database/config")

function listar() {
    console.log("ACESSEI O empresa MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM empresa;
    `;
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O empresa MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, telefone, cnpj, emailUser) {
    cadastrarEmpresa(nome, email, telefone, cnpj);
    instrucao = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `update usuario set fkEmpresa = (select top 1 idEmpresa from empresa order by idEmpresa desc) where email = '${emailUser}'`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `update usuario set fkEmpresa = (select idEmpresa from empresa order by idEmpresa desc limit 1) where email = '${emailUser}';
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(instrucao);
}

function cadastrarEmpresa(nome, email, telefone, cnpj) {
    var instrucao = `
    INSERT INTO empresa (nome, email, telefone, cnpj) VALUES ('${nome}', '${email}', '${telefone}', '${cnpj}');
`;
    return database.executar(instrucao);
}

function verificarEmail(email) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarEmail(): ", email)
    var instrucao = `
     select email from empresa where email = '${email}';
    `;
    return database.executar(instrucao);
}

function verificarCnpj(cnpj) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj)
    console.log(cnpj)
    var instrucao = `
     select cnpj from empresa where cnpj = '${cnpj}';
    `;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    verificarEmail,
    verificarCnpj,
    cadastrarEmpresa
};