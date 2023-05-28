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
function listarOcorrenciasChamados(fkEmpresa) {
    var instrucao = `select
    (select count(idChamado) from chamado where tipo = 'Desligamento') as 'totalDesligamento',
    (select count(idChamado) from chamado where tipo = 'Sobrecarga') as 'totalSobrecarga',
    (select count(idChamado) from chamado where tipo = 'MauFuncionamento') as 'totalMauFuncionamento',
    (select count(idChamado) from chamado where tipo = 'Outro') as 'totalOutro'
    from chamado where fkEmpresa = '${fkEmpresa}';`;
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

function cadastrar(descricao, prioridade, tipo, usuario_totem, fkMaquina, criado_por_id, criado_por_nome, nome_unidade, fkUnidade, fkEmpresa) {
    var instrucao = `insert into chamado(descricao, prioridade,tipo, criado_por_id, criado_por_nome, usuario_totem,fkTotem, nome_unidade, fkUnidade, fkEmpresa) values ('${descricao}','${prioridade}','${tipo}','${criado_por_id}','${criado_por_nome}','${usuario_totem}','${fkMaquina}','${nome_unidade}','${fkUnidade}','${fkEmpresa}');`;
    return database.executar(instrucao);
}

function editar(idChamado, resolucao, descricao, tipo, prioridade, estado, nome_unidade, usuario_totem, atribuicao, fkMaquina) {
    var instrucao = `update chamado set 
    atribuido_id = ${atribuicao},
    atribuido_nome = (select nome from usuario where idUsuario = ${atribuicao}),
    descricao = '${descricao}',
    nome_unidade = '${nome_unidade}',
    usuario_totem = '${usuario_totem}',
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

function ocorrenciasPorMes(fkEmpresa) {
    var instrucao = `
    select 
    concat(YEAR(c.data_inicio), '/', RIGHT('00' + CONVERT(VARCHAR(2), MONTH(c.data_inicio)), 2)) AS ano_mes, 
    count(c.idChamado) AS quantidade
  from 
    unidade u
    join empresa e ON u.fkEmpresa = e.idEmpresa
    join totem t ON u.idUnidade = t.fkUnidade
    join chamado c ON t.idTotem = c.fkTotem
  where 
    e.idEmpresa = '${fkEmpresa}'
    AND c.data_inicio >= DATEADD(MONTH, -6, GETDATE())
  group by 
    concat(YEAR(c.data_inicio), '/', RIGHT('00' + CONVERT(VARCHAR(2), MONTH(c.data_inicio)), 2))
  order by
    concat(YEAR(c.data_inicio), '/', RIGHT('00' + CONVERT(VARCHAR(2), MONTH(c.data_inicio)), 2))
  desc
          `;
    return database.executar(instrucao);
}

function frequenciaProblemasMensal(fkEmpresa, idUnidade) {
    const dataAtual = new Date;
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    var instrucao = `
        SELECT 
            DATEPART(week, c.data_inicio) AS semana, 
            FORMAT(DATEADD(WEEK, DATEPART(week, c.data_inicio) - 1, DATEADD(YEAR, 2023 - 1900, 0)) - DATEPART(WEEKDAY, DATEADD(YEAR, 2023 - 1900, 0)) + 1,'dd/MM') as primeiroDiaSemana,
			FORMAT(DATEADD(DAY, 6, DATEADD(WEEK, DATEPART(week, c.data_inicio) - 1, DATEADD(YEAR, 2023 - 1900, 0)) - DATEPART(WEEKDAY, DATEADD(YEAR, 2023 - 1900, 0)) + 1),'dd/MM') as ultimoDiaSemana,
            (SELECT COUNT(tipo) FROM chamado WHERE tipo = 'Desligamento' AND DATEPART(week, data_inicio) = DATEPART(week, c.data_inicio)) AS Desligamento,
            (SELECT COUNT(tipo) FROM chamado WHERE tipo = 'Sobrecarga' AND DATEPART(week, data_inicio) = DATEPART(week, c.data_inicio)) AS Sobrecarga,
            (SELECT COUNT(tipo) FROM chamado WHERE tipo = 'MauFuncionamento' AND DATEPART(week, data_inicio) = DATEPART(week, c.data_inicio)) AS MauFuncionamento,
            (SELECT COUNT(tipo) FROM chamado WHERE tipo = 'Outro' AND DATEPART(week, data_inicio) = DATEPART(week, c.data_inicio)) AS Outro,
            (SELECT COUNT(tipo) FROM chamado WHERE DATEPART(week, data_inicio) = DATEPART(week, c.data_inicio)) AS Total        
        FROM 
            unidade u
            JOIN empresa e ON u.fkEmpresa = e.idEmpresa
            JOIN totem t ON u.idUnidade = t.fkUnidade
            JOIN chamado c ON t.idTotem = c.fkTotem
        WHERE 
            e.idEmpresa = '${fkEmpresa}' AND
            u.idUnidade = '${idUnidade}' AND
            YEAR(c.data_inicio) = '${ano}' AND
            MONTH(c.data_inicio) = '${mes}'
        GROUP BY 
            DATEPART(week, c.data_inicio)
        ORDER BY 
            semana
          `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarChamados,
    listarOcorrenciasChamados,
    listarMaquinasPorUnidade,
    listarUnidadesPorMaquina,
    ocorrenciasPorMes,
    frequenciaProblemasMensal,
    buscarChamado,
    cadastrar,
    editar,
    deletar,
}