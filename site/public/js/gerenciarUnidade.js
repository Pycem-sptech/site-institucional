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

    if (
        nomeVar == "" ||
        telefoneVar == "" ||
        cepVar == "" ||
        cepVar == "" ||
        ufVar == "" ||
        cidadeVar == "" ||
        logradouroVar == "" ||
        bairroVar == "" ||
        numeroVar == ""
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
