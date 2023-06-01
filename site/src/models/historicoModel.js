var database = require("../database/config")

function listar(idUnidade) {
    var instrucao = `
    DECLARE @unidadeId int = '${idUnidade}'
    DECLARE @empresaId int = 100
    DECLARE @dataAtual datetime = GETDATE()
    DECLARE @dataSemanaPassada datetime = DATEADD(WEEK, -1, @dataAtual)
    
    SELECT 
        SUM(CASE WHEN h.estadoTotem = 'Desligado' OR h.estadoTotem = 'Manutencao' THEN DATEDIFF(MINUTE, h.data_historico, @dataAtual) ELSE 0 END) AS 'semanaAtual',
        SUM(CASE WHEN h.estadoTotem = 'Desligado' OR h.estadoTotem = 'Manutencao' THEN DATEDIFF(MINUTE, h.data_historico, @dataSemanaPassada) ELSE 0 END) AS 'semanaPassada'
    FROM historico_totem h
    JOIN totem t ON t.idTotem = h.fkTotem
    JOIN unidade u ON u.idUnidade = t.fkUnidade
    JOIN empresa e ON e.idEmpresa = u.fkEmpresa
    WHERE u.idUnidade = @unidadeId AND e.idEmpresa = @empresaId AND h.data_historico BETWEEN @dataSemanaPassada AND @dataAtual
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar
};