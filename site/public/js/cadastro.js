// // Botão continuar - Verificar se todos os campos foram preenchidos corretamente
// function validarSenha() {
//     const email = document.getElementById("Email");
//     const senha = document.getElementById("senha");
//     const confirmaSenha = document.getElementById("confirmaSenha");

//     //Verifica se o usuário preencheu todos os campos
//     if (email.value == "" || senha.value == "" || confirmaSenha.value == "") {
//       const Toast = Swal.mixin({
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener('mouseenter', Swal.stopTimer)
//           toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//       })

//       Toast.fire({
//         icon: 'error',
//         title: 'Erro! Cadastro Inválido'
//       })
//     }
//       //Verifica se algum campo digitado é inválido
//       else if(validarEmail() == false || validarForcaSenha() == false || validarConfirmarSenha() == false){
//         const Toast = Swal.mixin({
//           toast: true,
//           position: 'top-end',
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//           }
//         })

//         Toast.fire({
//           icon: 'success',
//           title: 'Erro! Cadastro Inválido'
//         })
//       }

//       //Redireciona o cliente para a próxima página de cadastro
//       else {
//         localStorage.setItem('email', email.value);
//         localStorage.setItem('senha', senha.value);
//         window.location.href = "./dados.html";
//         const Toast = Swal.mixin({
//           toast: true,
//           position: 'top-end',
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//           }
//         })

//         Toast.fire({
//           icon: 'success',
//           title: 'Cadastro Realizado com Sucesso!'
//         })
//       }
//       }



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
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Todos os campos estão vazios'
    })
    return false;
  } else if (validarEmail(emailVar)) {
    alert("Email já cadastrado");
    return false;
  } else if (validarCpf(cpfVar)) {
    alert("Cpf já cadastrado");
    return false;
  } 
  else if (senhaVar != confirmaSenhaVar) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Suas senhas não são iguais!'
    })
  
    return false;
  } else {

  }
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
        icon: 'success',
        title: 'Cadastro realizado com sucesso!'
      })
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

function validarEmail(email) {
  var emailVar = email;

  console.log(emailVar);

  fetch("/usuario/verificarEmail", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
          console.log(resposta);
          resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
        });
      } else {
        console.log("Esse email já existe!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

function validarCpf(cpf) {
  var cpfVar = cpf;

  console.log("FORM LOGIN: ", cpfVar);

  fetch("/usuario/verificarCpf", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cpfServer: cpfVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
        });
      } else {
        console.log("Esse cpf já existe!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}