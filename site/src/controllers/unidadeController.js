var unidadeModel = require("../models/unidadeModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA unidadeController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    fkEmpresa = req.params.fkEmpresa;
    unidadeModel.listar(fkEmpresa).then(function (resultado) {
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

function listarDadosUnidade(req, res) {
    idUnidade = req.params.idUnidade;
    unidadeModel.listarDadosUnidade(idUnidade).then(function (resultado) {
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

function filtrarUnidades(req, res) {
    const nomeDigitado = req.params.nomeDigitado;
    const fkEmpresa = req.params.fkEmpresa;
    unidadeModel.filtrarUnidades(nomeDigitado, fkEmpresa).then(function (resultado) {
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

function listarUnidades(req, res) {
    fkEmpresa = req.params.fkEmpresa;
    unidadeModel.listarUnidades(fkEmpresa).then(function (resultado) {
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

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        unidadeModel.entrar(email, senha).then(
            function (resultado) {
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
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var telefone = req.body.telefoneServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var cep = req.body.cepServer;
    var uf = req.body.ufServer;
    var cidade = req.body.cidadeServer;
    var logragouro = req.body.logradouroServer;
    var bairro = req.body.bairroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome es tá undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Sua cep está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Sua uf está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Sua bairro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Sua numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Sua complemento está undefined!");
    } else {

        unidadeModel.cadastrar(nome, telefone, fkEmpresa, cep, uf, cidade, logragouro, bairro, numero, complemento).then(
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

function verificarTelefone(req, res) {
    var telefone = req.params.telefone;

    unidadeModel.verificarTelefone(telefone).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ranking: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarNumero(req, res) {
    var numero = req.params.numero;

    unidadeModel.verificarNumero(numero).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ranking: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function deletar(req, res) {
    var idUnidade = req.params.idUnidade;

    unidadeModel.deletar(idUnidade).then(
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

function editar(req, res) {
    var idUnidade = req.params.idUnidade;
    var nome = req.body.nome;
    var logradouro = req.body.logradouro;
    var cep = req.body.cep;
    var uf = req.body.uf;
    var cidade = req.body.cidade;
    var bairro = req.body.bairro;
    var numero = req.body.numero;
    var telefone = req.body.telefone;
    

    unidadeModel.editar(nome, logradouro, cep, uf, cidade, bairro, numero, telefone, idUnidade)
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
module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    deletar,
    verificarTelefone,
    verificarNumero,
    listarUnidades,
    editar,
    listarDadosUnidade,
    filtrarUnidades
}