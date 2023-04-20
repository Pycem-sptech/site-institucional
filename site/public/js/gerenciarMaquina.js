function atualizarSelectUnidades() {
    const select = document.querySelector('#nameUnit');
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
    }else if(passwordVar != confirmPasswordVar){
        toastPadrao('error', 'Suas senhas não são iguais')
    }else{
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

function buscarDadosMaquina(idMaquina){
    fetch(`/maquina/listarDadosMaquina/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    numeroDeSerieModal.value = resposta[0].numeroSerie;
                    processadorModal.value = resposta[0].processador;
                    memoriaRamModal.value = resposta[0].ram;
                    escolherArmazenamentoModal.value = resposta[0].tipo_armazenamento;
                    qtdArmazenamentoModal.value = resposta[0].qtd_armazenamento;
                    freqCPU.value = resposta[0].freq_processador;
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

function limparCamposMaquina() {
    document.getElementById('nameUnit').value = ("");
    document.getElementById('nomeMachine').value = ("");
    document.getElementById('password').value = ("");
    document.getElementById('ram').value = ("");
    document.getElementById('storageSelect').value = ("");
    document.getElementById('qtdArmazenamento').value = ("");
}