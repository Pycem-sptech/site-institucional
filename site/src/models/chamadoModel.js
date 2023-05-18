var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucao = `select * from chamado;`;
    return database.executar(instrucao);
}

function listarChamados(fkEmpresa) {
    var instrucao = `select chamado.titulo, chamado.tipo, chamado.descricao, chamado.prioridade, chamado.estado, chamado.atribuicao, chamado.fkTotem, chamado.fkEmpresa, usuario.idUsuario, usuario.nome, totem.idTotem, totem.usuario from chamado 
                    join usuario on usuario.idUsuario = chamado.atribuicao
                    join totem on chamado.fkTotem = totem.idTotem
                    where chamado.fkEmpresa = '${fkEmpresa}';`;
    return database.executar(instrucao);
}

function cadastrar(descricao, prioridade, estado, atribuicao, fkTotem, fkUsuario, fkUnidade, fkEmpresa) {
    var instrucao = `insert into chamado(descricao, prioridade, estado, atribuicao, fkTotem, fkUsuario, fkUnidade, fkUnidade) values ('${descricao}','${prioridade}','${estado}','${atribuicao}','${fkTotem}','${fkUsuario}','${fkUnidade}','${fkEmpresa}');`;
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
    deletar,
    listarChamados
}