const fkEmpresa = sessionStorage.FK_EMPRESA;
const listaUnidades = [];
var alertaParou = false

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

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Quantidade de relátorios',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 120, 232, 0.7)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.ano_mes);
        dados.datasets[0].data.push(registro.quantidade);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const configOcorrenciasPorUnidade = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
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

    // Adicionando gráfico criado em div na tela
    let ocorrenciasPorUnidade = new Chart(
        document.getElementById(`ocorrenciasPorUnidade`),
        configOcorrenciasPorUnidade
    );
    // setTimeout(() => atualizarGrafico(fkEmpresa, dados, ocorrenciasPorUnidade), tempoDeAtualizacao);
}


function obterDadosGraficoFrequenciaProblemasMensal(fkEmpresa,idUnidade) {
    fetch(`/unidade/frequenciaProblemasMensal/${fkEmpresa}/${idUnidade}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                if(resposta.length < 0){
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
           

                    plotarGraficoFrequenciaProblemasMensal(resposta);
                }
              
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

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Desligamento',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 255, 232, 1)',
            borderColor: 'rgba(0, 255, 232, 1)',
            tension: 0.1
        },{
            label: 'Sobrecarga',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 150, 232, 1)',
            borderColor: 'rgba(0, 150, 232, 1)',
            tension: 0.1
        },{
            label: 'Mau funcionamento',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 12, 232, 1)',
            borderColor: 'rgba(0, 12, 232, 1)',
            tension: 0.1
        },{
            label: 'Outro',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 23, 100, 1)',
            borderColor: 'rgba(0, 23, 100, 1)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.semana);
        dados.datasets[0].data.push(registro.Desligamento);
        dados.datasets[1].data.push(registro.Sobrecarga);
        dados.datasets[2].data.push(registro.Mau_funcionamento);
        dados.datasets[3].data.push(registro.Outro);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const configFrequenciaProblemasMensal = {
        type: 'bar',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
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

    // Adicionando gráfico criado em div na tela
    let frequenciaProblemasMensal = new Chart(
        document.getElementById(`frequenciaProblemasMensal`),
        configFrequenciaProblemasMensal
    );
    // setTimeout(() => atualizarGrafico(fkEmpresa, dados, frequenciaProblemasMensal), tempoDeAtualizacao);
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
                resposta.reverse();
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

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_processador);
    }
    let usoCpu = document.getElementById("percentualUsoCpu")
    usoCpu.innerHTML = resposta[0].uso_processador + "%";
    // Criando estrutura para plotar gráfico - config
    const configUsoDoProcessador = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
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

    // Adicionando gráfico criado em div na tela
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

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_ram);
    }
    let usoRam = document.getElementById("percentualUsoRam")
    usoRam.innerHTML = resposta[0].uso_ram + "%";
    // Criando estrutura para plotar gráfico - config
    const configusoDaRam = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
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

    // Adicionando gráfico criado em div na tela
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

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_hd);
    }
    let usoHd = document.getElementById("percentualUsoHd")
    usoHd.innerHTML = resposta[0].uso_hd + "%";
    // Criando estrutura para plotar gráfico - config
    const configUsoDoHd = {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
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

    // Adicionando gráfico criado em div na tela
    let usoDoHd = new Chart(
        document.getElementById(`usoDoHd`),
        configUsoDoHd
    );
    setTimeout(() => atualizarGraficoHd(fkTotem, dados, usoDoHd), tempoDeAtualizacao);
}

function atualizarGraficoProcessador(fkTotem, dados, usoDoProcessador) {

    fetch(`/maquina/listarUltimosDados/${fkTotem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                if (novoRegistro[0].data_registro == dados.labels[dados.labels.length - 1]) {

                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].uso_processador); // incluir uma nova medida de umidade

                    usoDoProcessador.update();
                }
                let usoCpu = document.getElementById("percentualUsoCpu")
                usoCpu.innerHTML = novoRegistro[0].uso_processador + "%";
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoProcessador(fkTotem, dados, usoDoProcessador), tempoDeAtualizacao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
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
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].uso_ram); // incluir uma nova medida de umidade

                    usoDaRam.update();
                }
                let usoRam = document.getElementById("percentualUsoRam")
                usoRam.innerHTML = novoRegistro[0].uso_ram + "%";
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRam(fkTotem, dados, usoDaRam), tempoDeAtualizacao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
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
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].uso_hd); // incluir uma nova medida de umidade

                    usoDoHd.update();
                }
                let usoHd = document.getElementById("percentualUsoHd")
                usoHd.innerHTML = novoRegistro[0].uso_hd + "%";
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoHd(fkTotem, dados, usoDoHd), tempoDeAtualizacao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
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