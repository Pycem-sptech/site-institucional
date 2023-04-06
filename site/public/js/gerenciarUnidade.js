var telefoneExiste = false;
var numeroExiste = false;

function cadastrarUni() {
    const nomeVar = nomeUnit.value;
    const telefoneVar = telefoneUnit.value;
    const fkEmpresaVar = sessionStorage.FK_EMPRESA;
    const cepVar = cepUnit.value;
    const ufVar = ufUnit.value;
    const cidadeVar = cidadeUnit.value;
    const logradouroVar = logradouroUnit.value;
    const bairroVar = bairroUnit.value;
    const numeroVar = numeroUnit.value;
    const complementoVar = "";

    console.log(numeroExiste);
    console.log(telefoneExiste);

    if (nomeVar == "" || telefoneVar == "" || cepVar == "" || cepVar == "" || ufVar == "" || cidadeVar == "" || logradouroVar == "" || bairroVar == "" || numeroVar == ""
    ) {
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
            title: "Preencha os campos que estão vazios",
        });
        return false;
    } else if (numeroExiste) {
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
            title: "Já existe uma unidade com esse número de endereço",
        });
    } else if (telefoneExiste) {
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
            title: "O telefone digitado já está cadastrado",
        });

    } else {
        fetch("/unidade/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                telefoneServer: telefoneVar,
                fkEmpresaServer: fkEmpresaVar,
                cepServer: cepVar,
                ufServer: ufVar,
                cidadeServer: cidadeVar,
                logradouroServer: logradouroVar,
                bairroServer: bairroVar,
                numeroServer: numeroVar,
                complementoServer: complementoVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    atualizarUnidadesCadastradas();
                    limparCamposUnidade();
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
                        title: "Houve um erro ao tentar realizar o cadastro!",
                    });
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}
function validarTelefone(telefoneVar) {
    fetch(`/unidade/verificarTelefone/${telefoneVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    telefoneExiste = false;
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    console.log("O telefone " + resposta[0].telefone + " já existe");
                    telefoneExiste = true;
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

function validarNumero(numeroVar) {
    fetch(`/unidade/verificarNumero/${numeroVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Nenhum resultado encontrado!!");
                    numeroExiste = false;
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    console.log("O numero " + resposta[0].numero + " já existe");
                    numeroExiste = true;
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

function buscarDadosUnidade(idUnidade){
    fetch(`/unidade/listarDadosUnidade/${idUnidade}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    nomeUnidadeModal.value = resposta[0].nomeUnidade;
                    cepUnidadeModal.value = resposta[0].cepUnidade;
                    ufUnidadeModal.value = resposta[0].ufUnidade;
                    cidadeUnidadeModal.value = resposta[0].cidadeUnidade;
                    logradouroUnidadeModal.value = resposta[0].logradouroUnidade;
                    bairroUnidadeModal.value = resposta[0].bairroUnidade;
                    numeroUnidadeModal.value = resposta[0].numeroUnidade;
                    telefoneUnidadeModal.value = resposta[0].telefoneUnidade;
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });

}


function atualizarUnidadesCadastradas() {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkEmpresaVar = fkEmpresa;
    fetch(`/unidade/listar/${fkEmpresaVar}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("feed");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Infelizmente, nenhuma unidade foi encontrada.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    var feed = document.getElementById("feed");
                    feed.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];
                        sessionStorage.idUnidade = publicacao.idUnidade;
                        var divFeed = document.createElement("div");
                        var divRegisteredUnit = document.createElement("div");
                        var divnameUnit = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var spanEndereco = document.createElement("span");
                        var divBtnEditDelete = document.createElement("div");
                        

                        divFeed.className = "feed"
                        divRegisteredUnit.className = "registeredUnit";
                        divnameUnit.className = "nameUnit";
                        spanEndereco.className = "addresOpacity";
                        spanNome.innerHTML = publicacao.nome;
                        spanEndereco.innerHTML = publicacao.logradouro;
                        divBtnEditDelete.className = "btnEditDelete";
                        divBtnEditDelete.innerHTML += `<img src='img/Botão Editar.svg' onclick='mostrarModal(${publicacao.idUnidade}), buscarDadosUnidade(${publicacao.idUnidade})'>`;
                        divBtnEditDelete.innerHTML += `<img src='img/Botao Fechar.svg' onclick='deletarUnidade(${publicacao.idUnidade})'>`;
                        ;

                        feed.appendChild(divRegisteredUnit);
                        divRegisteredUnit.appendChild(divnameUnit);
                        divRegisteredUnit.appendChild(divBtnEditDelete);
                        divnameUnit.appendChild(spanNome);
                        divnameUnit.appendChild(spanEndereco);

                    }


                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function limparCamposUnidade() {
    document.getElementById('nomeUnit').value = ("");
    document.getElementById('cepUnit').value = ("");
    document.getElementById('logradouroUnit').value = ("");
    document.getElementById('cidadeUnit').value = ("");
    document.getElementById('ufUnit').value = ("");
    document.getElementById('bairroUnit').value = ("");
    document.getElementById('numeroUnit').value = ("");
    document.getElementById('telefoneUnit').value = ("");
}

