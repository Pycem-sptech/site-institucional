var emailExiste = false;
var cnpjExiste = false;

function cadastrarEmp() {
  const nomeVar = nomeCompany.value;
  const emailVar = emailCompany.value;
  const telefoneVar = telefoneCompany.value;
  const cnpjVar = cnpjCompany.value;
  const emailUserVar = sessionStorage.USER_EMAIL;

  if (nomeVar == "" || emailVar == "" || telefoneVar == "" || cnpjVar == "") {
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

  } else if(emailExiste) {
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

  } else if (cnpjExiste) {
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
      title: "O cnpj digitado já está cadastrado",
    });
    
  } else {
    fetch("/empresa/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        telefoneServer: telefoneVar,
        cnpjServer: cnpjVar,
        emailUserServer: emailUserVar,
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
                window.location = "./cadastroUnidade.html";
              }, "3000");
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function validarEmail(emailVar) {
    fetch(`/empresa/verificarEmail/${emailVar}`)
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
  
  function validarCnpj(cnpjVar) {
    fetch(`/empresa/verificarCnpj/${cnpjVar}`)
      .then(function (resposta) {
        if (resposta.ok) {
          if (resposta.status == 204) {
            console.log("Nenhum resultado encontrado!!");
            cnpjExiste = false;
            throw "Nenhum resultado encontrado!!";
          }
          resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            console.log("O cnpj " + resposta[0].cnpj + " já existe");
            cnpjExiste = true;
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