let meusChamados =  {
  chamadosAbertos: [],
  chamadosFechados: [],
  chamadosEmAndamento: []
}
let todosChamados =  {
  chamadosAbertos: [],
  chamadosFechados: [],
  chamadosEmAndamento: []
}

function criarChamado(){
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    const fkMaquina = 1//escolherMaquinaModal.value;
    const fkUsuario = 1//escolherAtribuicaoModal.value;
    const fkUnidade = 1//escolherUnidadeModal.value;
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
        fetch("/chamado/cadastrarChamado", {
          method: "POST",
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
            descricao:descricao,
            fkEmpresa:fkEmpresa
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
function editarChamado(idChamado){
  const fkMaquina = escolherMaquinaModal.value;
  const fkUsuario = escolherAtribuicaoModal.value;
  const fkUnidade = escolherUnidadeModal.value;
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
            descricao:descricao
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


function deletarChamado(idChamado){
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

function mostrarChamado(lista){
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

  const listaMaquinas = [];
  const listaUnidades = [];

  function atualizarListaUnidades() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;

    fetch(`/unidade/listarUnidades/${fkEmpresa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                  for(var i = 0; i < resposta.length; i++){
                    listaUnidades = reposta[i];
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
