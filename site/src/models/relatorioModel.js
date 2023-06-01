var database = require("../database/config");

function listarRelatorio(idUnidade) {
  var instrucao = `select idRelatorio, titulo, descricao, tipo, FORMAT(data_relatorio,'%d/%M/20%y') as data_relatorio from relatorio join totem on idTotem = fkTotem join unidade on idUnidade = fkUnidade where idUnidade = ${idUnidade}`;
  return database.executar(instrucao);
}

function listarRelatoriosTotem(idTotem) {
  var instrucao = `select idRelatorio, titulo, descricao, FORMAT(data_relatorio,'%d/%M/20%y') as data_relatorio from relatorio join totem on idTotem = fkTotem where idTotem = ${idTotem} order by idRelatorio desc;`;
  return database.executar(instrucao);
}

function filtrarRelatorios(idTotem, nomeDigitado) {
  var instrucao = `select idRelatorio, titulo, descricao, FORMAT(data_relatorio,'%d/%M/20%y') as data_relatorio from relatorio join totem on idTotem = fkTotem where idTotem = ${idTotem} and titulo like '${nomeDigitado}%' order by  data_relatorio;`;
  return database.executar(instrucao);
}

function listarRelatoriosMensais(fkEmpresa, idUnidade) {
  const dataAtual = new Date;
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  var instrucao = `
        SELECT 
        DATEPART(week, r.data_relatorio) AS semana, 
        (SELECT COUNT(tipo) FROM relatorio WHERE tipo = 'Desligamento' AND DATEPART(week, data_relatorio) = DATEPART(week, r.data_relatorio)) AS Desligamento,
        (SELECT COUNT(tipo) FROM relatorio WHERE tipo = 'Sobrecarga' AND DATEPART(week, data_relatorio) = DATEPART(week, r.data_relatorio)) AS Sobrecarga,
        (SELECT COUNT(tipo) FROM relatorio WHERE tipo = 'MauFuncionamento' AND DATEPART(week, data_relatorio) = DATEPART(week, r.data_relatorio)) AS MauFuncionamento,
        (SELECT COUNT(tipo) FROM relatorio WHERE tipo = 'Outro' AND DATEPART(week, data_relatorio) = DATEPART(week, r.data_relatorio)) AS Outro,
        (SELECT COUNT(tipo) FROM relatorio WHERE DATEPART(week, data_relatorio) = DATEPART(week, r.data_relatorio)) AS Total        
      FROM 
        unidade u
        JOIN empresa e ON u.fkEmpresa = e.idEmpresa
        JOIN totem t ON u.idUnidade = t.fkUnidade
        JOIN relatorio r ON t.idTotem = r.fkTotem
      WHERE 
        e.idEmpresa = '${fkEmpresa}' AND
        u.idUnidade = '${idUnidade}' AND
        YEAR(r.data_relatorio) = '${ano}' AND
        MONTH(r.data_relatorio) = '${mes}' OR
        MONTH(r.data_relatorio) = '${mes - 1}'
      GROUP BY 
        DATEPART(week, r.data_relatorio)
      ORDER BY 
        semana
        DESC
        `;
  return database.executar(instrucao);
}
function buscarDadosRelatorio(idRelatorio) {
  var instrucao = `select FORMAT(data_relatorio,'%d/%M/20%y') as dataRelatorio, titulo, descricao, tipo, fkTotem from relatorio where idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}

function cadastrarRelatorio(titulo, tipo, descricao, data, fkMaquina) {
  var instrucao = `INSERT INTO relatorio (titulo, tipo, descricao, data_relatorio, fkTotem) VALUES ( '${titulo}', '${tipo}', '${descricao}', '${data}' , '${fkMaquina}');`;
  return database.executar(instrucao);
}

function editarRelatorio(titulo, tipo, descricao, data, idRelatorio) {
  var instrucao = `UPDATE relatorio SET titulo = '${titulo}', tipo = '${tipo}', descricao = '${descricao}', data_relatorio = '${data}' WHERE idRelatorio = ${idRelatorio};`;
  return database.executar(instrucao);
}


module.exports = {
  buscarDadosRelatorio,
  cadastrarRelatorio,
  editarRelatorio,
  listarRelatorio,
  listarRelatoriosTotem,
  filtrarRelatorios,
  listarRelatoriosMensais
};
