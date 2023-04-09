function buscarDadosRelatorio(idRelatorio) {
    fetch(`/relatorio/buscarDadosRelatorio/${idRelatorio}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    titulo_inp.value = resposta[0].nome;
                    data_inp.value = resposta[0].dataPublicacao;
                    descricao_inp.value = resposta[0].descricao;
                    tipo_inp.value = resposta[0].tipo;
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

}

function atualizarFuncionariosCadastrados() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;
    fetch(`/usuario/listarFuncionarios/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("feed");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Infelizmente, nenhuma máquina foi encontrada.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed");
                    feed.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];
                        sessionStorage.idFuncionario = publicacao.idUsuario;

                        var divFeed = document.createElement("div");
                        var divRegisteredEmployee = document.createElement("div");
                        var divIdEmployee = document.createElement("div");
                        var spanEmployeeName = document.createElement("span");
                        var spanCargoEmployee = document.createElement("span");
                        var divBtnEditDelete = document.createElement("div");

                        divFeed.className = "feed"

                        divRegisteredEmployee.className = "RegisteredEmployee";
                        divIdEmployee.className = "IdEmployee";
                        spanCargoEmployee.className = "addresOpacity";
                        spanCargoEmployee.innerHTML = publicacao.cargo;
                        spanEmployeeName.innerHTML = publicacao.nome;

                        divBtnEditDelete.className = "btnEditDelete";
                        divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idUsuario}), buscarDadosFuncionario(${publicacao.idUsuario})'>`;
                        divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarFuncionario(${publicacao.idUsuario})'>`;

                        feed.appendChild(divRegisteredEmployee);
                        divRegisteredEmployee.appendChild(divIdEmployee);
                        divRegisteredEmployee.appendChild(divBtnEditDelete);
                        divIdEmployee.appendChild(spanEmployeeName);
                        divIdEmployee.appendChild(spanCargoEmployee);

                    }

                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function filtrarFuncionarios(nomeDigitado) {
    if (nomeDigitado.length > 0) {
        const fkEmpresaVar = sessionStorage.FK_EMPRESA;
        fetch(`/usuario/filtrarFuncionarios/${nomeDigitado}/${fkEmpresaVar}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        var feed = document.getElementById("feed");
                        feed.innerHTML = "";
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Infelizmente, nenhum funcionário foi encontrado.";
                        feed.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!!";
                    }
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        var feed = document.getElementById("feed");
                        feed.innerHTML = "";
                        for (let i = 0; i < resposta.length; i++) {
                            var publicacao = resposta[i];
                            sessionStorage.idFuncionario = publicacao.idUsuario;

                            var divFeed = document.createElement("div");
                            var divRegisteredEmployee = document.createElement("div");
                            var divIdEmployee = document.createElement("div");
                            var spanEmployeeName = document.createElement("span");
                            var spanCargoEmployee = document.createElement("span");
                            var divBtnEditDelete = document.createElement("div");

                            divFeed.className = "feed"

                            divRegisteredEmployee.className = "RegisteredEmployee";
                            divIdEmployee.className = "IdEmployee";
                            spanCargoEmployee.className = "addresOpacity";
                            spanCargoEmployee.innerHTML = publicacao.cargo;
                            spanEmployeeName.innerHTML = publicacao.nome;

                            divBtnEditDelete.className = "btnEditDelete";
                            divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idUsuario}), buscarDadosFuncionario(${publicacao.idUsuario})'>`;
                            divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarFuncionario(${publicacao.idUsuario})'>`;

                            feed.appendChild(divRegisteredEmployee);
                            divRegisteredEmployee.appendChild(divIdEmployee);
                            divRegisteredEmployee.appendChild(divBtnEditDelete);
                            divIdEmployee.appendChild(spanEmployeeName);
                            divIdEmployee.appendChild(spanCargoEmployee);

                        }

                    });
                } else {
                    throw "Houve um erro na API!";
                }
            })
            .catch(function (resposta) {
                console.error(resposta);
            });
    } else {
        atualizarFuncionariosCadastrados(); s
    }
}