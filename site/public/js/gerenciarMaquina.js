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
function atualizarSelectUnidades() {
    const select = document.querySelector('#nameUnit');
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;

    fetch(`/unidade/listarUnidades/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    for(var i = 0;i < resposta.length;i++){
                        select.options[select.options.length] = new Option(resposta[i].nome, resposta[i].idUnidade);
                    }
                }
                );
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

    return false;
}


function cadastrarMaquina() {
    const nomeVar = nameUnit.value;
    const numeroSerialVar = serialNumber.value;
    const processadorVar = processor.value;
    const ramVar = ram.value;
    const storageSelectVar = storageSelect.value;
    const qtdArmazenamentoVar = qtdArmazenamento.value;

console.log(storageSelectVar)

    if (nomeVar == "") {
      return false;
    }
    fetch("/maquina/cadastrarMaquina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        numeroSerialServer: numeroSerialVar,
        processadorServer: processadorVar,
        ramServer: ramVar,
        storageSelectServer: storageSelectVar,
        qtdArmazenamentoServer: qtdArmazenamentoVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
          setTimeout(() => {
            window.location = "#";
          }, "1000");
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  
    return false;
  }
  