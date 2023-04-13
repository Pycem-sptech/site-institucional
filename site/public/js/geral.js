function privaFunc() {
    if (sessionStorage.USER_CARGO == "Tecnico") {
        body.innerHTML = `<h1>ERRO</h1>`;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Esta página não existe!',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "../gerenciamentoMaquinas.html"
            }
        })
    } else if (sessionStorage.USER_CARGO == "Supervisor") {
        body.innerHTML = `<h1>ERRO</h1>`;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Esta página não existe!',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "../gerenciamentoMaquinas.html"
            }
        })
    }
}
// sessão
function validarSessao() {

    var email = sessionStorage.USER_EMAIL;
    var nome = sessionStorage.USER_NAME;
    var fkEmpresa = sessionStorage.FK_EMPRESA;

    if (email != null && nome != null && fkEmpresa == "null") {
        usuarioLogado.innerHTML = nome;
        usuarioLogado2.innerHTML = nome;

    } else if (email != null && nome != null) {
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
    document.getElementById('logradouroUnit').value = ("");
    document.getElementById('bairroUnit').value = ("");
    document.getElementById('cidadeUnit').value = ("");
    document.getElementById('ufUnit').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouroUnit').value = (conteudo.logradouro);
        document.getElementById('bairroUnit').value = (conteudo.bairro);
        document.getElementById('cidadeUnit').value = (conteudo.localidade);
        document.getElementById('ufUnit').value = (conteudo.uf);
        document.getElementById('logradouroUnidadeModal').value = (conteudo.logradouro);
        document.getElementById('bairroUnidadeModal').value = (conteudo.bairro);
        document.getElementById('cidadeUnidadeModal').value = (conteudo.localidade);
        document.getElementById('ufUnidadeModal').value = (conteudo.uf);
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
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouroUnit').value = "...";
            document.getElementById('bairroUnit').value = "...";
            document.getElementById('cidadeUnit').value = "...";
            document.getElementById('ufUnit').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } else {
            //cep é inválido.
            limpa_formulário_cep();
            toastPadrao('error', 'Formato de CEP inválido.');
        }
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function pesquisacepModal(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            document.getElementById('logradouroUnidadeModal').value = "...";
            document.getElementById('bairroUnidadeModal').value = "...";
            document.getElementById('cidadeUnidadeModal').value = "...";
            document.getElementById('ufUnidadeModal').value = "...";

            var script1 = document.createElement('script');
            script1.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script1);

        } else {
            limpa_formulário_cep();
            toastPadrao('error', 'Formato de CEP inválido.');
        }
    } else {
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

function impersonateUser(usuarioDesejado){
if(sessionStorage.USER_CARGO == 'Dono'){
    sessionStorage.ERA_DONO = 'true';
    sessionStorage.USER_CARGO = `${usuarioDesejado}`
    toastPadrao('success', `Iniciando visão de ${usuarioDesejado}`);
}
}

function deimpersonateUser(){
    if(sessionStorage.ERA_DONO == 'true')
    sessionStorage.USER_CARGO = "Dono"
    toastPadrao('success', 'Iniciando visão de Dono')
    window.location = "#";
    sessionStorage.removeItem('ERA_DONO');
}

function toastPadrao(icon, title){
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
        icon: `${icon}`,
        title: `${title}`,
    });
}

function redirectFunc() {
    setTimeout(function () {
        window.location = "./gerenciamentoFuncionarios.html";
    }, 250);
}
function redirectMachine() {
    setTimeout(function () {
        window.location = "./gerenciamentoMaquinas.html";
    }, 250);
}
function redirectUnit() {
    setTimeout(function () {
        window.location = "./gerenciamentoUnidades.html";
    }, 250);
}
function redirectAllUnits() {
    setTimeout(function () {
        window.location = "./unidade.html";
    }, 250);
}
function redirectDashUnits(unidadeDesejada, nomeUnidadeDesejada) {
    var unidade = unidadeDesejada;
    sessionStorage.VER_UNIDADE = unidade;
    var nomeUnidade = nomeUnidadeDesejada;
    sessionStorage.VER_NOME_UNIDADE = nomeUnidade;
    setTimeout(function () {
        window.location = "./dashboardMaquina.html";
    }, 250);
}
function redirectDashboard() {
    setTimeout(function () {
        window.location = "./dashboardMaquina.html";
    }, 250);
}
function redirectSuport() {
    setTimeout(function () {
        window.location = "#";
    }, 250);
}
function redirectConfig() {
    setTimeout(function () {
        window.location = "configuracoes.html";
    }, 250);
}