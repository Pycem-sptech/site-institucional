function criarConta() {
  const nome = document.getElementById("name");
  const email = document.getElementById("email");
  const cpf = document.getElementById("cpf");
  const senha = document.getElementById("password");
  const confirmaSenha = document.getElementById("confirmPassword");

  var nomeVar = nome.value;
  var emailVar = email.value;
  var cpfVar = cpf.value;
  var senhaVar = senha.value;
  var confirmaSenhaVar = confirmaSenha.value;

  if (nomeVar == "" || emailVar == "" || cpfVar == "" || senhaVar == "" || confirmaSenhaVar == "") {
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
      title: "Preencha os campos estão vazios",
    });
    return false;
  } else if (senhaVar != confirmaSenhaVar) {
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
      title: "Suas senhas não são iguais!",
    });
    return false;
  } else if (
    !validarSenha(password).valida
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "Senha não está cumprindo com os requisitos",
    });

    return false;
  } else if (emailExiste) {
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
      title: "O email digitado já está cadastrado",
    });
  } else if (cpfExiste) {
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
      title: "O cpf digitado já está cadastrado",
    });
  } else {
    fetch("/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        nomeServer: nomeVar,
        emailServer: emailVar,
        cpfServer: cpfVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
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
          setTimeout(() => {
            window.location = "./login.html";
          }, "3000");
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

function reCaptcha() {
  let form = document.querySelector("#formRegister");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm();
  });
  if (captchaOn) {
    criarConta();
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
      icon: "warning",
      title: "Faça a verificação do ReCAPTCHA",
    });
  }
}

var captchaOn = false;

function sendForm() {
  captchaOn = true;
}

function validarSenha(senhaVar) {
  const senha = {
    valida: false,
    dadosSenha: {
      qtdEspeciais: 0,
      qtdMaiusculas: 0,
      qtdNumeros: 0,
      qtdDigitos: senhaVar.value.length,
    }
  };

  let posicao = 0;
  const caracteresEspeciais = '@#$%¨&*(){}`^~:;><.,?/+-=§_';
  const numeros = '0123456789';
  while (posicao < senhaVar.value.length) {
    console.log(senhaVar.value[posicao])
    if (caracteresEspeciais.indexOf(senhaVar.value[posicao]) >= 0) {
      senha.dadosSenha.qtdEspeciais++;
    } else if (numeros.indexOf(senhaVar.value[posicao]) >= 0) {
      senha.dadosSenha.qtdNumeros++;
    } else if (senhaVar.value[posicao] == senhaVar.value[posicao].toUpperCase()) {
      senha.dadosSenha.qtdMaiusculas++;
    }
    posicao++

  }

  if (senha.dadosSenha.qtdDigitos >= 6 && senha.dadosSenha.qtdEspeciais >= 1 && senha.dadosSenha.qtdMaiusculas >= 1 && senha.dadosSenha.qtdNumeros >= 1) {
    senha.valida = true;
  }
  return senha;
}

function mostrarSituacaoSenha(senhaJ) {
  if (senhaJ.dadosSenha.qtdDigitos >= 6) {
    digito.innerHTML = `<img src="img/certo.svg"> 6 dígitos`
  } else {
    digito.innerHTML = `<img src="img/errado.svg"> 6 dígitos`
  }

  if (senhaJ.dadosSenha.qtdMaiusculas >= 1) {
    maiuscula.innerHTML = `<img src="img/certo.svg"> Letra maiúculas`
  } else {
    maiuscula.innerHTML = `<img src="img/errado.svg"> Letra maiúculas`
  }

  if (senhaJ.dadosSenha.qtdEspeciais >= 1) {
    caracterEspecial.innerHTML = `<img src="img/certo.svg"> Carac. Especial`
  } else {
    caracterEspecial.innerHTML = `<img src="img/errado.svg"> Carac. Especial`
  }

  if (senhaJ.dadosSenha.qtdNumeros >= 1) {
    numeros.innerHTML = `<img src="img/certo.svg"> Números`
  } else {
    numeros.innerHTML = `<img src="img/errado.svg"> Números`
  }
}

function validarConfimarSenha(senha, confirmarSenha) {
  return senha == confirmarSenha;
}