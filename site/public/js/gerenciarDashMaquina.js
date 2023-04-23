var intervaloDeAtualizacao = sessionStorage.ATT_FREQ;

function mudarIdSecionado(id) {
  sessionStorage.ID_SELECIONADO = id;
}

var intervalo = "";
var resposta_old = "";
var maqDisponivel = 0;
var maqManutencao = 0;
var maqDesligado = 0;

function atualizarMaqCadastradasComStatus() {
  // const select = document.querySelector('#escolherNumeroSerie');
  const fkEmpresa = sessionStorage.FK_EMPRESA;
  const fkUnidade = sessionStorage.VER_UNIDADE;
  var fkEmpresaVar = fkEmpresa;

  fetch(`/maquina/listar/${fkEmpresaVar}/${fkUnidade}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var machineField = document.getElementById("machineField");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Infelizmente, nenhuma máquina foi encontrada.";
          machineField.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var machineField = document.getElementById("machineField");
          machineField.innerHTML = "";

          // for (var i = 0; i < resposta.length; i++) {
          //   select.options[select.options.length] = new Option(resposta[i].numeroSerie, resposta[i].idTotem);
          // }
          
          for (let i = 0; i < resposta.length; i++) {
            var publicacao = resposta[i];

            var divMachineField = document.createElement("div");
            var divMachine = document.createElement("div");

            var divContainer = document.createElement("div");
            var divMachineDetails = document.createElement("div");
            var spanIcon = document.createElement("span");

            var divInfoMachine = document.createElement("div");
            var spanNumeroSerie = document.createElement("span");
            var spanNomeUnidade = document.createElement("span");
            var divStatus = document.createElement("div");

            divMachineField.className = "machineField";
            divMachine.className = "machine";
            divContainer.className = "container";
            divMachineDetails.className = "machineDetails";
            spanIcon.className = "iconMachine";

            divInfoMachine.className = "infoMachine";
            spanNomeUnidade.className = "txtDetailMachine";
            spanNomeUnidade.innerHTML = publicacao.nomeUnidade;
            spanNumeroSerie.innerHTML = publicacao.usuario;
            divStatus.id = i
            if (publicacao.status == 'Disponivel') {
              divStatus.className = "status ok";
              maqDisponivel++;
            } else if (publicacao.status == 'Manutencao') {
              divStatus.className = "status alert";
              maqManutencao++;
            } else {
              divStatus.className = "status danger";
              maqDesligado++;
            }

            divMachine.setAttribute("onclick", `redirectGraficos(${publicacao.idTotem}, '${publicacao.usuario}')`);
            machineField.appendChild(divMachine);

            divMachine.appendChild(divContainer);

            divContainer.appendChild(divMachineDetails);
            divContainer.appendChild(divStatus);

            divMachineDetails.appendChild(spanIcon);
            divMachineDetails.appendChild(divInfoMachine);

            divInfoMachine.appendChild(spanNumeroSerie);
            divInfoMachine.appendChild(spanNomeUnidade);

            spanIcon.innerHTML = '<img src="img/smartphoneOpacity.svg">';
          }
          atualizarStatusBoxMachine();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function atualizarStatusBoxMachine() {
  const disponivel = document.getElementById("statusOk");
  const manutencao = document.getElementById("statusAlert");
  const desligado = document.getElementById("statusDanger");
  
  disponivel.innerHTML = totalDisponivel;
  manutencao.innerHTML = totalManutencao;
  desligado.innerHTML = totalDesligado;
}
var atualizando = false;
function atualizarStatusMaqEmTempoReal() {
  if (atualizando) {
    clearInterval(atualizar);
  } else {
    var atualizar = setInterval(function () {
      atualizando = true
      const fkUnidade = sessionStorage.VER_UNIDADE;
      fetch(`/maquina/listarStatusMaqEmTempoReal/${fkUnidade}`).then(function (resposta) {
        if (resposta.ok) {
          if (resposta.status == 204) { }
          resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            var totalMaquinas = maqDisponivel + maqManutencao + maqDesligado;
            if (totalMaquinas != resposta[0].totalMaquinas) {
              atualizarMaqCadastradasComStatus()

            } else if (resposta[0].Disponivel == maqDisponivel && resposta[0].Manutencao == maqManutencao && resposta[0].Desligado == maqDesligado) {
              console.log("As máquinas ainda estão atualizadas")
            } else {

              for (let i = 0; i < resposta.length; i++) {
                var publicacao = resposta[i];
                var statusId = document.getElementById(`${i}`)
                if (publicacao.status == 'Disponivel') {
                  statusId.className = "status ok";
                } else if (publicacao.status == 'Manutencao') {
                  statusId.className = "status alert";
                } else {
                  statusId.className = "status danger";
                }
              }
            }
          });
        } else {
          throw "Houve um erro na API!";
        }
      })
        .catch(function (resposta) {
          console.error(resposta);
        });
    }, intervaloDeAtualizacao);
  }
}


function atualizarNomeUnidade(nomeUnidade) {
  divNomeUnidade = document.getElementById("welcomeSentence");
  divNomeUnidade.innerHTML = nomeUnidade;
}





