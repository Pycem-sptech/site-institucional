
function criarConta() {
  var emailExistente = sessionStorage.getItem("EMAIL_EXISTE");
  var cpfExiste = sessionStorage.getItem("CPF_EXISTE");
  sessionStorage.clear();
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
  validarEmail(emailVar);
  validarCpf(cpfVar);

  if (
    nomeVar == "" ||
    emailVar == "" ||
    cpfVar == "" ||
    senhaVar == "" ||
    confirmaSenhaVar == ""
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
      title: "Preencha os campos estão vazios",
    });
    return false;
  } else if (senhaVar != confirmaSenhaVar) {
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
      title: "Suas senhas não são iguais!",
    });

    return false;
  } else {
  }

 
  console.log(emailExistente);
  console.log(cpfExiste);

  if (emailExistente == "true") {
    sessionStorage.clear();
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
      title: "O email digitado já está cadastrado",
    });
  } else if (cpfExiste == "true") {
    sessionStorage.clear();
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
      title: "O cpf digitado já está cadastrado",
    });
  } else {
    // Enviando o valor da nova input
    fetch("/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js

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
          }, "2000");
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
          throw "Nenhum resultado encontrado!!";
        }
          resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          console.log("O email " + resposta[0].email + " já existe");
          sessionStorage.EMAIL_EXISTE = true;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
  sessionStorage.EMAIL_EXISTE = false;
  return false;
}

function validarCpf(cpfVar) {
  fetch(`/usuario/verificarCpf/${cpfVar}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          console.log("Nenhum resultado encontrado!!");
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          console.log("O cpf " + resposta[0].cpf + " já existe");
          sessionStorage.CPF_EXISTE = true;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });

    sessionStorage.CPF_EXISTE = false;
  return false;
}

// funcao reCAPCHA

function mostrarRegra() {
  let recaptcha = document.getElementById('recaptcha');
  let regraSenha = document.getElementById('sessionSenha');

  recaptcha.style.display="none";
  regraSenha.style.display="";

}

function ocultarRegra() {
  let recaptcha = document.getElementById('recaptcha');
  let regraSenha = document.getElementById('sessionSenha');

  recaptcha.style.display="";
  regraSenha.style.display="none";

}

function reCaptcha() {
  let form = document.querySelector('#formRegister');
  form.addEventListener('submit',  e => {
    e.preventDefault();
    
    grecaptcha.execute();
       
  });
    
  criarConta();

}

