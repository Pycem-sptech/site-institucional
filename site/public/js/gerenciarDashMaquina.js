function buscarDadosRelatorio(idRelatorio) {
    fetch(`/relatorio/buscarDadosRelatorio/${idRelatorio}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    titulo_inp.value = resposta[0].titulo;
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

function atualizarMaquinasCadastradasComStatus() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;
    fetch(`/maquina/listar/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var machineField = document.getElementById("machineField");
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
                        spanNumeroSerie.innerHTML = publicacao.numeroSerie;

                        if (publicacao.status == 'Disponivel') {
                            divStatus.className = "status ok";
                        } else if (publicacao.status == 'Manutencao') {
                            divStatus.className = "status alert";
                        } else {
                            divStatus.className = "status danger";
                        }

                        machineField.appendChild(divMachine);
                        divMachine.appendChild(divContainer);

                        divContainer.appendChild(divMachineDetails);
                        divContainer.appendChild(divStatus);
                        
                        divMachineDetails.appendChild(spanIcon);
                        divMachineDetails.appendChild(divInfoMachine);

                        divInfoMachine.appendChild(spanNumeroSerie);
                        divInfoMachine.appendChild(spanNomeUnidade);

                        spanIcon.innerHTML = '<img src="img/smartphoneOpacity.svg">';
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
                        var machineField = document.getElementById("machineField");
                        machineField.innerHTML = "";
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Infelizmente, nenhum funcionário foi encontrado.";
                        machineField.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!!";
                    }
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        var machineField = document.getElementById("machineField");
                        machineField.innerHTML = "";
                        for (let i = 0; i < resposta.length; i++) {
                            var publicacao = resposta[i];
                            sessionStorage.idFuncionario = publicacao.idUsuario;

                            var divMachineField = document.createElement("div");
                            var divRegisteredEmployee = document.createElement("div");
                            var divIdEmployee = document.createElement("div");
                            var spanEmployeeName = document.createElement("span");
                            var spanCargoEmployee = document.createElement("span");
                            var divStatus = document.createElement("div");

                            divMachineField.className = "machineField"

                            divRegisteredEmployee.className = "RegisteredEmployee";
                            divIdEmployee.className = "IdEmployee";
                            spanCargoEmployee.className = "addresOpacity";
                            spanCargoEmployee.innerHTML = publicacao.cargo;
                            spanEmployeeName.innerHTML = publicacao.nome;

                            divStatus.className = "Status";
                            divStatus.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idUsuario}), buscarDadosFuncionario(${publicacao.idUsuario})'>`;
                            divStatus.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarFuncionario(${publicacao.idUsuario})'>`;

                            machineField.appendChild(divRegisteredEmployee);
                            divRegisteredEmployee.appendChild(divIdEmployee);
                            divRegisteredEmployee.appendChild(divStatus);
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