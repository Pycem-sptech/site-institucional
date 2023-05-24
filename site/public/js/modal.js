function mostrarModal(id) {
  sessionStorage.ID_SELECIONADO = id;
  let overlay = document.querySelector('.overlay')
  let modal = document.querySelector('.modal')
  overlay.style.display = 'block';
  modal.style.display = 'block';
}

function mostrarModalChamado(idChamado) {
  fetch(`/chamado/buscarChamado/${idChamado}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          //Atualiza o modal
          let tituloModal = document.getElementById("titulo");
          tituloModal.innerHTML = resposta[0].titulo;
          atualizarDadosModal(idChamado)
          //Atualiza a Máquina
          //Atualiza a Unidade


          //Atualiza a prioridade
          
          

          //Mostra o modal
          let overlay = document.querySelector('.overlay')
          let modal = document.querySelector('.modalChamado')
          overlay.style.display = 'block';
          modal.style.display = 'block';
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

function mostrarModalNovoChamado() {
  let overlayNovoChamado = document.querySelector('.overlayNovoChamado')
  let modal = document.querySelector('.modalNovoChamado')
  overlayNovoChamado.style.display = 'block';
  modal.style.display = 'block';
}

function mostrarModalRelatorio(chamada = 0) {
  let overlay = document.querySelector('.overlay')
  let modalRelatorio = document.querySelector('.modalRelatorio')
  overlay.style.display = 'block';
  modalRelatorio.style.display = 'block';
  let dataAtual = new Date();
  dataAtual = dataAtual.toLocaleDateString("pt-br");
  dataModal.value = dataAtual;
  if (chamada == 0) {
    btnSalvarModal.setAttribute("onclick", `cadastrarRelatorio()`);
  } else {
    btnSalvarModal.setAttribute("onclick", `editarRelatorio()`);
  }
}

function fecharModal() {
  sessionStorage.ID_SELECIONADO = "";
  let overlay = document.querySelector('.overlay')
  let modal = document.querySelector('.modal')
  overlay.style.display = 'none';
  modal.style.display = 'none';
}

function fecharModalRelatorio() {
  sessionStorage.RELATORIO_SELECIONADO = "";
  let overlay = document.querySelector('.overlay')
  let modalRelatorio = document.querySelector('.modalRelatorio')
  tituloModal.value = "";
  dataModal.value = "";
  descricaoModal.value = "";
  escolherTipoProblemaModal.value = "";
  overlay.style.display = 'none';
  modalRelatorio.style.display = 'none';
}

function fecharModalChamado() {
  sessionStorage.ID_SELECIONADO = "";
  let overlay = document.querySelector('.overlay')
  let modal = document.querySelector('.modalChamado')
  overlay.style.display = 'none';
  modal.style.display = 'none';
}

function fecharModalNovoChamado() {
  sessionStorage.ID_SELECIONADO = "";
  let overlayNovoChamado = document.querySelector('.overlayNovoChamado')
  let modalNovoChamado = document.querySelector('.modalNovoChamado')
  overlayNovoChamado.style.display = 'none';
  modalNovoChamado.style.display = 'none';
}

function salvarEdicaoMaquina(idTotem) {
  let fkUnidade = document.getElementById("escolherUnidadeModal").value;
  let usuario = document.getElementById("usuarioModal").value;
  let senha = document.getElementById("senhaModal").value;
  let numeroDeSerie = document.getElementById('numeroDeSerieModal').value;
  let processador = document.getElementById('processadorModal').value;
  let memoriaRam = document.getElementById('memoriaRamModal').value;
  let escolherArmazenamento = document.getElementById('escolherArmazenamentoModal').value;
  let qtdArmazenamento = document.getElementById('qtdArmazenamentoModal').value;

  if (fkUnidade != undefined && numeroDeSerie != undefined && usuario != undefined && senha != undefined && numeroDeSerie != '' && processador != undefined && processador != '' && memoriaRam != undefined && memoriaRam != '' && escolherArmazenamento != undefined && escolherArmazenamento != '' && qtdArmazenamento != undefined && qtdArmazenamento != '') {
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
        fetch(`maquina/editar/${idTotem}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fkUnidade: fkUnidade,
            usuario: usuario,
            senha: senha,
            numeroDeSerie: numeroDeSerie,
            processador: processador,
            memoriaRam: memoriaRam,
            tipoArmazenamento: escolherArmazenamento,
            qtdArmazenamento: qtdArmazenamento,
          })
        }).then(function (resposta) {

          if (resposta.ok) {
            Swal.fire(
              'Pronto!',
              'Suas alterações foram gravadas',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                limparFeed();
                atualizarMaquinasCadastradas();
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

function deletarMaquina(idMaquina) {
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
      fetch(`/maquina/deletar/${idMaquina}`, {
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
              limparFeed();
              atualizarMaquinasCadastradas();
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

function salvarEdicaoUnidade(idUnidade) {
  let nomeUnidade = document.getElementById('nomeUnidadeModal').value;
  let cepUnidade = document.getElementById('cepUnidadeModal').value;
  let ufUnidade = document.getElementById('ufUnidadeModal').value;
  let cidadeUnidade = document.getElementById('cidadeUnidadeModal').value;
  let logradouroUnidade = document.getElementById('logradouroUnidadeModal').value;
  let bairroUnidade = document.getElementById('bairroUnidadeModal').value;
  let numeroUnidade = document.getElementById('numeroUnidadeModal').value;
  let telefoneUnidade = document.getElementById('telefoneUnidadeModal').value;

  if (nomeUnidade != undefined && nomeUnidade != '' && cepUnidade != undefined && cepUnidade != '' && ufUnidade != undefined && ufUnidade != '' && cidadeUnidade != undefined && cidadeUnidade != '' && logradouroUnidade != undefined && logradouroUnidade != '' && bairroUnidade != undefined && bairroUnidade != '' && numeroUnidade != undefined && numeroUnidade != '' && telefoneUnidade != undefined && telefoneUnidade != '') {
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
        fetch(`unidade/editar/${idUnidade}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome: nomeUnidadeModal.value,
            logradouro: logradouroUnidadeModal.value,
            cep: cepUnidadeModal.value,
            uf: ufUnidadeModal.value,
            cidade: cidadeUnidadeModal.value,
            bairro: bairroUnidadeModal.value,
            numero: numeroUnidadeModal.value,
            telefone: telefoneUnidadeModal.value,
          })
        }).then(function (resposta) {

          if (resposta.ok) {
            Swal.fire(
              'Pronto!',
              'Suas alterações foram gravadas',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                atualizarUnidadesCadastradas();
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

function deletarUnidade(idUnidade) {

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
      fetch(`/unidade/deletar/${idUnidade}`, {
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
              window.location = "../gerenciamentoMaquinas.html"
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

function salvarEdicaoFuncionario(idFuncionario) {
  let idFunc = sessionStorage.ID_SELECIONADO
  let nomeFuncionario = document.getElementById('nomeFuncionarioModal').value;
  let cargoFuncionario = document.getElementById('escolherCargoModal').value;
  let emailFuncionario = document.getElementById('emailModal').value;
  let cpfFuncionario = document.getElementById('cpfModal').value;
  let senhaFuncionario = document.getElementById('senhaModal').value;

  if (nomeFuncionario != undefined && nomeFuncionario != '' && cargoFuncionario != undefined && cargoFuncionario != '' && emailFuncionario != undefined && emailFuncionario != '' && cpfFuncionario != undefined && cpfFuncionario != '' && senhaFuncionario != undefined && senhaFuncionario != '') {
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
        fetch(`usuario/editar/${idFunc}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome: nomeFuncionario,
            cargo: cargoFuncionario,
            email: emailFuncionario,
            cpf: cpfFuncionario,
            senha: senhaFuncionario
          })
        }).then(function (resposta) {

          if (resposta.ok) {
            Swal.fire(
              'Pronto!',
              'Suas alterações foram gravadas',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                limparFeed();
                atualizarFuncionariosCadastrados();
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

function deletarFuncionario(idFuncionario) {
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
      fetch(`/usuario/deletar/${idFuncionario}`, {
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
              window.location = "../gerenciamentoFuncionarios.html"
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

function atualizarSelectUnidadesChamado() {
  const selectChamado = document.querySelector('#escolherUnidadeModal');
  const selectNovoChamado = document.querySelector('#escolherUnidadeModalNovoChamado');
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
            selectChamado.options[selectChamado.options.length] = new Option(resposta[i].nome, resposta[i].idUnidade);
            selectNovoChamado.options[selectNovoChamado.options.length] = new Option(resposta[i].nome, resposta[i].idUnidade);
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

function atualizarSelectMaquinaChamado() {
  const selectChamado = document.querySelector('#escolherMaquinaModal');
  const selectNovoChamado = document.querySelector('#escolherMaquinaModalNovoChamado');  
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
            selectChamado.options[selectChamado.options.length] = new Option(resposta[i].usuario, resposta[i].idTotem);
            selectNovoChamado.options[selectNovoChamado.options.length] = new Option(resposta[i].usuario, resposta[i].idTotem);
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

function atualizarSelectUnidadeNovoChamadoPorMaquina() {
  const select = document.querySelector('#escolherUnidadeModalNovoChamado');
  const maquinaSelecionada = escolherMaquinaModalNovoChamado.value;
  fetch(`/chamado/listarUnidadesPorMaquina/${maquinaSelecionada}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          for (var i = 0; i < select.options.length; i++) {
            if (resposta[0].fkUnidade == select.options[i].value) {
              select.options[i] = new Option(resposta[0].nome, resposta[0].fkUnidade);
              select.options[i].selected = true;
            }
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

function atualizarSelectMaquinaChamadoPorUnidade() {
  const select = document.querySelector('#escolherMaquinaModalNovoChamado');
  const unidadeSelecionada = escolherUnidadeModalNovoChamado.value;
  fetch(`/chamado/listarMaquinasPorUnidade/${unidadeSelecionada}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          select.options.length = 0;
          select.options[select.options.length] = new Option('Máquina', '');
          select.options[select.options.length - 1].select = true;
          select.options[select.options.length - 1].disabled = true;
          for (var i = 0; i < resposta.length; i++) {
            select.options[select.options.length] = new Option(resposta[i].usuario, resposta[i].idTotem);
          }
          if (resposta.length == 0) {
            select.options[select.options.length] = new Option('Nenhuma Máquina encontrada', '');
            select.options[select.options.length - 1].disabled = true;
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

function atualizarSelectAtribuicaoChamado() {
  const select = document.querySelector('#escolherAtribuicaoModal');
  const empresa = sessionStorage.FK_EMPRESA;
  fetch(`/usuario/listarTecnicos/${empresa}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          for (var i = 0; i < resposta.length; i++) {
            select.options[select.options.length] = new Option(resposta[i].nome, resposta[i].idUsuario);
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