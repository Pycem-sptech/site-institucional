var maquinaModel = require("../models/maquinaModel");

function testar(req, res) {
    console.log("ENTRAMOS NO maquinaController");
    res.send("ENTRAMOS NO maquina CONTROLLER");
}

function listar(req, res) {
    maquinaModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as maquinas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function cadastrarMaquina(req, res) {
    var nome = req.body.nomeServer;
    var numeroSerial = req.body.numeroSerialServer;
    var processador = req.body.processadorServer;
    var ram = req.body.ramServer;
    var qtdArmazenamento = req.body.qtdArmazenamentoServer;
    var storageSelect = req.body.storageSelectServer;
    
    if (nome == undefined) {
        res.status(400).send("Seu nome es tá undefined!");
    } else if (numeroSerial == undefined) {
        res.status(400).send("Seu numeroSerial está undefined!");
    } else if (processador == undefined) {
        res.status(400).send("Sua processador está undefined!");
    } else if (ram == undefined) {
        res.status(400).send("Sua ram está undefined!");
    } else if (storageSelect == undefined) {
        res.status(400).send("Sua storageSelect está undefined!");
    } else if (qtdArmazenamento == undefined) {
        res.status(400).send("Sua qtdArmazenamento está undefined!");
    } else {

        maquinaModel.cadastrarMaquina(nome, numeroSerial, processador, ram, qtdArmazenamento, storageSelect)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    maquinaModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os maquinas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    maquinaModel.pesquisarDescricao(descricao)
        .then(
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
        maquinaModel.publicar(titulo, descricao, idUsuario)
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
}

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idmaquina = req.params.idmaquina;

    maquinaModel.editar(novaDescricao, idmaquina)
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
    var idmaquina = req.params.idmaquina;

    maquinaModel.deletar(idmaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    testar,
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    cadastrarMaquina
}