const fkEmpresa = sessionStorage.FK_EMPRESA;
const listaUnidades = [];

function obterDadosGrafico(fkEmpresa) {
    fetch(`/unidade/ocorrenciasPorMes/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function(resposta) {
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
    let labels = [1,2,3,4,5,6,7,8,9,10,11,12];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: false,
            backgroundColor: 'rgba(255, 195, 0, 1)',
            borderColor: 'rgba(255, 195, 0, 1)',
            tension: 0.1
        },
        {
            label: 'Temperatura',
            data: [],
            fill: false,
            backgroundColor: 'rgba(86, 11, 173, 1)',
            borderColor: 'rgba(86, 11, 173, 1)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.mes);
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
    const config1 = {
        type: 'line',
        data: dados,
        options: {}
    };

    // Adicionando gráfico criado em div na tela
    let ocorrenciasPorUnidade = new Chart(
        document.getElementById(`ocorrenciasPorUnidade`),
        config1
    );
    setTimeout(() => atualizarGrafico(fkEmpresa, dados, ocorrenciasPorUnidade), 2000);
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
//                     dados.labels.push(novoRegistro[0].dataTime_grafico); // incluir um novo momento

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