var relatorioModel = require("../models/relatorioModel");

function buscarDadosRelatorio(req, res) {
  idRelatorio = req.params.idRelatorio;
  relatorioModel.buscarDadosRelatorio(idRelatorio).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(
    function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    }
  );
}

function cadastrarRelatorio(req, res) {
  var titulo = req.body.titulo;
  var tipo = req.body.tipo;
  var descricao = req.body.descricao;
  var data = req.body.data;
  var fkMaquina = req.body.fkMaquina;


  if (titulo == undefined) {
      res.status(400).send("Seu nome es tá undefined!");
  } else if (tipo == undefined) {
      res.status(400).send("Seu numeroSerial está undefined!");
  } else if (descricao == undefined) {
      res.status(400).send("Sua processador está undefined!");
  } else if (data == undefined) {
      res.status(400).send("Sua ram está undefined!");
  } else if (fkMaquina == undefined) {
      res.status(400).send("Sua storageSelect está undefined!");
  } else {

      relatorioModel.cadastrarRelatorio(titulo, tipo, descricao, data, fkMaquina).then(
          function (resultado) {
              res.json(resultado);
          }
      ).catch(
          function (erro) {
              console.log("\nHouve um erro ao realizar o cadastro! Erro: ",erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );
  }
}
function listarRelatorio(req, res) {
  fkMaquina = req.params.fkMaquina;
  relatorioModel.listarRelatorio(fkMaquina).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log("Houve um erro ao buscar as maquinas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function editarRelatorio(req, res) {
  var titulo = req.body.titulo;
  var tipo = req.body.tipo;
  var descricao = req.body.descricao;
  var data = req.body.data;
  var idRelatorio = req.params.idRelatorio;

  relatorioModel.editar(titulo, tipo, descricao, data, idRelatorio).then(
      function (resultado) {
          res.json(resultado);
      }
  ).catch(
      function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      }
  );

}

module.exports = {
  buscarDadosRelatorio,
  cadastrarRelatorio,
  editarRelatorio,
  listarRelatorio
}