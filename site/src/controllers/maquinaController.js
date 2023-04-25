var maquinaModel = require("../models/maquinaModel");

function listar(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    const fkUnidade = req.params.fkUnidade;
    maquinaModel.listar(fkEmpresa, fkUnidade).then(function (resultado) {
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
function listarStatusTotem(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    maquinaModel.listarStatusTotem(fkEmpresa).then(function (resultado) {
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

function listarMaquinas(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    maquinaModel.listarMaquinas(fkEmpresa, ).then(function (resultado) {
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

function filtrarMaquinas(req, res) {
    nomeDigitado = req.params.nomeDigitado;
    fkEmpresa = req.params.fkEmpresa;
    maquinaModel.filtrarMaquinas(nomeDigitado, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function filtrarMaquinasDash(req, res) {
    nomeDigitado = req.params.nomeDigitado;
    idUnidade = req.params.idUnidade;
    maquinaModel.filtrarMaquinasDash(nomeDigitado, idUnidade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
function listarUsoMaquina(req, res) {
    fkTotem = req.params.fkTotem;
    maquinaModel.listarUsoMaquina(fkTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
function listarUltimosDados(req, res) {
    fkTotem = req.params.fkTotem;
    maquinaModel.listarUltimosDados(fkTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function cadastrarMaquina(req, res) {
    const fkUnidade = req.body.fkUnidadeServer;
    const nomeMachine = req.body.nomeMachineServer;
    const password = req.body.passwordServer;

    if (fkUnidade == undefined) {
        res.status(400).send("Seu fkUnidade es tá undefined!");
    } else if (nomeMachine == undefined) {
        res.status(400).send("Seu numeroSerial está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua processador está undefined!");
    }else {

        maquinaModel.cadastrarMaquina(fkUnidade, nomeMachine, password).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ",erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    maquinaModel.listarPorUsuario(idUsuario).then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os maquinas: ",erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function listarDadosMaquina(req, res) {
    idMaquina = req.params.idMaquina;
    maquinaModel.listarDadosMaquina(idMaquina).then(function (resultado) {
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
function listarStatusMaqEmTempoReal(req, res) {
    fkUnidade = req.params.fkUnidade;
    maquinaModel.listarStatusMaqEmTempoReal(fkUnidade).then(function (resultado) {
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
function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    maquinaModel.pesquisarDescricao(descricao).then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os maquinas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function publicar(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        maquinaModel.publicar(titulo, descricao, idUsuario).then(
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
}

function editar(req, res) {
    const numeroSerial = req.body.numeroDeSerie;
    const processador = req.body.processador;
    const ram = req.body.memoriaRam;
    const qtdArmazenamento = req.body.qtdArmazenamento;
    const storageSelect = req.body.tipoArmazenamento;
    const idMaquina = req.params.idMaquina;

    maquinaModel.editar(numeroSerial, processador, ram, qtdArmazenamento, storageSelect, idMaquina).then(
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
function atualizarStatusMaquina(req, res) {
    const statusNovo = req.body.statusNovoServer;
    const idMaquina = req.params.idMaquina;

    maquinaModel.atualizarStatusMaquina(idMaquina,statusNovo).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );

}

function atualizarListaMaquinasFiltradas(req, res) {
    const nomeDigitado = req.params.nomeDigitado;
    const fkEmpresa = req.params.fkEmpresa;

    maquinaModel.atualizarListaMaquinasFiltradas(fkEmpresa, nomeDigitado).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );

}
function atualizarListaMaquinas(req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    maquinaModel.atualizarListaMaquinas(fkEmpresa).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );

}
function mudarEstadoMaquina(req, res) {
    const idTotem = req.params.idTotem;

    maquinaModel.mudarEstadoMaquina(idTotem).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );

}

function deletarRegistroMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.deletarRegistroMaquina(idMaquina).then(
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
    listar,
    listarMaquinas,
    listarPorUsuario,
    listarStatusMaqEmTempoReal,
    pesquisarDescricao,
    publicar,
    editar,
    deletarRegistroMaquina,
    cadastrarMaquina,
    listarDadosMaquina,
    filtrarMaquinas,
    listarUsoMaquina,
    listarUltimosDados,
    listarStatusTotem,
    atualizarStatusMaquina,
    filtrarMaquinasDash,
    atualizarListaMaquinasFiltradas,
    atualizarListaMaquinas,
    mudarEstadoMaquina
}