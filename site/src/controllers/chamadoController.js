var chamadoModel = require("../models/chamadoModel");

var sessoes = [];

function listar(req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    chamadoModel.listar(fkEmpresa).then(
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

function listarChamados(req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    chamadoModel.listarChamados(fkEmpresa).then(
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

function listarOcorrenciasChamados(req, res) {
    const fkEmpresa = req.params.fkEmpresa;

    chamadoModel.listarOcorrenciasChamados(fkEmpresa).then(
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
function listarMaquinasPorUnidade(req, res) {
    const fkUnidade = req.params.fkUnidade;

    chamadoModel.listarMaquinasPorUnidade(fkUnidade).then(
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
function listarUnidadesPorMaquina(req, res) {
    const idTotem = req.params.idTotem;

    chamadoModel.listarUnidadesPorMaquina(idTotem).then(
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
function variacaoChamadoSemana(req, res) {
    const fkUnidade = req.params.fkUnidade;

    chamadoModel.variacaoChamadoSemana(fkUnidade).then(
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
function buscarChamado(req, res) {
    const idChamado = req.params.idChamado;

    chamadoModel.buscarChamado(idChamado).then(
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

function cadastrar(req, res) {
    const fkEmpresa = req.body.fkEmpresa;
    const criado_por_id = req.body.criado_por_id;
    const criado_por_nome = req.body.criado_por_nome;
    const nome_unidade = req.body.nome_unidade; 
    const usuario_totem = req.body.usuario_totem
    const fkMaquina = req.body.fkMaquina;
    const fkUnidade = req.body.fkUnidade;
    const prioridade = req.body.prioridade;
    const tipo = req.body.tipo;
    const descricao = req.body.descricao;

    console.log(usuario_totem)
    console.log(nome_unidade)

   if (fkMaquina == undefined) {
        res.status(400).send("Seu fkMaquina está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Sua descricao está undefined!");
    } else if (prioridade == undefined) {
        res.status(400).send("Sua prioridade está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("A identificação do relatorio no chamado está undefined!");
    } else if (fkUnidade == undefined) {
        res.status(400).send("A identificação da unidade no chamado está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A identificação da empresa no chamado está undefined!");
    } else if (criado_por_id == undefined) {
        res.status(400).send("A identificação do usuario no chamado está undefined!");
    } else if (criado_por_nome == undefined) {
        res.status(400).send("A identificação do usuario no chamado está undefined!");
    } else if (usuario_totem == undefined) {
        res.status(400).send("O usuario do totem no chamado está undefined!");
    } else if (nome_unidade == undefined) {
        res.status(400).send("O nome da unidade no chamado está undefined!");
    } else {
        chamadoModel.cadastrar(descricao, prioridade,tipo, usuario_totem, fkMaquina, criado_por_id, criado_por_nome, nome_unidade, fkUnidade, fkEmpresa).then(
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
}

function editar(req, res) {
    const idChamado = req.params.idChamado;
    const atribuicao = req.body.atribuicao;
    const prioridade = req.body.prioridade;
    const estado = req.body.status;
    const tipo = req.body.tipo;
    const nome_unidade = req.body.nome_unidade;
    const usuario_totem = req.body.usuario_totem;
    const descricao = req.body.descricao;
    const resolucao = req.body.resolucao;
    const fkMaquina = req.body.fkMaquina;

    if (atribuicao == undefined) {
        res.status(400).send("Sua atribuição do chamado está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("A descricao do chamado está undefined!");
    } else if (prioridade == undefined) {
        res.status(400).send("A prioridade do chamado está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua estado do chamado está undefined!");
    }   else if (tipo == undefined) {
        res.status(400).send("A tipo no chamado está undefined!");
    } else if (resolucao == undefined) {
        res.status(400).send("A resolucao no chamado está undefined!");
    } else if (nome_unidade == undefined) {
        res.status(400).send("A nome_unidade no chamado está undefined!");
    }else if (usuario_totem == undefined) {
        res.status(400).send("A usuario_totem no chamado está undefined!");
    }else if (fkMaquina == undefined) {
        res.status(400).send("A fkMaquina no chamado está undefined!");
    }else {
        chamadoModel.editar(idChamado, resolucao, descricao, tipo, prioridade, estado, nome_unidade, usuario_totem, atribuicao, fkMaquina).then(
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
}

function deletar(req, res) {
    var idChamado = req.params.idChamado;
    if (idChamado == undefined) {
        res.status(400).send("O id do Chamado está undefined!");
    } else {
        chamadoModel.deletar(idChamado).then(
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
}

function ocorrenciasPorMes(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    chamadoModel.ocorrenciasPorMes(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log("entrou no controller");
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

function frequenciaProblemasMensal(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    const idUnidade = req.params.idUnidade;
    chamadoModel.frequenciaProblemasMensal(fkEmpresa, idUnidade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log("entrou no controller");
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

module.exports = {
    listar,
    listarChamados,
    listarOcorrenciasChamados,
    listarMaquinasPorUnidade,
    listarUnidadesPorMaquina,
    ocorrenciasPorMes,
    buscarChamado,
    cadastrar,
    editar,
    deletar,
    frequenciaProblemasMensal,
    variacaoChamadoSemana
}