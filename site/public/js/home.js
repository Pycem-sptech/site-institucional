function atualizarUnidadesCadastradas() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;
    fetch(`/unidade/listar/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("feed");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Infelizmente, nenhuma unidade foi encontrada.";
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
                        var divRegisteredUnit = document.createElement("div");
                        var divnameUnit = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var spanEndereco = document.createElement("span");
                        divRegisteredUnit.setAttribute("onclick", `redirectDashUnits(${publicacao.idUnidade},'${publicacao.nome}')`);

                        divFeed.className = "feed";
                        divRegisteredUnit.className = "registeredUnit";
                        divnameUnit.className = "nameUnit";
                        spanEndereco.className = "addresOpacity";
                        spanNome.innerHTML = publicacao.nome;
                        spanEndereco.innerHTML = publicacao.logradouro;

                        feed.appendChild(divRegisteredUnit);
                        divRegisteredUnit.appendChild(divnameUnit);
                        divnameUnit.appendChild(spanNome);
                        divnameUnit.appendChild(spanEndereco);
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

function listarStatusGeralTotem(fkEmpresa) {
    fetch(`/maquina/listarStatusTotem/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                atualizarGeralMaquinas(resposta)
             
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
var desligado = 0;
var disponivel = 0;
var manutencao = 0;

function atualizarGeralMaquinas(resposta){
    let total1 = document.getElementById("totalMaquinas1");
    let total2 = document.getElementById("totalMaquinas2");
    let total3 = document.getElementById("totalMaquinas3");
    let totalDisponivel = document.getElementById("totalDisponivel");
    let totalManutencao = document.getElementById("totalManutencao");
    let totalDesligado = document.getElementById("totalDesligado");

    total1.innerHTML = "";
    total2.innerHTML = "";
    total3.innerHTML = "";

    total1.innerHTML = resposta.length;
    total2.innerHTML = resposta.length;
    total3.innerHTML = resposta.length;

    for(let i = 0; i < resposta.length; i++){
        if(resposta.estado == 'Desligado'){
            desligado++
        }else if(resposta.estado == 'Disponivel'){
            disponivel++
        }else if(resposta.estado == 'Manutencao'){
            manutencao++
        }
    }
    totalDisponivel.innerHTML = disponivel;
    totalDesligado.innerHTML = desligado;
    totalManutencao.innerHTML = manutencao;

   

}