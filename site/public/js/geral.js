// sessão
function validarSessao() {

    var email = sessionStorage.USER_EMAIL;
    var nome = sessionStorage.USER_NAME;
    var fkEmpresa = sessionStorage.FK_EMPRESA;

    if (email != null && nome != null && fkEmpresa == "null") {
        usuarioLogado.innerHTML = nome;
        usuarioLogado2.innerHTML = nome;

    } else if(email != null && nome != null){
        usuarioLogado.innerHTML = nome;
    }
    // else {
    //     window.location = "./login.html";
    // }
}

function limparSessao() {
    Swal.fire({
        title: 'Tem certeza que deseja sair?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não, quero ficar!',
        confirmButtonText: 'Sim, quero sair!'
      }).then((result) => {
        if (result.isConfirmed) {
         
          sessionStorage.clear();
 
          window.location = "../index.html";
        }
      })
}

// API DO CEP

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouroUnit').value=("");
    document.getElementById('bairroUnit').value=("");
    document.getElementById('cidadeUnit').value=("");
    document.getElementById('ufUnit').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('logradouroUnit').value=(conteudo.logradouro);
    document.getElementById('bairroUnit').value=(conteudo.bairro);
    document.getElementById('cidadeUnit').value=(conteudo.localidade);
    document.getElementById('ufUnit').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('logradouroUnit').value="...";
        document.getElementById('bairroUnit').value="...";
        document.getElementById('cidadeUnit').value="...";
        document.getElementById('ufUnit').value="...";
       

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
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
            title: "Formato de CEP inválido.",
          });
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

function autenticar() {
    var email = sessionStorage.USER_EMAIL;
    fetch("/usuario/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
           
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {                
                sessionStorage.FK_EMPRESA = json.fkEmpresa;
            });

        } else {
            console.log("Houve um erro ao validar!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function redirectFunc(){
    setTimeout(function () {
        window.location = "./gerenciamentoFuncionarios.html";
    }, 250); 
}
function redirectMachine(){
    setTimeout(function () {
        window.location = "./gerenciamentoMaquinas.html";
    }, 250); 
}
function redirectUnit(){
    setTimeout(function () {
        window.location = "./cadastroUnidade.html";
    }, 250); 
}
function redirectDashboard(){
    setTimeout(function () {
        window.location = "#";
    }, 250); 
}
function redirectSuport(){
    setTimeout(function () {
        window.location = "#";
    }, 250); 
}
function redirectConfig(){
    setTimeout(function () {
        window.location = "#";
    }, 250); 
}
