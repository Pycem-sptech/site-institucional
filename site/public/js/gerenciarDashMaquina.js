var intervaloDeAtualizacao = sessionStorage.ATT_FREQ;

function buscarDadosRelatorio(idRelatorio) {
  fetch(`/relatorio/buscarDadosRelatorio/${idRelatorio}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          tituloModal.value = resposta[0].titulo;
          dataModal.value = resposta[0].dataPublicacao;
          escolherTipoProblemaModal.value = resposta[0].tipo;
          descricaoModal.value = resposta[0].descricao;
          dataModal.value = resposta[0].dataRelatorio;
          escolherNumeroSerie.value = resposta[0].fkTotem;

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });

}

function mudarIdSecionado(id) {
  sessionStorage.ID_SELECIONADO = id;
}

function criarIdRelatório(id) {
  sessionStorage.ID_RELATORIO = id
}

var repDesligamento = 0;
var repSobrecarga = 0;
var repOutro = 0;

data = new Date
var primeiroDiaSemanaAtual = data.getDate() - data.getDay() + "/" + (data.getMonth() + 1);
var ultimoDiaSemanaAtual = data.getDate() - data.getDay() + 6 + "/" + (data.getMonth() + 1);
var primeiroDiaSemanaPassada = data.getDate() - data.getDay() - 7 + "/" + (data.getMonth() + 1);
var ultimoDiaSemanaPassada = data.getDate() - data.getDay() + -1 + "/" + (data.getMonth() + 1);
// primeiroDiaSemanaAtual <= '15/4' && '15/4' <= ultimoDiaSemanaAtual;
// primeiroDiaSemanaPassada >= '15/4' && ultimoDiaSemanaPassada >= '15/4';
var qtdRelatoriosSemanais = 0;
var qtdRelatoriosSemanaPassada = 0;
function atualizarRelatoriosCadastrados(idUnidade) {
  console.log(idUnidade)
  fetch(`/relatorio/listarRelatorio/${idUnidade}`).then(function (resposta) {
    if (resposta.ok) {
      if (resposta.status == 204) {
        var reportsField = document.getElementById("reportsField");
        reportsField.innerHTML = "";
        var mensagem = document.createElement("span");
        mensagem.innerHTML = "Infelizmente, nenhum relatório foi encontrado.";
        reportsField.appendChild(mensagem);
        throw "Nenhum resultado encontrado!!";
      }

      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));

        var reportsField = document.getElementById("reportsField");
        reportsField.innerHTML = "";
        for (let i = 0; i < resposta.length; i++) {
          var publicacao = resposta[i];

          var divReportsField = document.createElement("div");
          var divProblemReport = document.createElement("div");
          var divIconReport = document.createElement("img");
          var divIdReport = document.createElement("span");
          var divTitleReport = document.createElement("span");
          var divDateReport = document.createElement("span");
          var divDetailsReport = document.createElement("span");
          var divBtnViewReport = document.createElement("img");

          divReportsField.className = "reportsField";
          divProblemReport.className = "problemReport";
          divIconReport.className = "divIconReport";
          divIdReport.className = "divIdReport";
          divTitleReport.className = "divTitleReport";
          divDateReport.className = "divDateReport";
          divDetailsReport.className = "divDetailsReport";
          divBtnViewReport.className = "divBtnViewReport";

          divIconReport.src = "img/iconRelatorio.svg";
          divIconReport.alt = "icon de relatorio";
          divIdReport.innerHTML = i + 1;
          divTitleReport.innerHTML = publicacao.titulo;
          divDateReport.innerHTML = publicacao.data_relatorio;
          divDetailsReport.innerHTML = publicacao.descricao;

          if (publicacao.tipo == 'Desligamento' && primeiroDiaSemanaAtual <= publicacao.data_relatorio && publicacao.data_relatorio <= ultimoDiaSemanaAtual) {
            repDesligamento++;
            qtdRelatoriosSemanais++
          } else if (publicacao.tipo == 'Sobrecarga' && primeiroDiaSemanaAtual <= publicacao.data_relatorio && publicacao.data_relatorio <= ultimoDiaSemanaAtual) {
            repSobrecarga++;
            qtdRelatoriosSemanais++
          } else if (publicacao.tipo == 'Outro' && primeiroDiaSemanaAtual <= publicacao.data_relatorio && publicacao.data_relatorio <= ultimoDiaSemanaAtual) {
            repOutro++;
            qtdRelatoriosSemanais++
          }
          if (primeiroDiaSemanaPassada >= publicacao.data_relatorio && ultimoDiaSemanaPassada >= publicacao.data_relatorio) {
            qtdRelatoriosSemanaPassada++
          }



          divBtnViewReport.src = "img/btnVisualizarRelatorio.svg";
          divBtnViewReport.setAttribute("onclick", `mostrarModalRelatorio(1), buscarDadosRelatorio(${publicacao.idRelatorio}), criarIdRelatório(${publicacao.idRelatorio})`);

          reportsField.appendChild(divProblemReport);
          divProblemReport.appendChild(divIconReport);
          divProblemReport.appendChild(divIdReport);
          divProblemReport.appendChild(divTitleReport);
          divProblemReport.appendChild(divDateReport);
          divProblemReport.appendChild(divDetailsReport);
          divProblemReport.appendChild(divBtnViewReport);

        }
        atualizarKpi();
      });
    } else {
      throw "Houve um erro na API!";
    }
  })
    .catch(function (resposta) {
      console.error(resposta);
    });
}


function atualizarKpi() {
  atualizarVariacaoRelatorios()
  //Variação de tempo inoperante
  atualizarMaiorOcorrencia();
}

function atualizarVariacaoRelatorios() {
  let variacaoRelatorios = document.getElementById("variacaoRelatorios")
  let variacao;
  if (qtdRelatoriosSemanaPassada == 0) {
    variacao = (qtdRelatoriosSemanais / 1) * 100;
    variacaoRelatorios.className = 'percent memory'
  } else if (qtdRelatoriosSemanais > qtdRelatoriosSemanaPassada) {
    variacao = ((qtdRelatoriosSemanais - qtdRelatoriosSemanaPassada) / qtdRelatoriosSemanaPassada) * 100;
    variacaoRelatorios.className = 'percent memory'
  } else if (qtdRelatoriosSemanais < qtdRelatoriosSemanaPassada) {
    variacaoRelatorios.className = 'percent cpu'
  } else if (qtdRelatoriosSemanais == qtdRelatoriosSemanaPassada) {
    variacao = 0;
    variacaoRelatorios.className = 'percent ram'
  }
  variacaoRelatorios.innerHTML = "^" + variacao.toFixed(1) + "%"
}

function atualizarMaiorOcorrencia() {
  let maiorOcorrencia = document.getElementById("subtitleHardInfo");
  let qntOcorrencias = document.getElementById("qntOcorrencias");
  if (repDesligamento >= repSobrecarga && repDesligamento >= repOutro) {
    qntOcorrencias.innerHTML = repDesligamento;
    maiorOcorrencia.innerHTML = 'Desligamento';
  } else if (repSobrecarga > repDesligamento && repSobrecarga >= repOutro) {
    qntOcorrencias.innerHTML = repSobrecarga;
    maiorOcorrencia.innerHTML = 'Sobrecarga';
  } else {
    qntOcorrencias.innerHTML = repOutro;
    maiorOcorrencia.innerHTML = 'Outro';
  }
}

function cadastrarRelatorio() {
  const tituloVar = tituloModal.value;
  const dataVar = dataModal.value;
  const tipoVar = escolherTipoProblemaModal.value;
  const descricaoVar = descricaoModal.value;
  const fkMaquinaVar = escolherNumeroSerie.value;

  if (tituloVar == "" || dataVar == "" || descricaoVar == "" || tipoVar == "") {
    toastPadrao('error', 'Preencha os campos estão vazios')
    return false;

  } else {
    fetch("/relatorio/cadastrarRelatorio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: tituloVar,
        data: dataVar,
        tipo: tipoVar,
        descricao: descricaoVar,
        fkMaquina: fkMaquinaVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Cadastro realizado com sucesso!')
          atualizarRelatoriosCadastrados(sessionStorage.ID_UNIDADE);
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
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
  let disponivel = document.getElementById("statusOk");
  let manutencao = document.getElementById("statusAlert");
  let desligado = document.getElementById("statusDanger");
  disponivel.innerHTML = maqDisponivel;
  manutencao.innerHTML = maqManutencao;
  desligado.innerHTML = maqDesligado;
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


function salvarEdicaoFuncionario() {
  let titulo = document.getElementById('tituloModal').value;
  let tipo = document.getElementById('escolherTipoProblemaModal').value;
  let descricao = document.getElementById('descricaoModal').value;
  let data = document.getElementById('dataModal').value;
  let idRelatorio = sessionStorage.ID_RELATORIO;

  if (titulo != undefined && titulo != '' && descricao != undefined && descricao != '' && tipo != undefined && tipo != '' && data != undefined && data != '' && idRelatorio != undefined && idRelatorio != '') {
    Swal.fire({
      title: 'Deseja mesmo salvar as alterações?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, salvar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`relatorio/editarRelatorio/${idRelatorio}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            titulo: titulo,
            tipo: tipo,
            descricao: descricao,
            data: data,
          })
        }).then(function (resposta) {

          if (resposta.ok) {
            Swal.fire(
              'Pronto!',
              'Suas alterações foram gravadas',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                atualizarRelatoriosCadastrados();
              }
            })
          } else if (resposta.status == 404) {
            return false
          } else {
            return false
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
      }
    })
  } else {
    alert("Verifique os campos");
  }

}

function atualizarNomeUnidade(nomeUnidade) {
  divNomeUnidade = document.getElementById("welcomeSentence");
  divNomeUnidade.innerHTML = nomeUnidade;
}

function editarRelatorio() {
  const tituloVar = tituloModal.value;
  const dataVar = dataModal.value;
  const tipoVar = escolherTipoProblemaModal.value;
  const descricaoVar = descricaoModal.value;
  const fkMaquinaVar = escolherNumeroSerie.value;


  if (tituloVar != undefined && tituloVar != '' && dataVar != undefined && dataVar != '' && tipoVar != undefined && tipoVar != '' && descricaoVar != undefined && descricaoVar != '' && fkMaquinaVar != undefined && fkMaquinaVar != '') {
    Swal.fire({
      title: 'Deseja mesmo salvar as alterações?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, salvar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`relatorio/editarRelatorio/${sessionStorage.ID_RELATORIO}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            titulo: tituloVar,
            data: dataVar,
            tipo: tipoVar,
            descricao: descricaoVar,
            fkMaquina: fkMaquinaVar,
          })
        }).then(function (resposta) {

          if (resposta.ok) {
            Swal.fire(
              'Pronto!',
              'Suas alterações foram gravadas',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                atualizarRelatoriosCadastrados(sessionStorage.ID_UNIDADES)
              }
            })
          } else if (resposta.status == 404) {
            return false
          } else {
            return false
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
      }
    })


  } else {
    alert("Verifique os campos");
  }

}

