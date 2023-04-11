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
function atualizarRelatoriosCadastrados(fkMaquina) {
    console.log(fkMaquina)
    fetch(`/relatorio/listarRelatorio/${fkMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var reportsField = document.
                        getElementById("reportsField");
                    reportsField.innerHTML = "";
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Infelizmente, nenhum relatório foi encontrado.";
                    reportsField.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var reportsField = document.getElementById("reportsField");
                    reportsField.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];

                        var divReportsField = document.createElement("div");
                        var divProblemReport = document.createElement("div");
                        var divContainer = document.createElement("div");
                        var divIconReport = document.createElement("img");
                        var divIdReport = document.createElement("span");
                        var divTitleReport = document.createElement("span");
                        var divDateReport = document.createElement("span");
                        var divDetailsReport = document.createElement("span");
                        var divBtnViewReport = document.createElement("img");



                        divReportsField.className = "reportsField";
                        divProblemReport.className = "problemReport";
                        divContainer.className = "container"
                        divIconReport.className = "iconReport";
                        divIdReport.className = "idReport";
                        divTitleReport.className = "titleReport";
                        divDateReport.className = "dateReport";
                        divDetailsReport.className = "detailsReport";
                        divBtnViewReport.className = "btnViewReport";

                        divIconReport.src = "img/iconRelatorio.svg";
                        divIconReport.alt = "icon de relatorio";
                        divIdReport.innerHTML = i;
                        divTitleReport.innerHTML = publicacao.titulo;
                        divDateReport.innerHTML = publicacao.data;
                        divDetailsReport.innerHTML = publicacao.descricao;
                        divBtnViewReport.src = "img/btnVisualizarRelatorio.svg";
                        divBtnViewReport.setAttribute("onclick", `mostrarModalRelatorio()`);

                        reportsField.appendChild(divProblemReport);
                        divProblemReport.appendChild(divContainer);
                        divContainer.appendChild(divIconReport);
                        divContainer.appendChild(divIdReport);
                        divContainer.appendChild(divTitleReport);
                        divContainer.appendChild(divDateReport);
                        divContainer.appendChild(divDetailsReport);
                        divContainer.appendChild(divBtnViewReport);

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
        atualizarFuncionariosCadastrados();
    }
}
var intervalo = "";
var resposta_old = "";
var intervaloDeAtualizacao = 5000
var maqDisponivel = 0;
var maqManutencao = 0;
var maqDesligado = 0;

function mudarTempoDeExibicao(intervaloDesejado) {
    intervaloDeAtualizacao = intervaloDesejado * 1000
    maqDisponivel = 0;
    maqManutencao = 0;
    maqDesligado = 0;
    atualizarMaqCadastradasComStatus()
}

function atualizarMaqCadastradasComStatus() {
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
                        divMachine.setAttribute("onclick", `atualizarRelatoriosCadastrados(${publicacao.idTotem})`);
                        divContainer.className = "container";
                        divMachineDetails.className = "machineDetails";
                        spanIcon.className = "iconMachine";

                        divInfoMachine.className = "infoMachine";
                        spanNomeUnidade.className = "txtDetailMachine";
                        spanNomeUnidade.innerHTML = publicacao.nomeUnidade;
                        spanNumeroSerie.innerHTML = publicacao.numeroSerie;
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

var atualizando = false;
function atualizarStatusMaqEmTempoReal() {
    if (atualizando) {
        clearInterval(atualizar);
    } else {
        var atualizar = setInterval(function () {
            atualizando = true
            const fkUnidade = sessionStorage.VER_UNIDADE;
            fetch(`/maquina/listarStatusMaqEmTempoReal/${fkUnidade}`).then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) { }
                        resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));
                        var totalMaquinas = maqDisponivel + maqManutencao + maqDesligado;
                        if (totalMaquinas != resposta[0].totalMaquinas) {
                            atualizarMaqCadastradasComStatus()
                            
                        } else if (resposta[0].Disponivel == maqDisponivel && resposta[0].Manutencao ==     maqManutencao && resposta[0].Desligado == maqDesligado) {
                            console.log("As máquinas ainda estão atualizadas")
                        } else {
                            for (let i = 0; i < resposta.length; i++) {
                                var publicacao = resposta[i];
                                var statusId = document.getElementById(`${i}`)
                                if (publicacao.status == 'Disponivel') {
                                    statusId.className = "status ok";
                                } else if (publicacao.status == 'Manutencao') {
                                    statusId.className = "status alert";
                                } else {
                                    statusId.className = "status danger";
                                }
                            }
                        }
                    });
                } else {
                    throw "Houve um erro na API!";
                }
            })
                .catch(function (resposta) {
                    console.error(resposta);
                });
        }, intervaloDeAtualizacao);
    }
}