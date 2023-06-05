

function variacaoDeTempoInoperante() {
    let idUnidade = sessionStorage.ID_UNIDADE
    fetch(`/historico/listar/${idUnidade}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                const semanaAtualMin = resposta[0].semanaAtual;
                const semanaPassadaMin = resposta[0].semanaPassada;
                const horasAtual = semanaAtualMin / 60;
                const diasAtual = horasAtual / 60;
                const div = document.getElementById("varTempoInoperante")
                div.innerHTML = diasAtual.toFixed(0) + " Dias"
            });
        } else {
            throw "Houve um erro na API!";
        }
    })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function obterDadosGraficoFrequenciaProblemasMensal(fkEmpresa, idUnidade) {
    fetch(`/chamado/frequenciaProblemasMensal/${fkEmpresa}/${idUnidade}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                localStorage.resultadoEncontrado = true
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoFrequenciaProblemasMensal(resposta);
                let i = resposta.length - 1;
                atualizarMaiorOcorrencia(resposta[i].Desligamento, resposta[i].Sobrecarga, resposta[i].MauFuncionamento, resposta[i].Outro)
                variacaoDeTempoInoperante()
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
        labels.push(registro.primeiroDiaSemana + " - " + registro.ultimoDiaSemana);

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

function atualizarMaiorOcorrencia(totalDesligamento, totalSobrecarga, totalMauFuncionamento, totalOutro) {
    let maiorOcorrencia = document.getElementById("subtitleHardInfo");
    let qntOcorrencias = document.getElementById("qntOcorrencias");

    if (totalDesligamento >= totalSobrecarga && totalDesligamento >= totalOutro && totalDesligamento >= totalMauFuncionamento) {
        qntOcorrencias.innerHTML = totalDesligamento;
        maiorOcorrencia.innerHTML = 'Desligamento';
    } else if (totalSobrecarga > totalDesligamento && totalSobrecarga >= totalOutro && totalSobrecarga >= totalMauFuncionamento) {
        qntOcorrencias.innerHTML = totalSobrecarga;
        maiorOcorrencia.innerHTML = 'Sobrecarga';
    } else if (totalMauFuncionamento > totalDesligamento && totalMauFuncionamento > totalSobrecarga && totalMauFuncionamento >= totalOutro) {
        qntOcorrencias.innerHTML = totalMauFuncionamento;
        maiorOcorrencia.innerHTML = 'Mau funcionamento';
    } else {
        qntOcorrencias.innerHTML = totalOutro;
        maiorOcorrencia.innerHTML = 'Outro';
    }

    if(totalDesligamento == 0 || totalSobrecarga == 0 || totalMauFuncionamento == 0 || totalOutro == 0){
        
    }
}

function atualizarVariacaoChamados() {
    fkUnidade = sessionStorage.ID_UNIDADE
    fetch(`/chamado/variacaoChamadoSemana/${fkUnidade}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
          
            resposta.json().then(function (resposta) {
                
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let variacaoChamados = document.getElementById("variacaoRelatorios")
                let variacao;
                let totalRegistrosSemanaPassada = resposta[0].QuantidadeChamadosAnterior;
                let totalRegistrosSemanaAtual = resposta[0].QuantidadeChamados;
                if(totalRegistrosSemanaPassada == undefined){
                    totalRegistrosSemanaPassada = 0
                }
                if (totalRegistrosSemanaPassada == 0) {
                    variacao = (totalRegistrosSemanaAtual / 1) * 100;
                    variacaoChamados.className = 'percent memory'
                } else if (totalRegistrosSemanaAtual > totalRegistrosSemanaPassada) {
                    variacao = ((totalRegistrosSemanaAtual - totalRegistrosSemanaPassada) / totalRegistrosSemanaPassada) * 100;
                    variacaoChamados.className = 'percent memory'
                } else if (totalRegistrosSemanaAtual < totalRegistrosSemanaPassada) {
                    variacao = ((totalRegistrosSemanaAtual - totalRegistrosSemanaPassada) / totalRegistrosSemanaPassada) * 100;
                    variacaoChamados.className = 'percent cpu'
                } else if (totalRegistrosSemanaAtual == totalRegistrosSemanaPassada) {
                    variacao = 0;
                    variacaoChamados.className = 'percent ram'
                }

                if (variacao < 0) {
                    variacaoChamados.innerHTML = "<img src = './img/arrowGreen.svg'>"
                    variacao *= -1
                } else if (variacao > 0) {
                    variacaoChamados.innerHTML = "<img src = './img/arrowRed.svg'>"
                }
                
                variacaoChamados.innerHTML += variacao.toFixed(1) + "%"

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}
