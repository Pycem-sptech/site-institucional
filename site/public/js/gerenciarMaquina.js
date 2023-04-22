let dadosMaquina = {}


function atualizarSelectUnidades(idSelect) {
    const select = document.querySelector(idSelect);
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;

    fetch(`/unidade/listarUnidades/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    for (var i = 0; i < resposta.length; i++) {
                        select.options[select.options.length] = new Option(resposta[i].nome, resposta[i].idUnidade);
                    }
                }
                );
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

    return false;
}

function cadastrarMaquina() {
    const fkUnidadeVar = nameUnit.value;
    const nomeMachineVar = nomeMachine.value;
    const passwordVar = password.value;
    const confirmPasswordVar = confirmPassword.value;
    if (fkUnidadeVar == "" || nomeMachineVar == "" || passwordVar == "" || confirmPasswordVar == "") {
        toastPadrao('error', 'Preencha os campos que estão vazios')
        return false;
    } else if (passwordVar != confirmPasswordVar) {
        toastPadrao('error', 'Suas senhas não são iguais')
    } else {
        fetch("/maquina/cadastrarMaquina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkUnidadeServer: fkUnidadeVar,
                nomeMachineServer: nomeMachineVar,
                passwordServer: passwordVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                if (resposta.ok) {
                    atualizarMaquinasCadastradas();
                    limparCamposMaquina();
                    toastPadrao('success', 'Cadastro realizado com sucesso!');
                } else {
                    toastPadrao('error', 'Houve um erro ao tentar realizar o cadastro!');
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

function buscarDadosMaquina(idMaquina, tipo = "modal") {
    fetch(`/maquina/listarDadosMaquina/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    dadosMaquina.idUnidade = resposta[0].fkUnidade;
                    dadosMaquina.numeroSerie = resposta[0].numeroSerie;
                    dadosMaquina.processador = resposta[0].processador;
                    dadosMaquina.ram = resposta[0].ram;
                    dadosMaquina.tipoArmazenamento = resposta[0].tipo_armazenamento;
                    dadosMaquina.qtdArmazenamento = resposta[0].qtd_armazenamento;
                    dadosMaquina.usuario = resposta[0].usuario;
                    dadosMaquina.senha = resposta[0].senha;
                    if (tipo == "subTitulo") {
                        postarSubTitulo();
                    } if (tipo == "modal") {
                        postarModalDados();
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

function postarModalDados() {
    escolherUnidadeModal.value = dadosMaquina.idUnidade;
    numeroDeSerieModal.value = dadosMaquina.numeroSerie;
    processadorModal.value = dadosMaquina.processador;
    memoriaRamModal.value = dadosMaquina.ram;
    escolherArmazenamentoModal.value = dadosMaquina.tipoArmazenamento;
    qtdArmazenamentoModal.value = dadosMaquina.qtdArmazenamento;
    usuarioModal.value = dadosMaquina.usuario;
    senhaModal.value = dadosMaquina.senha;
}

function postarSubTitulo() {
    qtd_cpu.innerHTML = dadosMaquina.processador;
    qtd_ram.innerHTML = dadosMaquina.ram;
    qtd_armazenamento.innerHTML = dadosMaquina.qtdArmazenamento;
}

function buscarDadosEstado(idMaquina) {
    fetch(`/maquina/listarDadosMaquina/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    trocarStatus.value = resposta[0].estado;
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}


function atualizarMaquinasCadastradas() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;
    fetch(`/maquina/listarMaquinas/${fkEmpresaVar}`)
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

                        var divFeed = document.createElement("div");
                        var divRegisteredMachine = document.createElement("div");
                        var divIdMachine = document.createElement("div");
                        var spanNumeroSerie = document.createElement("span");
                        var spanNomeUnidade = document.createElement("span");
                        var divBtnEditDelete = document.createElement("div");

                        divFeed.className = "feed"

                        divRegisteredMachine.className = "registeredMachine";
                        divIdMachine.className = "idMachine";
                        spanNomeUnidade.className = "addresOpacity";
                        spanNomeUnidade.innerHTML = publicacao.nomeUnidade;
                        spanNumeroSerie.innerHTML = publicacao.usuario;

                        divBtnEditDelete.className = "btnEditDelete";
                        divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idTotem}), buscarDadosMaquina(${publicacao.idTotem})'>`;
                        divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarMaquina(${publicacao.idTotem})'>`;

                        feed.appendChild(divRegisteredMachine);
                        divRegisteredMachine.appendChild(divIdMachine);
                        divRegisteredMachine.appendChild(divBtnEditDelete);
                        divIdMachine.appendChild(spanNumeroSerie);
                        divIdMachine.appendChild(spanNomeUnidade);

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

function filtrarMaquinas(nomeDigitado) {
    if (nomeDigitado.length > 0) {
        fetch(`/maquina/filtrarMaquinas/${nomeDigitado}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        var feed = document.getElementById("feed");
                        feed.innerHTML = "";
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

                            var divFeed = document.createElement("div");
                            var divRegisteredMachine = document.createElement("div");
                            var divIdMachine = document.createElement("div");
                            var spanNumeroSerie = document.createElement("span");
                            var spanNomeUnidade = document.createElement("span");
                            var divBtnEditDelete = document.createElement("div");

                            divFeed.className = "feed"

                            divRegisteredMachine.className = "registeredMachine";
                            divIdMachine.className = "idMachine";
                            spanNomeUnidade.className = "addresOpacity";
                            spanNomeUnidade.innerHTML = publicacao.nomeUnidade;
                            spanNumeroSerie.innerHTML = publicacao.usuario;
                            divBtnEditDelete.className = "btnEditDelete";
                            divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idTotem}), buscarDadosMaquina(${publicacao.idTotem})'>`;
                            divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarMaquina(${publicacao.idTotem})'>`;

                            feed.appendChild(divRegisteredMachine);
                            divRegisteredMachine.appendChild(divIdMachine);
                            divRegisteredMachine.appendChild(divBtnEditDelete);
                            divIdMachine.appendChild(spanNumeroSerie);
                            divIdMachine.appendChild(spanNomeUnidade);
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
        atualizarMaquinasCadastradas();
    }
}

function filtrarMaquinasDash(nomeDigitado) {
    if (nomeDigitado.length > 0) {
        const idUnidade = sessionStorage.ID_UNIDADE
        fetch(`/maquina/filtrarMaquinasDash/${nomeDigitado}/${idUnidade}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        var machineField = document.getElementById("machineField");
                        machineField.innerHTML = "";
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Infelizmente, nenhuma máquina foi encontrada.";
                        machineField.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!!";
                    }
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        var machineField = document.getElementById("machineField");
                        machineField.innerHTML = "";
                        for (let i = 0; i < resposta.length; i++) {
                            var publicacao = resposta[i];

                            var divMachineField = document.createElement("div");
                            var divMachine = document.createElement("div");

                            var divContainer = document.createElement("div");
                            var divMachineDetails = document.createElement("div");
                            var spanIcon = document.createElement("span");

                            var divInfoMachine = document.createElement("div");
                            var spanNumeroSerie = document.createElement("span");
                            var spanNomeUnidade = document.createElement("span");
                            var divStatus = document.createElement("div");

                            divMachineField.className = "machineField";
                            divMachine.className = "machine";
                            divContainer.className = "container";
                            divMachineDetails.className = "machineDetails";
                            spanIcon.className = "iconMachine";

                            divInfoMachine.className = "infoMachine";
                            spanNomeUnidade.className = "txtDetailMachine";
                            spanNomeUnidade.innerHTML = publicacao.nomeUnidade;
                            spanNumeroSerie.innerHTML = publicacao.usuario;
                            divStatus.id = i
                            if (publicacao.status == 'Disponivel') {
                                divStatus.className = "status ok";
                                maqDisponivel++;
                            } else if (publicacao.status == 'Manutencao') {
                                divStatus.className = "status alert";
                                maqManutencao++;
                            } else {
                                divStatus.className = "status danger";
                                maqDesligado++;
                            }

                            divMachine.setAttribute("onclick", `redirectGraficos(${publicacao.idTotem}, '${publicacao.usuario}')`);
                            machineField.appendChild(divMachine);

                            divMachine.appendChild(divContainer);

                            divContainer.appendChild(divMachineDetails);
                            divContainer.appendChild(divStatus);

                            divMachineDetails.appendChild(spanIcon);
                            divMachineDetails.appendChild(divInfoMachine);

                            divInfoMachine.appendChild(spanNumeroSerie);
                            divInfoMachine.appendChild(spanNomeUnidade);

                            spanIcon.innerHTML = '<img src="img/smartphoneOpacity.svg">'
                        }
                        atualizarStatusBoxMachine();
                    });
                } else {
                    throw "Houve um erro na API!";
                }
            })
            .catch(function (resposta) {
                console.error(resposta);
            });
    } else {
        atualizarMaquinasCadastradas();
    }
}

function limparCamposMaquina() {
    document.getElementById('nameUnit').value = ("");
    document.getElementById('nomeMachine').value = ("");
    document.getElementById('password').value = ("");
    document.getElementById('ram').value = ("");
    document.getElementById('storageSelect').value = ("");
    document.getElementById('qtdArmazenamento').value = ("");
}

var statusAntigo = "";
function atualizarStatusMaquina(idTotem) {
    const statusNovo = trocarStatus.value;
    if (statusAntigo == statusNovo) {
        toastPadrao('error', `O estado já é ${statusNovo}`)
    } else {
        statusAntigo = statusNovo;
        fetch(`/maquina/atualizarStatusMaquina/${idTotem}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusNovoServer: statusNovo,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    toastPadrao('success', `Status atualizada para ${statusNovo} com sucesso!`);
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }

}
