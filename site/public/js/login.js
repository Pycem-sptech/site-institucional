function fazerLogin() {

  const email = document.getElementById("email");
  const senha = document.getElementById("password");

  var emailVar = email.value;
  var senhaVar = senha.value;

  if (emailVar == "" || senhaVar == "") {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Todos os campos estão vazios!'
    })

    return false;
  }

  fetch("/usuario/entrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!'
      })

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        sessionStorage.USER_EMAIL = json.email;
        sessionStorage.USER_NAME = json.nome;
        sessionStorage.USER_CARGO = json.cargo;
        sessionStorage.FK_EMPRESA = json.fkEmpresa;

        if (json.fkEmpresa == null && json.cargo == 'Dono') {
          setTimeout(function () {
            window.location = "./cadastroEmpresa.html";
          }, 2000);
        } else if (json.cargo == "Tecnico") {
          setTimeout(function () {
            window.location = "./gerenciamentoMaquinas.html";
          }, 2000);
        } else if (json.cargo == "Supervisor") {
          setTimeout(function () {
            window.location = "./gerenciamentoMaquinas.html";
          }, 2000);
        }else {
          setTimeout(function () {
            window.location = "./cadastroUnidade.html";

          }, 2000);
        }
      });

    } else {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Houve um erro ao tentar realizar o login!'
      })

      console.log("Houve um erro ao tentar realizar o login!");
      resposta.text().then(texto => {
        console.error(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;
}

