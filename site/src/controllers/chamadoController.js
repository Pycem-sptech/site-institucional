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
function cadastrar(req, res) {
    const fkMaquina = req.body.fkMaquina;
    const fkUnidade = req.body.fkUnidade;
    const dataInicio = req.body.dataInicio;
    const prioridade = req.body.prioridade;
    const tipo = req.body.tipo;
    const descricao = req.body.descricao;
    const fkEmpresa = req.body.fkEmpresa;


    if (fkMaquina == undefined) {
        res.status(400).send("Seu fkMaquina está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Sua descricao está undefined!");
    } else if (prioridade == undefined) {
        res.status(400).send("Sua prioridade está undefined!");
    }else if (dataInicio == undefined) {
        res.status(400).send("Sua dataInicio está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("A identificação do relatorio no chamado está undefined!");
    } else if (fkUnidade == undefined) {
        res.status(400).send("A identificação da unidade no chamado está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A identificação da empresa no chamado está undefined!");
    } else {
        chamadoModel.cadastrar(dataInicio, tipo, descricao, prioridade, fkMaquina, fkUnidade, fkEmpresa).then(
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
    const fkTotem = req.body.fkMaquina;
    const fkUnidade = req.body.fkUnidade;
    const atribuicao = req.body.atribuicao;
    const dataInicio = req.body.dataInicio;
    const dataFim = req.body.dataFim;
    const prioridade = req.body.prioridade;
    const estado = req.body.status;
    const tipo = req.body.tipo;
    const descricao = req.body.descricao;


    if (atribuicao == undefined) {
        res.status(400).send("Seu fkMaquina do chamado está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("A descricao do chamado está undefined!");
    } else if (prioridade == undefined) {
        res.status(400).send("A prioridade do chamado está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua estado do chamado está undefined!");
    } else if (atribuicao == undefined) {
        res.status(400).send("A atribuicao do chamado está undefined!");
    } else if (fkTotem == undefined) {
        res.status(400).send("A identificação do totem no chamado está undefined!");
    } else if (fkUnidade == undefined) {
        res.status(400).send("A identificação da unidade no chamado está undefined!");
    } else if (dataInicio == undefined) {
        res.status(400).send("A dataInicio no chamado está undefined!");
    } else if (dataFim == undefined) {
        res.status(400).send("A dataFim no chamado está undefined!");
    }  else if (dataFim == undefined) {
        res.status(400).send("A dataFim no chamado está undefined!");
    }  else if (tipo == undefined) {
        res.status(400).send("A tipo no chamado está undefined!");
    }else {
        chamadoModel.editar(idChamado, descricao, tipo, prioridade, estado, atribuicao, dataInicio, dataFim, fkTotem, fkUnidade).then(
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

module.exports = {
    listar,
    cadastrar,
    editar,
    deletar
}