const fkEmpresa = sessionStorage.FK_EMPRESA;
const listaUnidades = [];

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
            fill: false,
            backgroundColor: 'rgba(0, 120, 232, 1)',
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

// function atualizarGrafico(fkEmpresa, dados, ocorrenciasPorUnidade) {

//     fetch(`/grafico/tempo-real/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (novoRegistro) {

//                 console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
//                 console.log(`Dados atuais do gráfico:`);
//                 console.log(dados);

//                 let avisoCaptura = document.getElementById(`avisoCaptura`)
//                 avisoCaptura.innerHTML = ""
//                 umiArm1.innerHTML = novoRegistro[0].umidade
//                 tempArm1.innerHTML = novoRegistro[0].temperatura
//                 if (novoRegistro[0].mes_ano == dados.labels[dados.labels.length - 1]) {
//                     console.log("---------------------------------------------------------------")
//                     console.log("Como não há dados novos para captura, o gráfico não atualizará.")
//                     avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
//                     console.log("Horário do novo dado capturado:")
//                     console.log(novoRegistro[0].mes_ano)
//                     console.log("Horário do último dado capturado:")
//                     console.log(dados.labels[dados.labels.length - 1])
//                     console.log("---------------------------------------------------------------")
//                 } else {
//                     // tirando e colocando valores no gráfico
//                     dados.labels.shift(); // apagar o primeiro
//                     dados.labels.push(novoRegistro[0].data_registro); // incluir um novo momento

//                     dados.datasets[0].data.shift();  // apagar o primeiro de umidade
//                     dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

//                     dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
//                     dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura


//                     ocorrenciasPorUnidade.update();
//                 }

//                 // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//             // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

// }

const tempoDeAtualizacao = sessionStorage.ATT_FREQ
function listarUsoMaquina(fkTotem) {

    fetch(`/maquina/listarUsoMaquina/${fkTotem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function(resposta) {
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

function plotarGraficos(resposta, fkTotem){
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
            fill: false,
            backgroundColor: 'rgba(0, 120, 232, 1)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_processador);
    } 
  
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
            fill: false,
            backgroundColor: 'rgba(0, 120, 232, 1)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_ram);
    } 
  
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
            fill: false,
            backgroundColor: 'rgba(0, 120, 232, 1)',
            borderColor: 'rgba(0, 120, 232, 1)',
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        labels.push(resposta[i].data_registro);
        dados.datasets[0].data.push(resposta[i].uso_hd);
    } 
  
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