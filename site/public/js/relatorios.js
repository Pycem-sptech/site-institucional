function atualizarRelatorios(idTotem) {
    fetch(`/relatorio/listarRelatoriosTotem/${idTotem}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var machineField = document.getElementById("machineField");
                machineField.innerHTML = "";
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Infelizmente, nenhum relatório foi encontrado.";
                machineField.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var machineField = document.getElementById("machineField");
                machineField.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var report = document.createElement("div");
                    var iconReport = document.createElement("img");
                    var titleReport = document.createElement("div");
                    var dateReport = document.createElement("div");
                    var btnViewReport = document.createElement("img");

                    machineField.className = "machineField";
                    report.className = "report";

                    iconReport.className = "iconReport";
                    titleReport.className = "titleReport";
                    dateReport.className = "dateReport";
                    btnViewReport.className = "btnViewReport";

                    iconReport.src = "img/iconRelatorio.svg";
                    iconReport.alt = "icon de relatorio";
                    titleReport.innerHTML = publicacao.titulo;
                    dateReport.innerHTML = publicacao.data_relatorio;
                    btnViewReport.src = "img/btnVisualizarRelatorio.svg";
                    btnViewReport.setAttribute("onclick", `mostrarModalRelatorio(1), buscarDadosRelatorio(${publicacao.idRelatorio}), criarIdRelatório(${publicacao.idRelatorio})`);

                    machineField.appendChild(report);
                    report.appendChild(iconReport);
                    report.appendChild(titleReport);
                    report.appendChild(dateReport);
                    report.appendChild(btnViewReport);

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

function filtrarRelatorios(idTotem, nomeDigitado) {

    if (nomeDigitado.length > 0 && nomeDigitado.length > nomeDigitado.split(" ").length) {
        fetch(`/relatorio/filtrarRelatorios/${idTotem}/${nomeDigitado}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var machineField = document.getElementById("machineField");
                    machineField.innerHTML = "";
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Infelizmente, nenhum relatório foi encontrado.";
                    machineField.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var machineField = document.getElementById("machineField");
                    machineField.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];

                        var report = document.createElement("div");
                        var iconReport = document.createElement("img");
                        var titleReport = document.createElement("div");
                        var dateReport = document.createElement("div");
                        var btnViewReport = document.createElement("img");

                        machineField.className = "machineField";
                        report.className = "report";

                        iconReport.className = "iconReport";
                        titleReport.className = "titleReport";
                        dateReport.className = "dateReport";
                        btnViewReport.className = "btnViewReport";

                        iconReport.src = "img/iconRelatorio.svg";
                        iconReport.alt = "icon de relatorio";
                        titleReport.innerHTML = publicacao.titulo;
                        dateReport.innerHTML = publicacao.data_relatorio;
                        btnViewReport.src = "img/btnVisualizarRelatorio.svg";
                        btnViewReport.setAttribute("onclick", `mostrarModalRelatorio(1), buscarDadosRelatorio(${publicacao.idRelatorio}), criarIdRelatório(${publicacao.idRelatorio})`);

                        machineField.appendChild(report);
                        report.appendChild(iconReport);
                        report.appendChild(titleReport);
                        report.appendChild(dateReport);
                        report.appendChild(btnViewReport);

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
        atualizarRelatorios(sessionStorage.ID_TOTEM)
    }
}

function editarRelatorio() {
    const tituloVar = tituloModal.value;
    const data = dataModal.value.split("/")
    const dia = data[0].length == 1 ? "0" + data[0] : data[0];
    const mes = data[1].length == 1 ? "0" + data[1] : data[1];
    const ano = data[2];
    const dataVar = `${ano}-${mes}-${dia}`
    const tipoVar = escolherTipoProblemaModal.value;
    const descricaoVar = descricaoModal.value;



    if (tituloVar != undefined && tituloVar != '' && dataVar != undefined && dataVar != '' && tipoVar != undefined && tipoVar != '' && descricaoVar != undefined && descricaoVar != '') {
        Swal.fire({
            title: 'Deseja mesmo salvar as alterações?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, salvar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`relatorio/editarRelatorio/${sessionStorage.ID_RELATORIO}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        titulo: tituloVar,
                        data: dataVar,
                        tipo: tipoVar,
                        descricao: descricaoVar,

                    })
                }).then(function (resposta) {

                    if (resposta.ok) {
                        Swal.fire(
                            'Pronto!',
                            'Suas alterações foram gravadas',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                atualizarRelatorios(sessionStorage.ID_UNIDADE)
                                fecharModalRelatorio();
                            }
                        })
                    } else if (resposta.status == 404) {
                        return false
                    } else {
                        return false
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
            }
        })


    } else {
        alert("Verifique os campos");
    }

}

function cadastrarRelatorio() {
    const tituloVar = tituloModal.value;
    const data = dataModal.value.split("/")
    const dia = data[0].length == 1 ? "0" + data[0] : data[0];
    const mes = data[1].length == 1 ? "0" + data[1] : data[1];
    const ano = data[2];
    const dataVar = `${ano}-${mes}-${dia}`;
    const tipoVar = escolherTipoProblemaModal.value;
    const descricaoVar = descricaoModal.value;
    const fkMaquinaVar = sessionStorage.ID_TOTEM;

    if (tituloVar == "" || dataVar == "" || descricaoVar == "" || tipoVar == "") {
        toastPadrao('error', 'Preencha os campos estão vazios')
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
                fkMaquina: fkMaquinaVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    toastPadrao('success', 'Cadastro realizado com sucesso!')
                    atualizarRelatorios(sessionStorage.ID_UNIDADE);
                    fecharModalRelatorio();
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

function criarIdRelatório(id) {
    sessionStorage.ID_RELATORIO = id
}

var repDesligamento = 0;
var repSobrecarga = 0;
var repMauFuncionamento = 0;
var repOutro = 0;

const data = new Date;
const ano = data.getFullYear();
const mes = data.getMonth() + 1;
const mesPassado = data.getMonth();
var anoBissexto = false;
if (ano % 4 == 0) {
    anoBissexto == true
}

var diasMes;
var diasMesPassado;

if (mes % 2 != 0 || mes == 8) {
    diasMes = 31
} else if (mes % 2 == 0 && mes != 8 && mes != 2) {
    diasMes = 30
} else if (mes == 2 && anoBissexto) {
    diasMes = 29
} else if (mes == 2 && !anoBissexto) {
    diasMes = 28
}

if(diasMes == 31 && mes != 8 && mes != 2){
    diasMesPassado = 30
}else if(mes == 8){
    diasMesPassado = 31
}else{
    diasMesPassado = 28
}

var primeiroDiaSemanaAtual;
if (data.getDay() - data.getDay() == 0) {
    var primeiraSemana = true;
    var primeiroDiaSemanaAtual = diasMesPassado - data.getDay() + "/" + (data.getMonth());
} else {
    var primeiroDiaSemanaAtual = data.getDate() - data.getDay() + "/" + (data.getMonth() + 1);
}
const ultimoDiaSemanaAtual = data.getDate() - data.getDay() + 6 + "/" + (data.getMonth() + 1);
var primeiroDiaSemanaPassada;
if (primeiraSemana) {
    primeiroDiaSemanaPassada = new Date(data.getYear(), data.getMonth(), 0).getDate() - data.getDay() - 7 + "/" + (data.getMonth());
} else {
    primeiroDiaSemanaPassada = data.getDate() - data.getDay() - 7 + "/" + (data.getMonth() + 1);
}
var ultimoDiaSemanaPassada;
if (primeiraSemana) {
    ultimoDiaSemanaPassada = new Date(data.getYear(), data.getMonth(), 0).getDate() - data.getDay() + -1 + "/" + (data.getMonth());
} else {
    ultimoDiaSemanaPassada = data.getDate() - data.getDay() + -1 + "/" + (data.getMonth() + 1);
}
var qtdRelatoriosSemanais = 0;
var qtdRelatoriosSemanaPassada = 0;

function getPrimeiroDiaDaSemana(ano, semana) {
    const primeiroDeJaneiro = new Date(ano, 0, 1);
    const diaDaSemana = primeiroDeJaneiro.getDay();
    const primeiroDomingo = primeiroDeJaneiro;
    primeiroDomingo.setDate(1 - diaDaSemana);
    primeiroDomingo.setDate(primeiroDomingo.getDate() + (7 * (semana - 1)));
    return primeiroDomingo;
}

var semanaAtual = 0;
var semanaPassada = 0;
var totalRegistrosSemanaAtual = 0;
var totalRegistrosSemanaPassada = 0;

function buscarRelatoriosMensais(fkEmpresa,idUnidade) {
    fetch(`/relatorio/listarRelatoriosMensais/${fkEmpresa}/${idUnidade}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var resp = resposta;
                 semanaAtual = resp[0].semana;
                 semanaPassada = resp[1].semana;
                 totalRegistrosSemanaAtual = resp[0].Total;
                 totalRegistrosSemanaPassada = resp[1].Total;

                 repDesligamento = resp[0].Desligamento;
                 repSobrecarga = resp[0].Sobrecarga;
                 repMauFuncionamento = resp[0].MauFuncionamento;
                 repOutro = resp[0].Outro;

                atualizarKpi(idUnidade);
            });
        } else {
            throw "Houve um erro na API!";
        }
    })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function atualizarKpi(idUnidade) {
    atualizarVariacaoRelatorios()
    variacaoDeTempoInoperante(idUnidade)
    atualizarMaiorOcorrencia();
}

function atualizarVariacaoRelatorios() {
    let variacaoRelatorios = document.getElementById("variacaoRelatorios")
    let variacao;
    if (totalRegistrosSemanaPassada == 0) {
        variacao = (totalRegistrosSemanaAtual / 1) * 100;
        variacaoRelatorios.className = 'percent memory'
    } else if (totalRegistrosSemanaAtual > totalRegistrosSemanaPassada) {
        variacao = ((totalRegistrosSemanaAtual - totalRegistrosSemanaPassada) / totalRegistrosSemanaPassada) * 100;
        variacaoRelatorios.className = 'percent memory'
    } else if (totalRegistrosSemanaAtual < totalRegistrosSemanaPassada) {
        variacao = ((totalRegistrosSemanaAtual - totalRegistrosSemanaPassada) / totalRegistrosSemanaPassada) * 100;
        variacaoRelatorios.className = 'percent cpu'
    } else if (totalRegistrosSemanaAtual == totalRegistrosSemanaPassada) {
        variacao = 0;
        variacaoRelatorios.className = 'percent ram'
    }

    if(variacao < 0){
        variacaoRelatorios.innerHTML = "<img src = './img/arrowGreen.svg'>"
    }else if(variacao > 0){
        variacaoRelatorios.innerHTML = "<img src = './img/arrowRed.svg'>"
    }
    variacaoRelatorios.innerHTML += variacao.toFixed(1) + "%"
}

function variacaoDeTempoInoperante(idUnidade) {
    fetch(`/historico/listar/${idUnidade}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var fkTotemAntiga = resposta[0].fkTotem;
                var dataAntiga = resposta[0].data_historico;
                var milissegundos = 0;
                var diferenca = 0;
                for (let i = 0; i < resposta.length; i++) {

                    if (fkTotemAntiga == resposta[i].fkTotem) {
                        if (resposta[i].estadoTotem == 'Desligado' || resposta[i].estadoTotem == 'Manutencao') {
                            if (new Date(dataAntiga) < new Date(resposta[i].data_historico).getTime()) {
                                console.log(dataAntiga + "é a mais antiga")
                            } else {
                                dataAntiga = resposta[i].data_historico;
                                milissegundos = new Date(resposta[i].data_historico).getTime();
                                console.log(milissegundos + "mili")
                            }

                        } else if (resposta[i].estadoTotem == 'Disponivel') {
                            diferenca = Math.abs(new Date(resposta[i].data_historico).getTime() - new Date(dataAntiga).getTime()) / 1000
                            console.log(diferenca)
                        }
                    } else {

                    }
                }
                diferencaEmSegundos = diferencaEmSegundos / 1000;
                const tempoInoperante = document.getElementById("varTempoInoperante")

                const diferencaEmMinutos = diferencaEmSegundos / 60;
                const diferencaEmHoras = diferencaEmMinutos / 60;
                const minutosSobrando = diferencaEmHoras % 60
                const dia = diferencaEmHoras / 24
                if (diferencaEmMinutos >= 24) {
                    tempoInoperante.innerHTML = dia.toFixed(0) + ' Day '
                } else if (diferencaEmMinutos > 60) {
                    tempoInoperante.innerHTML = diferencaEmHoras.toFixed(0) + 'h ' + minutosSobrando.toFixed(0) + 'm'
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


function atualizarMaiorOcorrencia() {
    let maiorOcorrencia = document.getElementById("subtitleHardInfo");
    let qntOcorrencias = document.getElementById("qntOcorrencias");
    if (repDesligamento >= repSobrecarga && repDesligamento >= repOutro && repDesligamento >= repMauFuncionamento) {
        qntOcorrencias.innerHTML = repDesligamento;
        maiorOcorrencia.innerHTML = 'Desligamento';
    } else if (repSobrecarga > repDesligamento && repSobrecarga >= repOutro && repSobrecarga >= repMauFuncionamento) {
        qntOcorrencias.innerHTML = repSobrecarga;
        maiorOcorrencia.innerHTML = 'Sobrecarga';
    } else if (repMauFuncionamento > repDesligamento && repMauFuncionamento > repSobrecarga && repMauFuncionamento >= repOutro) {
        qntOcorrencias.innerHTML = repMauFuncionamento;
        maiorOcorrencia.innerHTML = 'Mau funcionamento';
    } else {
        qntOcorrencias.innerHTML = repOutro;
        maiorOcorrencia.innerHTML = 'Outro';
    }
}

function buscarDadosRelatorio(idRelatorio) {
    fetch(`/relatorio/buscarDadosRelatorio/${idRelatorio}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    tituloModal.value = resposta[0].titulo;
                    dataModal.value = resposta[0].dataPublicacao;
                    escolherTipoProblemaModal.value = resposta[0].tipo;
                    descricaoModal.value = resposta[0].descricao;
                    dataModal.value = resposta[0].dataRelatorio;


                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

}