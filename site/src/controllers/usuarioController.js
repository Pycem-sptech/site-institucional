var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
  
}

function listar(req, res) {
  usuarioModel.listar().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log(
      "Houve um erro ao realizar a consulta! Erro: ",
      erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
  });
}

function listarFuncionarios(req, res) {
  var fkEmpresa = req.params.fkEmpresa;
  usuarioModel.listarFuncionarios(fkEmpresa).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log(
      "Houve um erro ao realizar a consulta! Erro: ",
      erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
  });
}

function filtrarFuncionarios(req, res) {
  const nomeDigitado = req.params.nomeDigitado;
  const fkEmpresa = req.params.fkEmpresa;
  usuarioModel.filtrarFuncionarios(nomeDigitado, fkEmpresa).then(function (resultado) {
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

function listarDadosFuncionario(req, res) {
  idFuncionario = req.params.idFuncionario;
  usuarioModel.listarDadosFuncionario(idFuncionario).then(function (resultado) {
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

function verificarEmail(req, res) {
  var email = req.params.email;

  usuarioModel.verificarEmail(email).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os emails: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function verificarCpf(req, res) {
  var cpf = req.params.cpf;

  usuarioModel.verificarCpf(cpf).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os cpfs: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function validarAmbiente(req, res) {
  var ambiente = process.env.AMBIENTE_PROCESSO
  res.json(ambiente);
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.entrar(email, senha).then(function (resultado) {

      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

      if (resultado.length == 1) {
        console.log(resultado);
        res.json(resultado[0]);
      } else if (resultado.length == 0) {
        res.status(403).send("Email e/ou senha inválido(s)");
      } else {
        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o login! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
  }
}

function autenticar(req, res) {
  var email = req.body.emailServer;

  usuarioModel.autenticar(email).then(function (resultado) {
    console.log(`\nResultados encontrados: ${resultado.length}`);

    if (resultado.length == 1) {
      console.log(resultado);
      res.json(resultado[0]);
    } else if (resultado.length == 0) {
      res.status(403).send("Email e/ou senha inválido(s)");
    } else {
      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log(
      "\nHouve um erro ao realizar o login! Erro: ",
      erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var cpf = req.body.cpfServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(nome, email, cpf, senha).then(function (resultado) {
      res.json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
  }
}

function cadastrarFuncionario(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var cpf = req.body.cpfServer;
  var senha = req.body.senhaServer;
  var cargo = req.body.cargoServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("O cargo está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua fkEmpresa está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarFuncionario(nome, email, cpf, senha, cargo, fkEmpresa).then(function (resultado) {
      res.json(resultado);
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
  }
}

function editarFuncinario(req, res) {
  var idFuncionario = req.params.idFuncionario;
  var nome = req.body.nome;
  var cargo = req.body.cargo;
  var email = req.body.email;
  var cpf = req.body.cpf;
  var senha = req.body.senha;


  usuarioModel.editarFuncionario(nome, cargo, email, cpf, senha, idFuncionario)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );

}

function deletar(req, res) {
  var idFuncionario = req.params.idFuncionario;

  usuarioModel.deletar(idFuncionario).then(
      function (resultado) {
          res.json(resultado);
      }
  ).catch(
      function (erro) {
          console.log(erro);
          console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      }
  );
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  verificarCpf,
  verificarEmail,
  autenticar,
  cadastrarFuncionario,
  listarFuncionarios,
  editarFuncinario,
  deletar,
  listarDadosFuncionario,
  filtrarFuncionarios,
  validarAmbiente
};
