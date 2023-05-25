function fazerLogin() {
  const email = document.getElementById("email");
  const senha = document.getElementById("password");

  var emailVar = email.value;
  var senhaVar = senha.value;

  if (emailVar == "" || senhaVar == "") {
    toastPadrao('error', 'Todos os campos estão vazios!');
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
      toastPadrao('success', 'Login realizado com sucesso!');

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        
        sessionStorage.USER_ID = json.idUsuario;
        sessionStorage.USER_EMAIL = json.email;
        sessionStorage.USER_ID = json.idUsuario;
        sessionStorage.USER_NAME = json.nome;
        sessionStorage.USER_FULLNAME = json.nomeCompleto;
        sessionStorage.USER_CARGO = json.cargo;
        sessionStorage.FK_EMPRESA = json.fkEmpresa;
        listarAlertas();
        validarCargo(json.cargo, json.fkEmpresa);
      });

    } else {
      toastPadrao('error', 'Houve um erro ao tentar realizar o login!');
      resposta.text().then(texto => {
        console.error(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;
}

function validarCargo(cargo, fkEmpresa) {
  if (cargo == 'Dono' && fkEmpresa == null) {
    redirectCadEmpresa();
  } else if (cargo == 'Dono') {
    redirectHome();
  } else if (cargo == 'Tecnico') {
    redirectAllUnits()
  } else if (cargo == 'Supervisor') {
    redirectHome();
  } else {
    redirectHome();
  }
}