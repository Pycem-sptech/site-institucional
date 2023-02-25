function entrar() {

  
    var emailVar = Email.value;
    var senhaVar = Senha.value;
  
    if (emailVar == "" || senhaVar == "") {
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }
  
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);
  
    fetch("/empresa/autenticar", {
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
            console.log(resposta);
  
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
  
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.representante;
                sessionStorage.ID_USUARIO = json.idEmpresa;
                sessionStorage.NOME_VINICOLA = json.nomeVinicola;
  
                setTimeout(function () {
                    window.location = "dashInicial.html";
                }, 1000); // apenas para exibir o loading
  
            });
  
        } else {
  
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
  

  