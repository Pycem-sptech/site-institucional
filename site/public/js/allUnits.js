const listaUnidades = [];

function atualizarListaUnidades() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/unidade/atualizarListaUnidades/${fkEmpresa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    for (var i = 0; i < resposta.length; i++) {
                        listaUnidades.push(resposta[i]);
                    }
                    console.log(listaUnidades);
                });
                setTimeout(function(){mostrarTodasUnidades()},1000)
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

    return false;
}

function imprimirUnidade(fkEmpresa, fkUnidade, nomeDigitado="", filtro=false) {
    let rota;
    const fkEmpresaVar = sessionStorage.FK_EMPRESA
    if (!filtro){
        rota = `/unidade/listarTodasUnidades/${fkEmpresa}/${fkUnidade}`;
    } else {
        rota = `/unidade/filtrarTodasUnidades/${nomeDigitado}/${fkEmpresaVar}`
    }
    fetch(rota)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {}

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed");

                        var publicacao = resposta[0];

                        var divListUnits = document.createElement("div");
                        divListUnits.className = "listUnit";
                        divListUnits.setAttribute("onclick", `redirectDashUnits(${publicacao.idUnidade},'${publicacao.nomeUnidade}')`);
                        var divBoxId = document.createElement("div");
                        divBoxId.className = "box idUnit";
                        var spanId = document.createElement("span");
                        spanId.innerHTML = publicacao.idUnidade;

                        var divBoxName = document.createElement("div");
                        divBoxName.className = "box nameUnit";
                        var spanImgUnit = document.createElement("span");
                        spanImgUnit.innerHTML = '<img src="img/storeIcon.svg" alt="">'
                        var spanName = document.createElement("span");
                        spanName.innerHTML = publicacao.nomeUnidade;

                        var divBoxAvailable = document.createElement("div");
                        divBoxAvailable.className = "box machineAvailable";
                        var spanAvailable = document.createElement("span");
                        spanAvailable.innerHTML = publicacao.Disponivel;

                        var divBoxMaintenance = document.createElement("div");
                        divBoxMaintenance.className = "box machineMaintenance";
                        var spanMaintenance = document.createElement("span");
                        spanMaintenance.innerHTML = publicacao.Manutencao;

                        var divBoxMachineOff = document.createElement("div");
                        divBoxMachineOff.className = "box machineOff";
                        var spanMachineOff = document.createElement("span");
                        spanMachineOff.innerHTML = publicacao.Desligado;

                        var divBoxTotalMachine = document.createElement("div");
                        divBoxTotalMachine.className = "box totalMachine";
                        var spanTotalMachine = document.createElement("span");
                        spanTotalMachine.innerHTML = publicacao.totalMaquinasUnidade;

                        feed.appendChild(divListUnits);

                        divListUnits.appendChild(divBoxId);
                        divBoxId.appendChild(spanId);

                        divListUnits.appendChild(divBoxName);
                        divBoxName.appendChild(spanImgUnit);
                        divBoxName.appendChild(spanName);

                        divListUnits.appendChild(divBoxAvailable);
                        divBoxAvailable.appendChild(spanAvailable);

                        divListUnits.appendChild(divBoxMaintenance);
                        divBoxMaintenance.appendChild(spanMaintenance);

                        divListUnits.appendChild(divBoxMachineOff);
                        divBoxMachineOff.appendChild(spanMachineOff);
                        
                        divListUnits.appendChild(divBoxTotalMachine);
                        divBoxTotalMachine.appendChild(spanTotalMachine);

                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
    
}

function mostrarTodasUnidades(nomeDigitado="", filtro=false){
    limparFeed();
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    let i = 0;
    impressao = setInterval(function (){
        if(i < listaUnidades.length){
            imprimirUnidade(fkEmpresa, listaUnidades[i].idUnidade, nomeDigitado, filtro);
        }else{
            clearInterval(impressao)
        }
        i++
    },100);
}

function filtrarTodasUnidades(nomeDigitado) {
    if (nomeDigitado.length > 0) {
        const fkEmpresaVar = sessionStorage.FK_EMPRESA

        fetch(`/unidade/filtrarTodasUnidades/${nomeDigitado}/${fkEmpresaVar}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        var feed = document.getElementById("feed");
                        feed.innerHTML = "";
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
                            var publicacao = resposta[0];

                        var divListUnits = document.createElement("div");
                        divListUnits.className = "listUnit";
                        divListUnits.setAttribute("onclick", `redirectDashUnits(${publicacao.idUnidade},'${publicacao.nomeUnidade}')`);
                        var divBoxId = document.createElement("div");
                        divBoxId.className = "box idUnit";
                        var spanId = document.createElement("span");
                        spanId.innerHTML = publicacao.idUnidade;

                        var divBoxName = document.createElement("div");
                        divBoxName.className = "box nameUnit";
                        var spanImgUnit = document.createElement("span");
                        spanImgUnit.innerHTML = '<img src="img/storeIcon.svg" alt="">'
                        var spanName = document.createElement("span");
                        spanName.innerHTML = publicacao.nomeUnidade;

                        var divBoxAvailable = document.createElement("div");
                        divBoxAvailable.className = "box machineAvailable";
                        var spanAvailable = document.createElement("span");
                        spanAvailable.innerHTML = publicacao.Disponivel;

                        var divBoxMaintenance = document.createElement("div");
                        divBoxMaintenance.className = "box machineMaintenance";
                        var spanMaintenance = document.createElement("span");
                        spanMaintenance.innerHTML = publicacao.Manutencao;

                        var divBoxMachineOff = document.createElement("div");
                        divBoxMachineOff.className = "box machineOff";
                        var spanMachineOff = document.createElement("span");
                        spanMachineOff.innerHTML = publicacao.Desligado;

                        var divBoxTotalMachine = document.createElement("div");
                        divBoxTotalMachine.className = "box totalMachine";
                        var spanTotalMachine = document.createElement("span");
                        spanTotalMachine.innerHTML = publicacao.totalMaquinasUnidade;

                        feed.appendChild(divListUnits);

                        divListUnits.appendChild(divBoxId);
                        divBoxId.appendChild(spanId);

                        divListUnits.appendChild(divBoxName);
                        divBoxName.appendChild(spanImgUnit);
                        divBoxName.appendChild(spanName);

                        divListUnits.appendChild(divBoxAvailable);
                        divBoxAvailable.appendChild(spanAvailable);

                        divListUnits.appendChild(divBoxMaintenance);
                        divBoxMaintenance.appendChild(spanMaintenance);

                        divListUnits.appendChild(divBoxMachineOff);
                        divBoxMachineOff.appendChild(spanMachineOff);
                        
                        divListUnits.appendChild(divBoxTotalMachine);
                        divBoxTotalMachine.appendChild(spanTotalMachine);

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
        atualizarUnidadesCadastradas()
    }
}
