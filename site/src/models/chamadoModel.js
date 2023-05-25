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
function listarMaquinasPorUnidade(fkUnidade) {
    var instrucao = `select idTotem, usuario from totem where fkUnidade = ${fkUnidade};`;
    return database.executar(instrucao);
}
function listarUnidadesPorMaquina(idTotem) {
    var instrucao = `select t.fkUnidade, u.nome from totem t join unidade u on t.fkUnidade = u.idUnidade where t.idTotem = ${idTotem};`;
    return database.executar(instrucao);
}
function buscarChamado(idChamado) {
    var instrucao = `select * from chamado where idChamado = ${idChamado};`;
    return database.executar(instrucao);
}

function cadastrar(descricao, prioridade, fkMaquina, criado_por_id, criado_por_nome, fkUnidade, fkEmpresa) {
    var instrucao = `insert into chamado(descricao, prioridade, criado_por_id, criado_por_nome, fkTotem, fkUnidade, fkEmpresa) values ('${descricao}','${prioridade}','${criado_por_id}','${criado_por_nome}','${fkMaquina}','${fkUnidade}','${fkEmpresa}');`;
    return database.executar(instrucao);
}

function editar(idChamado, resolucao, descricao, tipo, prioridade, estado, atribuicao, fkMaquina) {
    var instrucao = `update chamado set 
    atribuido_id = ${atribuicao},
    atribuido_nome = (select nome from usuario where idUsuario = ${atribuicao}),
    descricao = '${descricao}',
    resolucao = '${resolucao}',
    prioridade = '${prioridade}',
    estado = '${estado}',
    tipo = '${tipo}',
    fkTotem = '${fkMaquina}'
    where idChamado = '${idChamado}';`;
    return database.executar(instrucao);
}
function deletar(idChamado) {
    var instrucao = `delete from chamado where idChamado = '${idChamado}';`;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarChamados,
    listarMaquinasPorUnidade,
    listarUnidadesPorMaquina,
    buscarChamado,
    cadastrar,
    editar,
    deletar,
}