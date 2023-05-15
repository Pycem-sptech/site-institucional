var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucao = `select * from chamado;`;
    return database.executar(instrucao);
}
function cadastrar(titulo,descricao,prioridade,estado,atribuicao,fkTotem,fkRelatorio,fkUnidade,fkEmpresa){
    var instrucao = `insert into chamado(titulo,descricao,prioridade,estado,atribuicao,fkTotem,fkRelatorio,fkUnidade, fkUnidade)('${titulo}','${descricao}','${prioridade}','${estado}','${atribuicao}','${fkTotem}','${fkRelatorio}','${fkUnidade}','${fkEmpresa}');`;
    return database.executar(instrucao);
}
function editar(idChamado,titulo,descricao,prioridade,estado,atribuicao,fkTotem,fkRelatorio,fkUnidade){
    var instrucao = `update chamado set titulo = '${titulo}',descricao = '${descricao}',prioridade = '${prioridade}',estado = '${estado}',atribuicao = '${atribuicao}',fkTotem = '${fkTotem}',fkRelatorio = '${fkRelatorio}',fkUnidade = '${fkUnidade}' where idChamado = '${idChamado}';`;
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