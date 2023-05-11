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
    const fkEmpresa = req.params.fkEmpresa;

    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var prioridade = req.body.prioridadeServer;
    var estado = req.body.estadoServer;
    var atribuicao = req.body.atribuicaoServer;
    var fkTotem = req.body.fkTotemServer;
    var fkRelatorio = req.body.fkRelatorioServer;
    var fkUnidade = req.body.fkUnidadeServer;

    if (titulo == undefined) {
        res.status(400).send("Seu titulo está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Sua descricao está undefined!");
    } else if (prioridade == undefined) {
        res.status(400).send("Sua prioridade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua estado está undefined!");
    } else if (atribuicao == undefined) {
        res.status(400).send("Sua atribuicao está undefined!");
    } else if (fkTotem == undefined) {
        res.status(400).send("A identificação do totem no chamado está undefined!");
    } else if (fkRelatorio == undefined) {
        res.status(400).send("A identificação do relatorio no chamado está undefined!");
    } else if (fkUnidade == undefined) {
        res.status(400).send("A identificação da unidade no chamado está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A identificação da empresa no chamado está undefined!");
    } else {
        chamadoModel.cadastrar(titulo,descricao,prioridade,estado,atribuicao,fkTotem,fkRelatorio,fkUnidade,fkEmpresa).then(
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

    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var prioridade = req.body.prioridadeServer;
    var estado = req.body.estadoServer;
    var atribuicao = req.body.atribuicaoServer;
    var fkTotem = req.body.fkTotemServer;
    var fkRelatorio = req.body.fkRelatorioServer;
    var fkUnidade = req.body.fkUnidadeServer;

    if (titulo == undefined) {
        res.status(400).send("Seu titulo do chamado está undefined!");
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
    } else if (fkRelatorio == undefined) {
        res.status(400).send("A identificação do relatorio no chamado está undefined!");
    } else if (fkUnidade == undefined) {
        res.status(400).send("A identificação da unidade no chamado está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A identificação da empresa no chamado está undefined!");
    } else {
        chamadoModel.editar(idChamado).then(
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