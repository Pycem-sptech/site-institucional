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
            atualizarMaquinasCadastradas();
            limparCamposMaquina();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });
            
            Toast.fire({
                icon: "success",
                title: "Cadastro realizado com sucesso!",
            });
            
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "error",
                title: "Houve um erro ao tentar realizar o cadastro!",
            });
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  
    return false;
  }

function atualizarMaquinasCadastradas() {

    fetch("/maquina/listar")
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

                        var divFeed = document.createElement("div");
                        var divRegisteredMachine = document.createElement("div");
                        var divIdMachine = document.createElement("div");
                        var spanNumeroSerie = document.createElement("span");
                        var spanNomeUnidade = document.createElement("span");
                        var divBtnEditDelete = document.createElement("div");

                        divFeed.className = "feed"

                        divRegisteredMachine.className = "registeredMachine";
                        divIdMachine.className = "idMachine";
                        spanNomeUnidade.className = "addresOpacity";
                        spanNomeUnidade.innerHTML = publicacao.nomeUnidade;
                        spanNumeroSerie.innerHTML = publicacao.numeroSerie;

                        divBtnEditDelete.className = "btnEditDelete";
                        divBtnEditDelete.innerHTML += "<img src='img/Botão Editar.svg' onclick='mostrarModal()'>";
                        divBtnEditDelete.innerHTML += "<img src='img/Botao Fechar.svg' onclick='deletarRegistroUnidade()'>";

                        feed.appendChild(divRegisteredMachine);
                        divRegisteredMachine.appendChild(divIdMachine);
                        divRegisteredMachine.appendChild(divBtnEditDelete);
                        divIdMachine.appendChild(spanNumeroSerie);
                        divIdMachine.appendChild(spanNomeUnidade);

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

function limparCamposMaquina() {
    document.getElementById('nameUnit').value=("");
    document.getElementById('serialNumber').value=("");
    document.getElementById('processor').value=("");
    document.getElementById('ram').value=("");
    document.getElementById('storageSelect').value=("");
    document.getElementById('qtdArmazenamento').value=("");
}