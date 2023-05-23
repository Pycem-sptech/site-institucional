let meusChamados = {
  chamadosAbertos: [],
  chamadosEmAndamento: [],
  chamadosEncerrados: []
}
let todosChamados = {
  chamadosAbertos: [],
  chamadosEmAndamento: [],
  chamadosEncerrados: []
}

function buscarChamados(titulo) {
                ' '
}

function criarChamado() {
  const fkEmpresa = sessionStorage.FK_EMPRESA;
  const criado_por_id = sessionStorage.USER_ID;
  const criado_por_nome = sessionStorage.USER_FULLNAME;
  const fkMaquina = escolherMaquinaModalNovoChamado.value;
  const fkUnidade = escolherUnidadeModalNovoChamado.value;
  const prioridade = escolherPrioridadeModalNovoChamado.value;
  const tipo = escolherTipoModalNovoChamado.value;
  const descricao = descricaoModalNovoChamado.value;

  if (fkEmpresa == "" || fkMaquina == "" || criado_por_id == "" || criado_por_nome == "" || prioridade == "" || tipo == "" || fkUnidade == "" || descricao == "") {
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
        fkMaquina: fkMaquina,
        fkUnidade: fkUnidade,
        prioridade: prioridade,
        tipo: tipo,
        descricao: descricao,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Cadastro realizado com sucesso!')
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
  const atribuicao = escolherAtribuicaoModal.value;
  const dataInicio = dataInicialModal.value;
  const dataFim = dataEncerramentoModal.value;
  const prioridade = escolherPrioridadeModal.value;
  const status = escolherStatusModal.value;
  const tipo = escolherTipoModal.value;
  const descricao = descricaoModal.value;
  
  if (fkMaquina == "" || fkUsuario == "" || dataInicio == "" || dataFim == "" || prioridade == "" || status == "" || tipo == "" || fkUnidade == "" || descricao == "") {
    toastPadrao('error', 'Preencha os campos que estão vazios!');
    return false;
  } else {
    fetch(`/chamado/editarChamado/${idChamado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        fkMaquina: fkMaquina,
        fkUnidade: fkUnidade,
        fkUsuario: fkUsuario,
        dataInicio: dataInicio,
        dataFim: dataFim,
        prioridade: prioridade,
        tipo: tipo,
        status: status,
        descricao: descricao
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Atualização realizada com sucesso!')
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

function imprimirChamado() {

}

function filtrarChamados() {
  const fkEmpresa = sessionStorage.FK_EMPRESA;
  fetch(`/maquina/listarChamadoFiltrado/${fkEmpresa}`)
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

function atualizarListaChamados() {
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

          for (var i = 0; i < resposta.length; i++) {
            if (resposta[i].estado[0] == "Aberto") {
              todosChamados.chamadosAbertos.push(resposta[i])
            } else if (resposta[i].estado[0] == ("Em Andamento")) {
              todosChamados.chamadosEmAndamento.push(resposta[i])
            } else if (resposta[i].estado[0] == ("Encerrado")) {
              todosChamados.chamadosEncerrados.push(resposta[i])
            }
          }

          exibirChamados()
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

function exibirChamados() {
  // Exibindo o chamado
  for (let i = 0; i < todosChamados.chamadosAbertos.length; i++) {
    chamadosAbertos.innerHTML += `<div class="boxChamado" onclick="mostrarModalChamado(${todosChamados.chamadosAbertos[i].idChamado})">
                                  <div class="infoChamado">
                                      <h3>${todosChamados.chamadosAbertos[i].titulo}</h3>
                                      <div class="infoMaquina">
                                          <span>Máquina: <span>${todosChamados.chamadosAbertos[i].usuario}</span></span>
                                          <span>Tipo: <span>${todosChamados.chamadosAbertos[i].tipo}</span></span>
                                      </div>
                                  </div>
                                  <div class="infoAtribuicao">
                                      <span>${todosChamados.chamadosAbertos[i].nome}</span>
                                      <span>${todosChamados.chamadosAbertos[i].prioridade}</span>
                                  </div>
                              </div> `
  }

  for(let i = 0; i < todosChamados.chamadosEmAndamento.length; i++){
    chamadosEmAndamento.innerHTML = `<div class="boxChamado" onclick="mostrarModalChamado(${todosChamados.chamadosEmAndamento[i].idChamado})">
                                      <div class="infoChamado">
                                          <h3>${todosChamados.chamadosEmAndamento[i].titulo}</h3>
                                          <div class="infoMaquina">
                                              <span>Máquina: <span>${todosChamados.chamadosEmAndamento[i].usuario}</span></span>
                                              <span>Tipo: <span>${todosChamados.chamadosEmAndamento[i].tipo}</span></span>
                                          </div>
                                      </div>
                                      <div class="infoAtribuicao">
                                          <span>${todosChamados.chamadosEmAndamento[i].nome}</span>
                                          <span>${todosChamados.chamadosEmAndamento[i].prioridade}</span>
                                      </div>
                                  </div> `
  }

  for(let i = 0; i < todosChamados.chamadosEncerrados.length; i++){
    chamadosEncerrados.innerHTML = `<div class="boxChamado" onclick="mostrarModalChamado(${todosChamados.chamadosEncerrados[i].idChamado})">
                                      <div class="infoChamado">
                                          <h3>${todosChamados.chamadosEncerrados[i].titulo}</h3>
                                          <div class="infoMaquina">
                                              <span>Máquina: <span>${todosChamados.chamadosEncerrados[i].usuario}</span></span>
                                              <span>Tipo: <span>${todosChamados.chamadosEncerrados[i].tipo}</span></span>
                                          </div>
                                      </div>
                                      <div class="infoAtribuicao">
                                          <span>${todosChamados.chamadosEncerrados[i].nome}</span>
                                          <span>${todosChamados.chamadosEncerrados[i].prioridade}</span>
                                      </div>
                                      </div> `
  }
  

}