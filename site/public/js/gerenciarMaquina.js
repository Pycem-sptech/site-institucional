

function atualizarMaquinasCadastradas() {

    fetch("/maquina/listar")
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("registeredMachine");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("registeredMachine");
                    feed.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];

                        
                        var divRegisteredMachine = document.createElement("div");
                        var divIdMachine = document.createElement("div");
                        var spanID = document.createElement("span");
                        var spanUnidade = document.createElement("span");
                        var divBtnEditDelete = document.createElement("div");
                        var img1 = document.createElement("img");
                        var img2 = document.createElement("img");

                        spanID.innerHTML = publicacao.numeroSerie;
                        spanUnidade.innerHTML = publicacao.nomeUnidade;

                        divRegisteredMachine.className = "registeredMachine";
                        divIdMachine.className = "idMachine";
                        spanUnidade.className = "addresOpacity";
                        divBtnEditDelete.className = "btnEditDelete";
                        img1.src = "img/Botão Editar.svg";
                        img2.src = "img/Botão Fechar.svg";

                        //     <div class="registeredMachine">
                        //     <div class="idMachine">
                        //         <span>238975192</span>
                        //         <span class="addresOpacity">Unidade Ipiranga</span>
                        //     </div>
                        //     <div class="btnEditDelete">
                        //         <img src="img/Botão Editar.svg" onclick="mostrarModal()">
                        //         <img src="img/Botao Fechar.svg" onclick="deletarRegistroUnidade()">
                        //     </div>
                        // </div>

                        divRegisteredMachine.appendChild(divIdMachine);
                        divRegisteredMachine.appendChild(spanID);
                        divRegisteredMachine.appendChild(spanUnidade);
                        divRegisteredMachine.appendChild(divBtnEditDelete);
                        divIdMachine.appendChild(img1);
                        divIdMachine.appendChild(img2);
                        feed.appendChild(divRegisteredMachine);
                        feed.appendChild(divIdMachine);
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

