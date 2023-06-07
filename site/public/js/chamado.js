let meusChamados = {
  chamadosAbertos: [],
  chamadosEmAndamento: [],
  chamadosEncerrados: [],
  chamadosCancelados: []
}
let todosChamados = {
  chamadosAbertos: [],
  chamadosEmAndamento: [],
  chamadosEncerrados: [],
  chamadosCancelados: []
}

function limparJSONChamado() {
  meusChamados = {
    chamadosAbertos: [],
    chamadosEmAndamento: [],
    chamadosEncerrados: [],
    chamadosCancelados: []
  }
  todosChamados = {
    chamadosAbertos: [],
    chamadosEmAndamento: [],
    chamadosEncerrados: [],
    chamadosCancelados: []
  }
}
var jsonChamadosGlobal;

function criarChamado(tela) {
  const selectUnidade = document.querySelector('#escolherUnidadeModalNovoChamado');
  let selectedUnidadeOption = selectUnidade.options[selectUnidade.selectedIndex].id;
  const selectTotem = document.querySelector('#escolherMaquinaModalNovoChamado');
  let selectedTotemOption = selectTotem.options[selectTotem.selectedIndex].id;

  const fkEmpresa = sessionStorage.FK_EMPRESA;
  const criado_por_id = sessionStorage.USER_ID;
  const criado_por_nome = sessionStorage.USER_FULLNAME;
  const fkMaquina = escolherMaquinaModalNovoChamado.value;
  const fkUnidade = escolherUnidadeModalNovoChamado.value;
  const nome_unidade = selectedUnidadeOption;
  const usuario_totem = selectedTotemOption;
  const tipo = escolherTipoModalNovoChamado.value;
  const descricao = descricaoModalNovoChamado.value;

  if (fkEmpresa == "" || fkMaquina == "" || criado_por_id == "" || criado_por_nome == "" || nome_unidade == "" || usuario_totem == "" || tipo == "" || fkUnidade == "" || descricao == "") {
    toastPadrao('error', 'Preencha os campos que estão vazios!');
    return false;
  } else {
    fetch("/chamado/cadastrarChamado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        fkEmpresa: fkEmpresa,
        criado_por_id: criado_por_id,
        criado_por_nome: criado_por_nome,
        usuario_totem: usuario_totem,
        fkMaquina: fkMaquina,
        nome_unidade: nome_unidade,
        fkUnidade: fkUnidade,
        tipo: tipo,
        descricao: descricao,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Cadastro realizado com sucesso!')
          if (tela == 'graficos') {
            exibirChamadosAbertosPorMaquina(sessionStorage.ID_TOTEM);
          } else {
            atualizarListaChamados();
          }
          fecharModalNovoChamado();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}
function editarChamado(idChamado) {
  const selectUnidade = document.querySelector('#escolherUnidadeModal');
  let selectedUnidadeOption = selectUnidade.options[selectUnidade.selectedIndex].id;
  const selectTotem = document.querySelector('#escolherMaquinaModal');
  let selectedTotemOption = selectTotem.options[selectTotem.selectedIndex].id;
  const nome_unidade = selectedUnidadeOption;
  const usuario_totem = selectedTotemOption;

  const atribuicao = escolherAtribuicaoModal.value;
  const prioridade = escolherPrioridadeModal.value;
  const status = escolherEstadoModal.value;
  const tipo = escolherTipoModal.value;
  const descricao = descricaoModal.value;
  const resolucao = resolucaoModal.value;
  const fkMaquina = escolherMaquinaModal.value;


  if (fkMaquina == "" || atribuicao == "" || prioridade == "" || status == "" || tipo == "" || descricao == "" || nome_unidade == "" || usuario_totem == "") {
    toastPadrao('error', 'Preencha os campos que estão vazios!');
    return false;
  } else if (status == 'Encerrado' && resolucao == '' && resolucao != null) {
    toastPadrao('error', 'Preencha a resolução que está vazia!');
    return false;
  } else {
    fetch(`/chamado/editarChamado/${idChamado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkMaquina: fkMaquina,
        prioridade: prioridade,
        nome_unidade: nome_unidade,
        usuario_totem: usuario_totem,
        tipo: tipo,
        status: status,
        descricao: descricao,
        atribuicao: atribuicao,
        resolucao: resolucao
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Atualização realizada com sucesso!')
          fecharModalChamado()
          atualizarListaChamados();
        } else {
          throw "Houve um erro ao tentar realizar a atualização!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}


function deletarChamado(idChamado) {
  Swal.fire({
    title: 'Você tem certeza?',
    text: "Você não irá conseguir reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/chamado/deletarChamado/${idChamado}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (resposta) {

        if (resposta.ok) {
          Swal.fire(
            'Pronto!',
            'Suas alterações foram gravadas',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location = "../chamados.html"
            }
          })
        } else if (resposta.status == 404) {
          console.log("Deu 404!");
        } else {
          throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
    }
  })
}

function mostrarChamado(lista) {
  for (i = 0; i < lista.length; i++) {
    imprimirChamado(lista[i], i);
  }
}



function filtrarChamados() {
  limparJSONChamado()
  const fkUsuario = sessionStorage.USER_ID;
  const fkEmpresa = sessionStorage.FK_EMPRESA;
  console.log(fkEmpresa)
  console.log(fkUsuario)
  fetch(`/chamado/listarChamadoFiltrado/${fkUsuario}/${fkEmpresa}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          limparFeedChamados();
          console.log("TEM DADOS")
          if (resposta.length > 0) {
            for (var i = 0; i < resposta.length; i++) {
              if (resposta[i].estado[0] == "Aberto") {
                meusChamados.chamadosAbertos.push(resposta[i])
              } else if (resposta[i].estado[0] == ("EmAndamento")) {
                meusChamados.chamadosEmAndamento.push(resposta[i])
              } else if (resposta[i].estado[0] == ("Encerrado")) {
                meusChamados.chamadosEncerrados.push(resposta[i])
              } else if (resposta[i].estado[0] == ("Cancelado")) {
                meusChamados.chamadosCancelados.push(resposta[i])
              }
              console.log(resposta[i])
            }
            exibirChamados(meusChamados);
            jsonChamadosGlobal = meusChamados;
          } else {
            limparFeedChamados();
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

function atualizarListaChamados() {

  limparJSONChamado()
  if (sessionStorage.USER_CARGO == 'Supervisor' || sessionStorage.MEUS_CHAMADOS == 'true') {
    const selectChamado = document.getElementById("filtrarChamados");
    selectChamado.options[1].selected = true
    sessionStorage.MEUS_CHAMADOS = false;
    filtrarChamados()
  } else {
    const fkEmpresa = sessionStorage.FK_EMPRESA;

    fetch(`/chamado/listarChamados/${fkEmpresa}`)
      .then(function (resposta) {
        if (resposta.ok) {
          if (resposta.status == 204) {
            console.log("Nenhum resultado encontrado!!");
            throw "Nenhum resultado encontrado!!";
          }
          resposta.json().then(function (resposta) {
            console.log("Dados: ", JSON.stringify(resposta))
            limparFeedChamados();
            if (resposta.length > 0) {
              for (var i = 0; i < resposta.length; i++) {
                if (resposta[i].estado[0] == "Aberto") {
                  todosChamados.chamadosAbertos.push(resposta[i])
                } else if (resposta[i].estado[0] == ("EmAndamento")) {
                  todosChamados.chamadosEmAndamento.push(resposta[i])
                } else if (resposta[i].estado[0] == ("Encerrado")) {
                  todosChamados.chamadosEncerrados.push(resposta[i])
                } else if (resposta[i].estado[0] == ("Cancelado")) {
                  todosChamados.chamadosCancelados.push(resposta[i])
                }
              }
              exibirChamados(todosChamados);
              jsonChamadosGlobal = todosChamados;

            } else {
              limparFeedChamados();
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
}
atualizarListaChamados();


function atualizarSelectUnidades(idSelect) {
  const select = document.querySelector(idSelect);
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
          for (var i = 0; i < resposta.length; i++) {
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


function atualizarSelectMaquina(idSelect) {
  const select = document.querySelector(idSelect);
  const fkEmpresa = sessionStorage.FK_EMPRESA;
  var fkEmpresaVar = fkEmpresa;
  fetch(`/maquina/listarMaquinas/${fkEmpresaVar}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          for (var i = 0; i < resposta.length; i++) {
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

let boxChamados = document.querySelectorAll(".feed")
let chamadosAbertos = boxChamados[0]
let chamadosEmAndamento = boxChamados[1]
let chamadosEncerrados = boxChamados[2]
let chamadosCancelados = boxChamados[2]
function exibirChamados(jsonChamados) {
  // Exibindo o chamado
  console.log(jsonChamados.chamadosEmAndamento.length)
  for (let i = 0; i < jsonChamados.chamadosAbertos.length; i++) {
    chamadosAbertos.innerHTML += `<div class="boxChamado" onclick="mostrarModalChamado(${jsonChamados.chamadosAbertos[i].idChamado}, 'chamadosAbertos')">
                                  <div class="infoChamado">
                                      <h3>${jsonChamados.chamadosAbertos[i].titulo}</h3>
                                      <div class="infoMaquina">
                                          <span>Máquina: <span>${jsonChamados.chamadosAbertos[i].usuario}</span></span>
                                          <span>Tipo: <span>${jsonChamados.chamadosAbertos[i].tipo}</span></span>
                                      </div>
                                  </div>
                                  <div class="infoAtribuicao">
                                      <span>${jsonChamados.chamadosAbertos[i].atribuido_nome}</span>
                                      <span>${jsonChamados.chamadosAbertos[i].prioridade}</span>
                                  </div>
                              </div> `
  }

  for (let i = 0; i < jsonChamados.chamadosEmAndamento.length; i++) {
    chamadosEmAndamento.innerHTML += `<div class="boxChamado" onclick="mostrarModalChamado(${jsonChamados.chamadosEmAndamento[i].idChamado}, 'chamadosEmAndamento')">
                                      <div class="infoChamado">
                                          <h3>${jsonChamados.chamadosEmAndamento[i].titulo}</h3>
                                          <div class="infoMaquina">
                                              <span>Máquina: <span>${jsonChamados.chamadosEmAndamento[i].usuario}</span></span>
                                              <span>Tipo: <span>${jsonChamados.chamadosEmAndamento[i].tipo}</span></span>
                                          </div>
                                      </div>
                                      <div class="infoAtribuicao">
                                          <span>${jsonChamados.chamadosEmAndamento[i].atribuido_nome}</span>
                                          <span>${jsonChamados.chamadosEmAndamento[i].prioridade}</span>
                                      </div>
                                  </div> `
  }

  for (let i = 0; i < jsonChamados.chamadosEncerrados.length; i++) {
    chamadosEncerrados.innerHTML += `<div class="boxChamado" onclick="mostrarModalChamado(${jsonChamados.chamadosEncerrados[i].idChamado}, 'chamadosEncerrados')">
                                      <div class="infoChamado">
                                          <h3>${jsonChamados.chamadosEncerrados[i].titulo}</h3>
                                          <div class="infoMaquina">
                                              <span>Máquina: <span>${jsonChamados.chamadosEncerrados[i].usuario}</span></span>
                                              <span>Tipo: <span>${jsonChamados.chamadosEncerrados[i].tipo}</span></span>
                                          </div>
                                      </div>
                                      <div class="infoAtribuicao">
                                          <span>${jsonChamados.chamadosEncerrados[i].atribuido_nome}</span>
                                          <span>${jsonChamados.chamadosEncerrados[i].prioridade}</span>
                                      </div>
                                      </div> `
  }

  for (let i = 0; i < jsonChamados.chamadosCancelados.length; i++) {
    chamadosEncerrados.innerHTML += `<div class="boxChamado" onclick="mostrarModalChamado(${jsonChamados.chamadosCancelados[i].idChamado}, 'chamadosCancelados')">
    <div class="infoChamado">
        <h3>${jsonChamados.chamadosCancelados[i].titulo}</h3>
        <div class="infoMaquina">
            <span>Máquina: <span>${jsonChamados.chamadosCancelados[i].usuario}</span></span>
            <span>Tipo: <span>${jsonChamados.chamadosCancelados[i].tipo}</span></span>
        </div>
    </div>
    <div class="infoAtribuicao">
        <span>${jsonChamados.chamadosCancelados[i].atribuido_nome}</span>
        <span>${jsonChamados.chamadosCancelados[i].prioridade}</span>
    </div>
    </div> `
  }
}

function atualizarDadosModal(idChamado, statusChamado, jsonChamados) {
  console.log(statusChamado)
  console.log(jsonChamados)
  let selectMaquina = document.querySelector("#escolherMaquinaModal")
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      for (var j = 0; j < selectMaquina.options.length; j++) {
        if (jsonChamados[statusChamado][i].idTotem == selectMaquina.options[j].value) {
          selectMaquina.options[j].selected = true;
        }
      }
    }
  }

  let selectUnidade = document.querySelector("#escolherUnidadeModal")
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      for (var j = 0; j < selectUnidade.options.length; j++) {
        if (jsonChamados[statusChamado][i].idUnidade == selectUnidade.options[j].value) {
          selectUnidade.options[j].selected = true;
        }
      }
    }
  }

  let selectPrioridade = document.querySelector('#escolherPrioridadeModal');
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      for (var j = 0; j < selectPrioridade.options.length; j++) {
        if (jsonChamados[statusChamado][i].prioridade == selectPrioridade.options[j].value) {
          selectPrioridade.options[j].selected = true;
        }
      }
    }
  }


  let selectEstado = document.querySelector('#escolherEstadoModal')
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      for (var j = 0; j < selectEstado.options.length; j++) {
        if (jsonChamados[statusChamado][i].estado[0] == selectEstado.options[j].value) {
          selectEstado.options[j].selected = true;
        }
      }
    }
  }

  let selectTipo = document.querySelector('#escolherTipoModal')
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      for (var j = 0; j < selectTipo.options.length; j++) {
        if (jsonChamados[statusChamado][i].tipo == selectTipo.options[j].value) {
          selectTipo.options[j].selected = true;
        }
      }
    }
  }

  let selectAtribuicao = document.querySelector('#escolherAtribuicaoModal')
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      for (var j = 0; j < selectAtribuicao.options.length; j++) {
        if (jsonChamados[statusChamado][i].atribuido_id == selectAtribuicao.options[j].value) {
          selectAtribuicao.options[j].selected = true;
        } else if (jsonChamados[statusChamado][i].atribuido_id == null) {
          selectAtribuicao.options[0].selected = true;
        }
      }
    }
  }

  let inputDataInicial = document.querySelector('#dataInicialModal')
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      inputDataInicial.value = jsonChamados[statusChamado][i].data_inicio
    }
  }

  let inputDataFinal = document.querySelector('#dataEncerramentoModal')
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      inputDataFinal.value = jsonChamados[statusChamado][i].data_fim
    }
  }

  let inputDescricao = document.querySelector('#descricaoModal')
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      if (jsonChamados[statusChamado][i].descricao == null) {
        inputDescricao.value = "Nenhuma descrição"
      } else {
        inputDescricao.value = jsonChamados[statusChamado][i].descricao
      }
    }
  }

  let inputCriadoPor = document.querySelector('#criadoPorModal');
  for (var i = 0; i < jsonChamados[statusChamado].length; i++) {
    if (idChamado == jsonChamados[statusChamado][i].idChamado) {
      inputCriadoPor.value = jsonChamados[statusChamado][i].criado_por_nome;
    }
  }

}

function exibirResolucao() {
  let estado = escolherEstadoModal.value;
  let resolucao = document.getElementById('resolucao');
  if (estado == 'Aberto' || estado == 'Em andamento') {
    resolucao.style.display = "none"
  } else if (estado == 'Encerrado' || estado == 'Cancelado') {
    resolucao.style.display = "block"
    console.log('ai')
  }
}

function analizeChamado(valor) {
  if (valor == 'todos') {
    atualizarListaChamados();
  } else {
    filtrarChamados();
  }
}

function limparFeedChamados() {
  chamadosAbertos.innerHTML = "";
  chamadosEncerrados.innerHTML = "";
  chamadosEmAndamento.innerHTML = "";
  limparJSONChamado();
}