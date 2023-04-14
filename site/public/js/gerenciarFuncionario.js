var emailExiste = false;
var cpfExiste = false;

function cadastrarFuncionario() {
  const nome = document.getElementById("nomeFuncionario");
  const email = document.getElementById("emailFuncionario");
  const cpf = document.getElementById("cpfFuncionario");
  const senha = document.getElementById("password");
  const confirmaSenha = document.getElementById("confirmPassword");
  const cargo = document.getElementById("selectCargo");
  const fkEmpresa = sessionStorage.FK_EMPRESA;

  var nomeVar = nome.value;
  var emailVar = email.value;
  var cpfVar = cpf.value;
  var senhaVar = senha.value;
  var confirmaSenhaVar = confirmaSenha.value;
  var cargoVar = cargo.value;
  var fkEmpresaVar = fkEmpresa;
  if (nomeVar == "" || emailVar == "" || cpfVar == "" || senhaVar == "" || confirmaSenhaVar == "" || cargoVar == "" || fkEmpresaVar == "") {
    toastPadrao('error', 'Preencha os campos que estão vazios!');
    return false;
  } else if (senhaVar != confirmaSenhaVar) {
    toastPadrao('error', 'Suas senhas não são iguais!');
    return false;
  }else if(!validarSenha(password).valida){
    toastPadrao('error', 'Senha não está cumprindo com os requisitos');
    return false;
  } else if (emailExiste) {
    toastPadrao('error', 'O email digitado já está cadastrado');
    return false;
  } else if (cpfExiste) {
    toastPadrao('error', 'O cpf digitado já está cadastrado');
    return false;
  } else {
    fetch("/usuario/cadastrarFuncionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        nomeServer: nomeVar,
        emailServer: emailVar,
        cpfServer: cpfVar,
        senhaServer: senhaVar,
        cargoServer: cargoVar,
        fkEmpresaServer: fkEmpresaVar

      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          atualizarFuncionariosCadastrados();
          limparCamposFuncionarios();
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

function validarEmail(emailVar) {
  fetch(`/usuario/verificarEmail/${emailVar}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          emailExiste = false;
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          console.log("O email " + resposta[0].email + " já existe");
          emailExiste = true;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
  return false;
}

function validarCpf(cpfVar) {
  fetch(`/usuario/verificarCpf/${cpfVar}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          cpfExiste = false;
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          console.log("O cpf " + resposta[0].cpf + " já existe");
          cpfExiste = true;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });

  return false;
}

// funcao reCAPCHA

function mostrarRegra() {
  let recaptcha = document.getElementById("recaptcha");
  let regraSenha = document.getElementById("sessionSenha");

  recaptcha.style.display = "none";
  regraSenha.style.display = "";
}

function ocultarRegra() {
  let recaptcha = document.getElementById("recaptcha");
  let regraSenha = document.getElementById("sessionSenha");

  recaptcha.style.display = "";
  regraSenha.style.display = "none";
}

function validarSenha(senhaVar) {
  const senha = {valida: false, 
      dadosSenha: {
          qtdEspeciais: 0,
          qtdMaiusculas: 0,
          qtdNumeros: 0,
          qtdDigitos: senhaVar.value.length,
  }};
  
  let posicao = 0;
  const caracteresEspeciais = '@#$%¨&*(){}`^~:;><.,?/+-=§_';
  const numeros = '0123456789';
  while (posicao < senhaVar.value.length) {
          console.log(senhaVar.value[posicao])
          if (caracteresEspeciais.indexOf(senhaVar.value[posicao]) >= 0) {
              senha.dadosSenha.qtdEspeciais++;
          } else if (numeros.indexOf(senhaVar.value[posicao]) >= 0) {
              senha.dadosSenha.qtdNumeros++;
          } else if (senhaVar.value[posicao] == senhaVar.value[posicao].toUpperCase()){
              senha.dadosSenha.qtdMaiusculas++;
          }          
          posicao++
   
  }

  if (senha.dadosSenha.qtdDigitos >= 6 && senha.dadosSenha.qtdEspeciais >= 1 && senha.dadosSenha.qtdMaiusculas >= 1 && senha.dadosSenha.qtdNumeros >= 1) {
      senha.valida = true;
  }
  return senha;
}

function mostrarSituacaoSenha(senhaJ){
  if (senhaJ.dadosSenha.qtdDigitos >= 6){
      digito.innerHTML = `<img src="img/certo.svg"> 6 dígitos`
  }else {
      digito.innerHTML = `<img src="img/errado.svg"> 6 dígitos`
  }

  if (senhaJ.dadosSenha.qtdMaiusculas >= 1){
      maiuscula.innerHTML = `<img src="img/certo.svg"> Letra maiúculas`
  }else {
      maiuscula.innerHTML = `<img src="img/errado.svg"> Letra maiúculas`
  }

  if (senhaJ.dadosSenha.qtdEspeciais >= 1){
      caracterEspecial.innerHTML = `<img src="img/certo.svg"> Carac. Especial`
  }else {
      caracterEspecial.innerHTML = `<img src="img/errado.svg"> Carac. Especial`
  }

  if (senhaJ.dadosSenha.qtdNumeros >= 1){
      numeros.innerHTML = `<img src="img/certo.svg"> Números`
  }else {
      numeros.innerHTML = `<img src="img/errado.svg"> Números`
  }
}

function validarConfimarSenha(senha, confirmarSenha) {
  return senha == confirmarSenha;
}

function buscarDadosFuncionario(idFuncionario){
  fetch(`/usuario/listarDadosFuncionario/${idFuncionario}`)
      .then(function (resposta) {
          if (resposta.ok) {
              resposta.json().then(function (resposta) {
                nomeFuncionarioModal.value = resposta[0].nome;
                escolherCargoModal.value = resposta[0].cargo;
                emailModal.value = resposta[0].email;
                cpfModal.value = resposta[0].cpf;
                senhaModal.value = resposta[0].senha;
                  
              });
          } else {
              throw "Houve um erro na API!";
          }
      })
      .catch(function (resposta) {
          console.error(resposta);
      });

}

function atualizarFuncionariosCadastrados() {
  const fkEmpresa = sessionStorage.FK_EMPRESA;
  var fkEmpresaVar = fkEmpresa;
  fetch(`/usuario/listarFuncionarios/${fkEmpresaVar}`)
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
            var divRegisteredEmployee = document.createElement("div");
            var divIdEmployee = document.createElement("div");
            var spanEmployeeName = document.createElement("span");
            var spanCargoEmployee = document.createElement("span");
            var divBtnEditDelete = document.createElement("div");

            divFeed.className = "feed"

            divRegisteredEmployee.className = "RegisteredEmployee";
            divIdEmployee.className = "IdEmployee";
            spanCargoEmployee.className = "addresOpacity";
            spanCargoEmployee.innerHTML = publicacao.cargo;
            spanEmployeeName.innerHTML = publicacao.nome;

            divBtnEditDelete.className = "btnEditDelete";
            divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idUsuario}), buscarDadosFuncionario(${publicacao.idUsuario})'>`;
            divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarFuncionario(${publicacao.idUsuario})'>`;

            feed.appendChild(divRegisteredEmployee);
            divRegisteredEmployee.appendChild(divIdEmployee);
            divRegisteredEmployee.appendChild(divBtnEditDelete);
            divIdEmployee.appendChild(spanEmployeeName);
            divIdEmployee.appendChild(spanCargoEmployee);

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

function filtrarFuncionarios(nomeDigitado) {
  if (nomeDigitado.length > 0) {
    const fkEmpresaVar = sessionStorage.FK_EMPRESA;
      fetch(`/usuario/filtrarFuncionarios/${nomeDigitado}/${fkEmpresaVar}`)
      .then(function (resposta) {
              if (resposta.ok) {
                  if (resposta.status == 204) {
                      var feed = document.getElementById("feed");
                      feed.innerHTML = "";
                      var mensagem = document.createElement("span");
                      mensagem.innerHTML = "Infelizmente, nenhum funcionário foi encontrado.";
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
                      var divRegisteredEmployee = document.createElement("div");
                      var divIdEmployee = document.createElement("div");
                      var spanEmployeeName = document.createElement("span");
                      var spanCargoEmployee = document.createElement("span");
                      var divBtnEditDelete = document.createElement("div");
          
                      divFeed.className = "feed"
          
                      divRegisteredEmployee.className = "RegisteredEmployee";
                      divIdEmployee.className = "IdEmployee";
                      spanCargoEmployee.className = "addresOpacity";
                      spanCargoEmployee.innerHTML = publicacao.cargo;
                      spanEmployeeName.innerHTML = publicacao.nome;
          
                      divBtnEditDelete.className = "btnEditDelete";
                      divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idUsuario}), buscarDadosFuncionario(${publicacao.idUsuario})'>`;
                      divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarFuncionario(${publicacao.idUsuario})'>`;
          
                      feed.appendChild(divRegisteredEmployee);
                      divRegisteredEmployee.appendChild(divIdEmployee);
                      divRegisteredEmployee.appendChild(divBtnEditDelete);
                      divIdEmployee.appendChild(spanEmployeeName);
                      divIdEmployee.appendChild(spanCargoEmployee);
          
                    }
          
                  });
                } else {
                  throw "Houve um erro na API!";
                }
              })
              .catch(function (resposta) {
                console.error(resposta);
              });
  } else {
      atualizarFuncionariosCadastrados();s
  }
}

function limparCamposFuncionarios() {
  document.getElementById('nomeFuncionario').value = ("");
  document.getElementById('cpfFuncionario').value = ("");
  document.getElementById('emailFuncionario').value = ("");
  document.getElementById('password').value = ("");
  document.getElementById('confirmPassword').value = ("");
}