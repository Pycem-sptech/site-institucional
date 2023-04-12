function buscarDadosRelatorio(idRelatorio) {
    fetch(`/relatorio/buscarDadosRelatorio/${idRelatorio}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    tituloModal.value = resposta[0].titulo;
                    dataModal.value = resposta[0].dataPublicacao;
                    escolherTipoProblemaModal.value = resposta[0].tipo;
                    descricaoModal.value = resposta[0].descricao;
                    dataModal.value =  resposta[0].dataRelatorio.replaceAll("-", "/")
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

}

function mudarIdSecionado(id){
    sessionStorage.ID_SELECIONADO = id;
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
                        divBtnViewReport.setAttribute("onclick", `mostrarModalRelatorio(1), buscarDadosRelatorio(${publicacao.idRelatorio})`);

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

function cadastrarRelatorio() {
    const tituloVar = tituloModal.value;
    const dataVar = dataModal.value;
    const tipoVar = escolherTipoProblemaModal.value;
    const descricaoVar = descricaoModal.value;
    const fkMaquinaVar = sessionStorage.ID_SELECIONADO;

    if (tituloVar == "" || dataVar == "" || descricaoVar == "" || tipoVar == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "error",
            title: "Preencha os campos estão vazios",
        });
        return false;

    } else {
        fetch("/relatorio/cadastrarRelatorio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo: tituloVar,
                data: dataVar,
                tipo: tipoVar,
                descricao: descricaoVar,
                emailUserServer: fkMaquinaVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Cadastro realizado com sucesso!",
                    });

                    atualizarRelatoriosCadastrados(sessionStorage.ID_SELECIONADO);
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

var intervalo = "";
var resposta_old = "";
var intervaloDeAtualizacao = 5000

function mudarTempoDeExibicao(intervaloDesejado) {
    intervaloDeAtualizacao = intervaloDesejado * 1000
    atualizarMaqCadastradasComStatusEmTempoReal()
}

function atualizarMaqCadastradasComStatusEmTempoReal() {
    clearInterval(intervalo)
    intervalo = setInterval(function () {
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

                        if (resposta_old == "") {
                            resposta_old = resposta;
                        } else if (resposta_old == resposta) {
                            console.log("Não atualizou nada");
                        } else {


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
                                divMachine.setAttribute("onclick", `atualizarRelatoriosCadastrados(${publicacao.idTotem}), mudarIdSecionado(${publicacao.idTotem})`);
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
                        }
                    });
                } else {
                    throw "Houve um erro na API!";
                }
            })
            .catch(function (resposta) {
                console.error(resposta);
            });
    }, intervaloDeAtualizacao)
}


