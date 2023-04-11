function mostrarTodasUnidadesEmTempoReal() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;
    fetch(`/unidade/listarTodasUnidades/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("feed");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Infelizmente, nenhuma máquina foi encontrada.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed");
                    feed.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];

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
}