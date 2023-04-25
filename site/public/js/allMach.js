function mudarEstadoMaquina(idTotem, span) {
    fetch(`/maquina/mudarEstadoMaquina/${idTotem}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log
                    const lista = resposta;
                    if (lista.length > 0) {
                        span.innerHTML = lista[0].cpu_status == "Critico" || lista[0].ram_status == "Critico" || lista[0].hd_status == "Critico" ? "Critico" :
                            lista[0].cpu_status == "Alerta" || lista[0].ram_status == "Alerta" || lista.hd_status == "Alerta" ? "Alerta" : "Saudavel";
                    } else {
                        span.innerHTML = "---";
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

function atualizarListaMaquinas() {
    const listaMaquinas = [];
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/maquina/atualizarListaMaquinas/${fkEmpresa}`)
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
                setTimeout(function () { mostrarTodasMaquinas(listaMaquinas) }, 300)
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
        console.log(`/maquina/atualizarListaMaquinasFiltradas/${fkEmpresa}/${nomeDigitado}`)

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
                    setTimeout(function () { mostrarTodasMaquinas(listaMaquinas) }, 300)
                } else {
                    throw "Houve um erro na API!";
                }
            })
            .catch(function (resposta) {
                console.error(resposta);
            });

        return false;
    } else { limparFeed(); }
}

function imprimirMaquina(respostas, id) {
    publicacao = {};
    for (resposta in respostas) {
        publicacao[resposta] = respostas[resposta]

    }

    publicacao.status_maquina = mudarEstadoMaquina(publicacao.idTotem)

    var feed = document.getElementById("feed");



    var divListUnits = document.createElement("div");
    divListUnits.className = "listUnit";
    divListUnits.setAttribute("onclick", `redirectGraficos(${publicacao.idTotem},'${publicacao.usuario}')`);
    var divBoxId = document.createElement("div");
    divBoxId.className = "box idUnit";
    var spanId = document.createElement("span");
    spanId.innerHTML = id + 1;

    var divBoxName = document.createElement("div");
    divBoxName.className = "box nameUnit";
    var spanImgUnit = document.createElement("span");
    spanImgUnit.innerHTML = '<img src="img/storeIcon.svg" alt="">'
    var spanName = document.createElement("span");
    spanName.innerHTML = publicacao.usuario;

    var divBoxAvailable = document.createElement("div");
    divBoxAvailable.className = "box machineAvailable";
    var spanAvailable = document.createElement("span");
    // se a ultima posição for " " colocar os 3 pontos em na posicao na ultima posicao valida
    spanAvailable.innerHTML = publicacao.mac_address.length > 17 ? publicacao.mac_address.substring(0, 14)+"...": publicacao.mac_address;

    var divBoxMaintenance = document.createElement("div");
    divBoxMaintenance.className = "box machineMaintenance";
    var spanMaintenance = document.createElement("span");
    spanMaintenance.innerHTML = publicacao.ipv6.length > 17 ? publicacao.ipv6.substring(0, 14)+"..." : publicacao.ipv6;

    var divBoxMachineOff = document.createElement("div");
    divBoxMachineOff.className = "box machineOff";
    var spanMachineOff = document.createElement("span");
    spanMachineOff.innerHTML = publicacao.estado;

    var divBoxTotalMachine = document.createElement("div");
    divBoxTotalMachine.className = "box totalMachine";
    var spanTotalMachine = document.createElement("span");
    mudarEstadoMaquina(publicacao.idTotem, spanTotalMachine)

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

function mostrarTodasMaquinas(listaMaquina) {
    limparFeed();
    for (i = 0; i < listaMaquina.length; i++) {
        imprimirMaquina(listaMaquina[i], i);
    }
}
