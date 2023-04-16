var alertaModel = require("../models/alertaModel");

var sessoes = [];

function listarAlertas(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  alertaModel.listarAlertas(fkEmpresa).then(function (resultado) {
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

function editarFrequenciaAtualizacao(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novaFrequencia = req.body.novaFrequenciaServer;
  
  console.log(novaFrequencia)
  if (novaFrequencia == undefined) {
    res.status(400).send("Seu novaFrequencia está undefined!");
  } else {
    alertaModel.editarFrequenciaAtualizacao(fkEmpresa, novaFrequencia).then(function (resultado) {
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

function editarProcessadorAlerta(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novoAlerta = req.body.novoAlertaServer;
  
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.editarProcessadorAlerta(fkEmpresa, novoAlerta).then(function (resultado) {
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
function editarProcessadorAlertaCritico(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novoAlerta = req.body.novoAlertaServer;
  
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.editarProcessadorAlerta(fkEmpresa, novoAlerta).then(function (resultado) {
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
function editarRamAlerta(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novoAlerta = req.body.novoAlertaServer;
  
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.editarRamAlerta(fkEmpresa, novoAlerta).then(function (resultado) {
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
function editarRamAlertaCritico(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novoAlerta = req.body.novoAlertaServer;
  
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.editarRamAlertaCritico(fkEmpresa, novoAlerta).then(function (resultado) {
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
function editarHdAlerta(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novoAlerta = req.body.novoAlertaServer;
  
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.editarHdAlerta(fkEmpresa, novoAlerta).then(function (resultado) {
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
function editarHdAlertaCritico(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  const novoAlerta = req.body.novoAlertaServer;
  
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.editarHdAlertaCritico(fkEmpresa, novoAlerta).then(function (resultado) {
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
function padronizarTodosAlertas(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.padronizarTodosAlertas(fkEmpresa).then(function (resultado) {
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
function padronizarFrequenciaAtualizacao(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.padronizarFrequenciaAtualizacao(fkEmpresa).then(function (resultado) {
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
function padronizarProcessadorAlerta(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.padronizarProcessadorAlerta(fkEmpresa).then(function (resultado) {
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
function padronizarRamAlerta(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.padronizarRamAlerta(fkEmpresa).then(function (resultado) {
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
function padronizarHdAlerta(req, res) {
  const fkEmpresa = req.params.fkEmpresa;
  if (novoAlerta == undefined) {
    res.status(400).send("O alerta está undefined");
  } else {
    alertaModel.padronizarHdAlerta(fkEmpresa).then(function (resultado) {
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


module.exports = {
  listarAlertas,
  editarFrequenciaAtualizacao,
  editarProcessadorAlerta,
  editarProcessadorAlertaCritico,
  editarRamAlerta,
  editarRamAlertaCritico,
  editarHdAlerta,
  editarHdAlertaCritico,
  padronizarTodosAlertas,
  padronizarFrequenciaAtualizacao,
  padronizarProcessadorAlerta,
  padronizarRamAlerta,
  padronizarHdAlerta
};
