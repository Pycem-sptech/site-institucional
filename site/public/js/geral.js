
function mudarLista(valorCombo="0") {
    if (valorCombo != "0") {
        sessionStorage.TIPO_TELA = valorCombo;
    }
    if (sessionStorage.TIPO_TELA == "1") {
        listUnit.innerHTML = ` <div class="box idUnit">
                    <span>ID</span>
                </div>
                <div class="box nameUnit">
                    <img src="img/storeIcon.svg" alt="">
                    <span>Nome da Unidade</span>
                </div>
                <div class="box machineAvailable">
                    <span>Máq. disponíveis</span>
                    <div class="status green"></div>
                </div>
                <div class="box machineMaintenance">
                    <span>Máq. em manutenção</span>
                    <div class="status orange"></div>
                </div>
                <div class="box machineOff">
                    <span>Máq. desligadas</span>
                    <div class="status red"></div>
                </div>
                <div class="box totalMachine">
                    <span>Total de máquinas</span>
                </div>`;

        navigationIconUnit.className = "iconSidebar navigationIcon telaAtual";
        navigationIconMach.className = "iconSidebar navigationIcon";
        firstStep.innerHTML = "Unidades";
        welcomeSentence.innerHTML = "Todas as unidades";
        atualizarListaUnidades();
        inputSearch.setAttribute("onkeyup", "atualizarListaUnidadesFiltradas(this.value)");
    } else {
        listUnit.innerHTML = ` <div class="box idUnit">
                    <span>ID</span>
                </div>
                <div class="box nameUnit">
                    <img src="img/storeIcon.svg" alt="">
                    <span >Nome da Máquina</span>
                </div>
                <div class="box machineAvailable">
                    <span>Mac Address</span>
                    
                </div>
                <div class="box machineMaintenance">
                    <span>End. IPV6</span>
                    
                </div>
                <div class="box machineOff">
                    <span>Estado</span>
                    
                </div>
                <div class="box totalMachine">
                    <span>Status Alerta</span>
                </div>`;
        navigationIconUnit.className = "iconSidebar navigationIcon";
        navigationIconMach.className = "iconSidebar navigationIcon  telaAtual";
        welcomeSentence.innerHTML = "Todas as máquinas";
        firstStep.innerHTML = "Máquinas";      
        atualizarListaMaquinas();
        inputSearch.setAttribute("onkeyup", "atualizarListaMaquinasFiltradas(this.value)")
    }
    selectMachUnit.value =  sessionStorage.TIPO_TELA;
}

function privarFuncTecnico() {
    if (sessionStorage.USER_CARGO == "Tecnico") {
        document.body.innerHTML = "";
        window.location = "./erro404.html";
    }
}

function privarFuncSupervisor() {
    if (sessionStorage.USER_CARGO == "Supervisor") {
        document.body.innerHTML = "";
        window.location = "./erro404.html";
    }
}

// sessão
function validarSessao() {

    var email = sessionStorage.USER_EMAIL;
    var nome = sessionStorage.USER_NAME;
    var fkEmpresa = sessionStorage.FK_EMPRESA;

    var campos = document.getElementsByClassName("usuarioLogado");

    for (var i = 0; i < campos.length; i++) {
        campos[i].innerHTML = nome;
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

function limparFeed() {
    var feed = document.getElementById("feed");
    feed.innerHTML = "";
}

function impersonateUser(usuarioDesejado) {
    if (sessionStorage.USER_CARGO == 'Dono') {
        sessionStorage.ERA_DONO = 'true';
        sessionStorage.USER_CARGO = `${usuarioDesejado}`
        toastPadrao('success', `Iniciando visão de ${usuarioDesejado}`);
    }
}

function deimpersonateUser() {
    if (sessionStorage.ERA_DONO == 'true')
        sessionStorage.USER_CARGO = "Dono"
    toastPadrao('success', 'Iniciando visão de Dono')
    window.location = "#";
    sessionStorage.removeItem('ERA_DONO');
}

function toastPadrao(icon, title) {
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

function toastInfinito(icon, title) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: ``,
        timerProgressBar: true,
        showCloseButton: true,
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

// Redirecionamentos

function redirectHome() {
    setTimeout(function () {
        window.location = "./home.html";
    }, 200);
}
function redirectCadEmpresa() {
    setTimeout(function () {
        window.location = "./cadastroEmpresa.html";
    }, 250);
}
function redirectFunc() {
    setTimeout(function () {
        window.location = "./gerenciamentoFuncionarios.html";
    }, 200);
}
function redirectMachine() {
    setTimeout(function () {
        window.location = "./gerenciamentoMaquinas.html";
    }, 200);
}
function redirectUnit() {
    setTimeout(function () {
        window.location = "./gerenciamentoUnidades.html";
    }, 200);
}
function redirectAllUnits() {
    setTimeout(function () {
        sessionStorage.TIPO_TELA = "1";
        window.location = "./unidade.html";
    }, 200);
}
function redirectAllMach() {
    setTimeout(function () {
        sessionStorage.TIPO_TELA = "2";
        window.location = "./unidade.html";
    }, 200);

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
function redirectAlert() {
    setTimeout(function () {
        window.location = "alerta.html";
    }, 250);
}
function redirectDashUnits(unidadeDesejada, nomeUnidadeDesejada) {
    sessionStorage.ID_UNIDADE = unidadeDesejada;
    sessionStorage.VER_UNIDADE = unidadeDesejada;
    sessionStorage.VER_NOME_UNIDADE = nomeUnidadeDesejada;
    setTimeout(function () {
        window.location = "./dashboardMaquina.html";
    }, 250);
}
function redirectGraficos(totemDesejado, totem) {
    sessionStorage.ID_TOTEM = totemDesejado;
    sessionStorage.VER_TOTEM = `${totem}`;
    setTimeout(function () {
        window.location = "./graficos.html";
    }, 250);
}
function redirectVisaoGeral() {
    setTimeout(function () {
        window.location = "home.html";
    }, 250);
}
function redirect404() {
    setTimeout(function () {
        window.location = "erro404.html";
    }, 250);
}


