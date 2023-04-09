function mostrarModal() {
  let overlay = document.querySelector('.overlay')
  let modal = document.querySelector('.modal')
  overlay.style.display = 'block';
  modal.style.display = 'block';
}
function mostrarModalRelatorio() {
  let overlay = document.querySelector('.overlay')
  let modalRelatorio = document.querySelector('.modalRelatorio')
  overlay.style.display = 'block';
  modalRelatorio.style.display = 'block';
}
function fecharModal() {
  let overlay = document.querySelector('.overlay')
  let modal = document.querySelector('.modal')
  overlay.style.display = 'none';
  modal.style.display = 'none';
}
function fecharModalRelatorio() {
  let overlay = document.querySelector('.overlay')
  let modalRelatorio = document.querySelector('.modalRelatorio')
  overlay.style.display = 'none';
  modalRelatorio.style.display = 'none';
}

function salvarEdicaoMaquina(idMaquina) {
  let numeroDeSerie = document.getElementById('numeroDeSerieModal').value;
  let processador = document.getElementById('processadorModal').value;
  let memoriaRam = document.getElementById('memoriaRamModal').value;
  let escolherArmazenamento = document.getElementById('escolherArmazenamentoModal').value;
  let qtdArmazenamento = document.getElementById('qtdArmazenamentoModal').value;

  if (numeroDeSerie != undefined && numeroDeSerie != '' && processador != undefined && processador != '' && memoriaRam != undefined && memoriaRam != '' && escolherArmazenamento != undefined && escolherArmazenamento != '' && qtdArmazenamento != undefined && qtdArmazenamento != '') {
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
        fetch(`maquina/editar/${idMaquina}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
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
                window.location = "../gerenciamentoMaquinas.html"
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
              window.location = "../../gerenciamentoMaquinas.html"
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
                window.location = "../cadastroUnidade.html"
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
              window.location = "../cadastroUnidade.html"
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
  let nomeFuncionario = document.getElementById('nomeFuncionarioModal').value;
  let cargoFuncionario = document.getElementById('escolherCargoModal').value;
  let emailFuncionario = document.getElementById('emailModal').value;
  let cpfFuncionario = document.getElementById('cpfModal').value;
  let senhaFuncionario = document.getElementById('senhaModal').value;

  if (nomeFuncionario != undefined && nomeFuncionario != ''  && cargoFuncionario != undefined && cargoFuncionario != '' && emailFuncionario != undefined && emailFuncionario != '' && cpfFuncionario != undefined && cpfFuncionario != '' && senhaFuncionario != undefined && senhaFuncionario != '') {
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
        fetch(`usuario/editar/${idFuncionario}`, {
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
                window.location = "../gerenciamentoFuncionarios.html"
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