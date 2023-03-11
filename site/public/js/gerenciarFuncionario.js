var emailExiste = false;
var cpfExiste = false;

function cadastrarFuncionarios() {
  const nome = document.getElementById("name");
  const email = document.getElementById("email");
  const cpf = document.getElementById("cpf");
  const senha = document.getElementById("password");
  const confirmaSenha = document.getElementById("confirmPassword");
  const cargo = document.getElementById("selectCargo");
  const unidade = document.getElementById("selectUnidade");

  var nomeVar = nome.value;
  var emailVar = email.value;
  var cpfVar = cpf.value;
  var senhaVar = senha.value;
  var confirmaSenhaVar = confirmaSenha.value;
  var cargoVar = cargo.value;
  var unidadeVar = unidade.value;

  if (nomeVar == "" || emailVar == "" || cpfVar == "" || senhaVar == "" || confirmaSenhaVar == "" || cargoVar == "" || unidadeVar == "" ) {
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
        unidadeServer: unidadeVar
    
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
