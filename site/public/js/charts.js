const fkEmpresa = sessionStorage.FK_EMPRESA;
const listaUnidades = [];
var alertaParou = false

function getPrimeiroDiaDaSemana(ano, semana) {
    const primeiroDeJaneiro = new Date(ano, 0, 1);
    const diaDaSemana = primeiroDeJaneiro.getDay();
    const primeiroDomingo = primeiroDeJaneiro;
    primeiroDomingo.setDate(1 - diaDaSemana);
    primeiroDomingo.setDate(primeiroDomingo.getDate() + (7 * (semana - 1)));
    return primeiroDomingo;
}

function obterDadosGraficoQtdRelatorios(fkEmpresa) {
    fetch(`/unidade/ocorrenciasPorMes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resposta) {

    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Quantidade de relátorios',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 120, 232, 1)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.ano_mes);
        dados.datasets[0].data.push(registro.quantidade);
    }

    const configOcorrenciasPorUnidade = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                            font: {
                            family: 'Inter',
                            size: 17
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    beginAtZero: true
                }
            }
        },
    };
    let ocorrenciasPorUnidade = new Chart(
        document.getElementById(`ocorrenciasPorUnidade`),
        configOcorrenciasPorUnidade
    );
}

function obterDadosGraficoFrequenciaProblemasMensal(fkEmpresa, idUnidade) {
    fetch(`/unidade/frequenciaProblemasMensal/${fkEmpresa}/${idUnidade}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoFrequenciaProblemasMensal(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoFrequenciaProblemasMensal(resposta) {
   
    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Desligamento',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 255, 232, 1)',
            borderColor: 'rgba(0, 255, 232, 1)',
            tension: 0.1
        }, {
            label: 'Sobrecarga',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 150, 232, 1)',
            borderColor: 'rgba(0, 150, 232, 1)',
            tension: 0.1
        }, {
            label: 'Mau funcionamento',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 12, 232, 1)',
            borderColor: 'rgba(0, 12, 232, 1)',
            tension: 0.1
        }, {
            label: 'Outro',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 23, 100, 1)',
            borderColor: 'rgba(0, 23, 100, 1)',
            tension: 0.1
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        const primeiroDiaDaSemana = getPrimeiroDiaDaSemana(data.getFullYear(), registro.semana);
        console.log(primeiroDiaDaSemana.getDate())
        const ultimoDiaDaSemana = primeiroDiaDaSemana;
        console.log(ultimoDiaDaSemana.getDate())

        ultimoDiaDaSemana.setDate(primeiroDiaDaSemana.getDate() + 6);
        console.log(ultimoDiaDaSemana.getDate())

        if(`${primeiroDiaDaSemana.getDate()-6}`== 0){
            console.log(primeiroDiaDaSemana.getDay())
            labels.push(`${primeiroDiaDaSemana.getDay()-5}/${primeiroDiaDaSemana.getMonth()+1} - ${ultimoDiaDaSemana.getDate()}/${ultimoDiaDaSemana.getMonth()+1}`);
        }else{
            labels.push(`${primeiroDiaDaSemana.getDay()+1}/${primeiroDiaDaSemana.getMonth()+1} - ${ultimoDiaDaSemana.getDate()}/${ultimoDiaDaSemana.getMonth()+1}`);
        }
        dados.datasets[0].data.push(registro.Desligamento);
        dados.datasets[1].data.push(registro.Sobrecarga);
        dados.datasets[2].data.push(registro.MauFuncionamento);
        dados.datasets[3].data.push(registro.Outro);
    }

    const configFrequenciaProblemasMensal = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 17
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    beginAtZero: true
                }
            }
        },
    };

    let frequenciaProblemasMensal = new Chart(
        document.getElementById(`frequenciaProblemasMensal`),
        configFrequenciaProblemasMensal
    );
}

function obterFrequenciaDeOcorrencias(fkEmpresa) {
    fetch(`/unidade/ocorrenciasPorMes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

const tempoDeAtualizacao = sessionStorage.ATT_FREQ
function listarUsoMaquina(fkTotem) {
    fetch(`/maquina/listarUsoMaquina/${fkTotem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficos(resposta, fkTotem)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficos(resposta, fkTotem) {
    plotarGraficoProcessador(resposta, fkTotem)
    plotarGraficoRam(resposta, fkTotem)
    plotarGraficoHd(resposta, fkTotem)
}

function plotarGraficoProcessador(resposta, fkTotem) {

    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Uso do Processador',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 120, 232, 0.7)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_processador);
    }

    let usoCpu = document.getElementById("percentualUsoCpu")
    validarCPU(resposta[resposta.length-1].uso_processador)
    usoCpu.innerHTML = resposta[0].uso_processador + "%";

    const configUsoDoProcessador = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 17
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            }
        },
    };

    let usoDoProcessador = new Chart(
        document.getElementById(`usoDoProcessador`),
        configUsoDoProcessador
    );
    setTimeout(() => atualizarGraficoProcessador(fkTotem, dados, usoDoProcessador), tempoDeAtualizacao);
}

function plotarGraficoRam(resposta, fkTotem) {

    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Uso da Ram',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 120, 232, 0.7)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_ram);
    }

    let usoRam = document.getElementById("percentualUsoRam")
    validarRAM(resposta[resposta.length-1].uso_ram)
    usoRam.innerHTML = resposta[0].uso_ram + "%";

    const configusoDaRam = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 17
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            }
        },
    };

    let usoDaRam = new Chart(
        document.getElementById(`usoDaRam`),
        configusoDaRam
    );
    setTimeout(() => atualizarGraficoRam(fkTotem, dados, usoDaRam), tempoDeAtualizacao);
}

function plotarGraficoHd(resposta, fkTotem) {

    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Uso da Memória de Massa',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 120, 232, 0.7)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_hd);
    }
    let usoHd = document.getElementById("percentualUsoHd")
    validarHD(resposta[resposta.length-1].uso_hd)
    usoHd.innerHTML = resposta[0].uso_hd + "%";
   
    const configUsoDoHd = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 17
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            }
        },
    };

    let usoDoHd = new Chart(
        document.getElementById(`usoDoHd`),
        configUsoDoHd
    );
    setTimeout(() => atualizarGraficoHd(fkTotem, dados, usoDoHd), tempoDeAtualizacao);
}

const cpuAlerta = sessionStorage.ALERT_CPU * 1;
const cpuCritico = sessionStorage.CRIT_CPU * 1;
function validarCPU(registro) {
    let percentual = document.getElementById("percentualUsoCpu")
    if (registro >= cpuCritico) {
        percentual.className = "percent memory"
    } else if (registro >= cpuAlerta && registro < cpuCritico) {
        percentual.className = "percent ram"
    } else {
        percentual.className = "percent cpu"
    }
}

const ramAlerta = sessionStorage.ALERT_RAM * 1;
const ramCritico = sessionStorage.CRIT_RAM * 1;
function validarRAM(registro) {
    let percentual = document.getElementById("percentualUsoRam")
    if (registro >= ramCritico) {
        percentual.className = "percent memory"
    } else if (registro >= ramAlerta && registro < ramCritico) {
        percentual.className = "percent ram"
    } else {
        percentual.className = "percent cpu"
    }
}
const hdAlerta = sessionStorage.ALERT_HD * 1;
const hdCritico = sessionStorage.CRIT_HD * 1;
function validarHD(registro) {
    let percentual = document.getElementById("percentualUsoHd")
    if (registro >= hdCritico) {
        percentual.className = "percent memory"
    } else if (registro >= hdAlerta && registro < hdCritico) {
        percentual.className = "percent ram"
    } else {
        percentual.className = "percent cpu"
    }
}
function atualizarGraficoProcessador(fkTotem, dados, usoDoProcessador) {

    fetch(`/maquina/listarUltimosDados/${fkTotem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                if (novoRegistro[0].data_registro == dados.labels[dados.labels.length - 1]) {
                } else {
                    
                    dados.labels.shift(); 
                    dados.labels.push(novoRegistro[0].data_registro); 
                    dados.datasets[0].data.shift();  
                    dados.datasets[0].data.push(novoRegistro[0].uso_processador); 
                    validarCPU(novoRegistro[0].uso_processador);
                    usoDoProcessador.update();
                }
                let usoCpu = document.getElementById("percentualUsoCpu")
                usoCpu.innerHTML = novoRegistro[0].uso_processador + "%";
                    proximaAtualizacao = setTimeout(() => atualizarGraficoProcessador(fkTotem, dados, usoDoProcessador), tempoDeAtualizacao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGraficoProcessador(fkTotem, dados, usoDoProcessador), tempoDeAtualizacao);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoRam(fkTotem, dados, usoDaRam) {

    fetch(`/maquina/listarUltimosDados/${fkTotem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                if (novoRegistro[0].data_registro == dados.labels[dados.labels.length - 1]) {

                } else {
                    
                    dados.labels.shift(); 
                    dados.labels.push(novoRegistro[0].data_registro); 

                    dados.datasets[0].data.shift();  
                    dados.datasets[0].data.push(novoRegistro[0].uso_ram); 
                    validarRAM(novoRegistro[0].uso_ram)
                    usoDaRam.update();
                }
                let usoRam = document.getElementById("percentualUsoRam")
                usoRam.innerHTML = novoRegistro[0].uso_ram + "%";
                    proximaAtualizacao = setTimeout(() => atualizarGraficoRam(fkTotem, dados, usoDaRam), tempoDeAtualizacao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGraficoRam(fkTotem, dados, usoDaRam), tempoDeAtualizacao);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGraficoHd(fkTotem, dados, usoDoHd) {

    fetch(`/maquina/listarUltimosDados/${fkTotem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                if (novoRegistro[0].data_registro == dados.labels[dados.labels.length - 1]) {

                } else {
                    
                    dados.labels.shift(); 
                    dados.labels.push(novoRegistro[0].data_registro); 

                    dados.datasets[0].data.shift();  
                    dados.datasets[0].data.push(novoRegistro[0].uso_hd); 
                    validarHD(novoRegistro[0].uso_hd)
                    usoDoHd.update();
                }
                let usoHd = document.getElementById("percentualUsoHd")
                usoHd.innerHTML = novoRegistro[0].uso_hd + "%";
                    proximaAtualizacao = setTimeout(() => atualizarGraficoHd(fkTotem, dados, usoDoHd), tempoDeAtualizacao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGraficoHd(fkTotem, dados, usoDoHd), tempoDeAtualizacao);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarNomeMaquina() {
    let userMachine = document.getElementById("welcomeSentence");
    userMachine.innerHTML = `${sessionStorage.VER_TOTEM}`;
}

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
