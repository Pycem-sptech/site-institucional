var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucao = `select * from chamado;`;
    return database.executar(instrucao);
}

function listarChamados(fkEmpresa) {
    var instrucao = `select * from chamado
    left join usuario on chamado.atribuido_id = usuario.idUsuario
    join totem on chamado.fkTotem = totem.idTotem
    join unidade on chamado.fkUnidade = unidade.idUnidade
    where chamado.fkEmpresa = ${fkEmpresa};`;
    return database.executar(instrucao);
}

function cadastrar(descricao, prioridade, estado, atribuicao, fkTotem, fkUsuario, fkUnidade, fkEmpresa) {
    var instrucao = `insert into chamado(descricao, prioridade, estado, atribuicao, fkTotem, fkUsuario, fkUnidade, fkUnidade) values ('${descricao}','${prioridade}','${estado}','${atribuicao}','${fkTotem}','${fkUsuario}','${fkUnidade}','${fkEmpresa}');`;
    return database.executar(instrucao);
}
function editar(idChamado, titulo, descricao, prioridade, estado, atribuicao, fkTotem, fkRelatorio, fkUnidade) {
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
    deletar,
    listarChamados
}