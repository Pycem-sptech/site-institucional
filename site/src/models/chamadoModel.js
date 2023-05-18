var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucao = `select * from chamado;`;
    return database.executar(instrucao);
}
function cadastrar(dataInicio, tipo, descricao, prioridade, fkTotem, fkUnidade, fkEmpresa){
    var instrucao = `insert into chamado(data_inicio, status, tipo, descricao, prioridade, fkTotem, fkUnidade, fkEmpresa) values ('${dataInicio}', 'Aberto', '${tipo}', '${descricao}','${prioridade}', '${fkTotem}', '${fkUnidade}','${fkEmpresa}');`;
    return database.executar(instrucao);
}
function editar(idChamado, descricao, tipo, prioridade, estado, atribuicao, dataInicio, dataFim, fkTotem, fkUnidade){
        var instrucao = `update chamado set tipo='${tipo}',  descricao = '${descricao}', prioridade = '${prioridade}', estado = '${estado}', data_inicio = '${dataInicio}', data_fim='${dataFim}', atribuicao = '${atribuicao}',fkTotem = '${fkTotem}', fkUnidade = '${fkUnidade}' where idChamado = '${idChamado}';`;
    return database.executar(instrucao);
}
function deletar(idChamado) {
    var instrucao = `delete from chamado where idChamado = '${idChamado}';`;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    editar,
    deletar
}