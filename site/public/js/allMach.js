function atualizarListaMaquinas() {
    const listaMaquinas = [];
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

                        listaMaquinas.push(resposta[i]);
                    }
                    console.log(listaMaquinas);
                });
                setTimeout(function () { mostrarTodasUnidades(listaMaquinas) }, 300)
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

    return false;
}

function atualizarListaMaquinasFiltradas(nomeDigitado) {
    if (nomeDigitado.length > 0) {
        const listaMaquinas = []
        const fkEmpresa = sessionStorage.FK_EMPRESA;
        fetch(`/maquina/atualizarListaMaquinasFiltradas/${fkEmpresa}/${nomeDigitado}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        console.log("Nenhum resultado encontrado!!");
                        limparFeed();
                        throw "Nenhum resultado encontrado!!";
                        
                    }
                    resposta.json().then(function (resposta) {
                        for (var i = 0; i < resposta.length; i++) {

                            listaMaquinas.push(resposta[i]);
                        }
                        console.log(listaMaquinas);

                    });
                    mostrarTodasUnidades(listaMaquinas);
                } else {
                    throw "Houve um erro na API!";
                }
            })
            .catch(function (resposta) {
                console.error(resposta);
            });

        return false;
    }else {limparFeed();}
}

function imprimirMaquina(fkEmpresa, id) {
    const rota = `/maquina/listarTodasMaquinas/${fkEmpresa}/${fkUnidade}`

    fetch(rota)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { }

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
                    spanId.innerHTML = id+1;

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

function mostrarTodasMaquinas(listaMaquina) {
    limparFeed();
    const fkEmpresa = sessionStorage.FK_EMPRESA;

    for (i = 0; i < listaMaquina.length; i++){
        imprimirUnidade(fkEmpresa, listaMaquina[i].idMaquina, i);
    }
}