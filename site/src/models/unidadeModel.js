var database = require("../database/config")

function listar() {
    console.log("ACESSEI O unidade MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM unidade;
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
<<<<<<< HEAD
    console.log(nome);
    console.log(telefone);
    console.log(fkEmpresa);
    console.log(cep);
    console.log(uf);
    console.log(cidade);
    console.log(logragouro);
    console.log(bairro);
    console.log(numero);
    console.log(complemento);
    cadastrarEndereco(cep, uf, cidade, logragouro, bairro, numero, complemento);
    cadastrarUnidade(nome, telefone, fkEmpresa);
}
function cadastrarUnidade(nome, telefone, fkEmpresa) {
    console.log("ACESSEI O unidade MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO unidade (nome, telefone, fkEmpresa, fkEndereco) VALUES ('${nome}', '${telefone}', 1,1));
    `;
=======
    var instrucao = `
    INSERT INTO unidade (nome, telefone, cep, sigla, cidade, logradouro, bairro, numero, complemento, fkEmpresa) VALUES ('${nome}', '${telefone}', '${cep}', '${uf}', '${cidade}', '${logragouro}', '${bairro}', '${numero}', '${complemento}' , 1);
`;
>>>>>>> 14cde49f51208ef38234a5b1c52f592ae8238965
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

<<<<<<< HEAD
function cadastrarEndereco(cep, uf, cidade, logragouro, bairro, numero, complemento) {
    console.log("ACESSEI O unidade MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cep, uf, cidade, logragouro, bairro, numero, complemento);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO endereco (cep, sigla, cidade, logradouro, bairro, numero, complemento) VALUES 
        ('${cep}', '${uf}', '${cidade}', '${logragouro}', '${bairro}', '${numero}', '${complemento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


=======
>>>>>>> 14cde49f51208ef38234a5b1c52f592ae8238965

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucao = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    deletar,
    cadastrarUnidade,
    cadastrarEndereco
};