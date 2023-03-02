function cadastrarEmp() {

    const nomeVar = idNome.value;
    const emailVar = idEmail.value;
    const telefoneVar = idTelefoneEmpresa.value;
    const cnpjVar = idCnpj.value;
    if (nomeVar == "") {
        return false;
    }
        fetch("/empresa/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                telefoneServer: telefoneVar,
                cnpjServer: cnpjVar,
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                setTimeout(() => {
                    window.location = "#";
                }, "1000")

            } 
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;
    }

function cadastrarUni(){
    const nomeVar = nomeUnit.value;
    const telefoneVar = telefoneUnit.value;
    const cepVar = cepUnit.value;
    const fkEmpresaVar = 1;//sessionStorage.fkEmpresa;
    const ufVar = ufUnit.value;
    const cidadeVar = cidadeUnit.value;
    const logradouroVar = logradouroUnit.value;
    const bairroVar = bairroUnit.value;
    const numeroVar = numeroUnit.value;
    const complementoVar = "";

    if (nomeVar == "") {
        
        return false;
    }
        fetch("/unidade/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                telefoneServer: telefoneVar,
                cepServer: cepVar,
                fkEmpresaServer: fkEmpresaVar,
                ufServer: ufVar,
                cidadeServer: cidadeVar,
                logradouroServer: logradouroVar,
                bairroServer: bairroVar,
                numeroServer: numeroVar,
                complementoServer: complementoVar,
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                setTimeout(() => {
                    window.location = "#";
                }, "1000")

            } 
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;

}


function cadastrarMaquina(){
    const nomeVar = idNome.value;
    const telefoneVar = idTelefoneEmpresa.value;
    const cepVar = idCep.value;
    const fkEmpresaVar = sessionStorage.fkEmpresa;
    const ufVar = idUf.value;
    const cidadeVar = idCidade.value;
    const logradouroVar = idLogradouro.value;
    const bairroVar = idBairro.value;
    const numeroVar = idNumero.value;
    const complementoVar = idComplemento.value;

    if (nomeVar == "") {
        
        return false;
    }
        fetch("/empresa/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                telefoneServer: telefoneVar,
                cepServer: cepVar,
                fkEmpresaServer: fkEmpresaVar,
                ufServer: ufVar,
                cidadeServer: cidadeVar,
                logradouroServer: logradouroVar,
                bairroServer: bairroVar,
                numeroServer: numeroVar,
                complementoServer: complementoVar,
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                setTimeout(() => {
                    window.location = "#";
                }, "1000")

            } 
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;

}


function verificarUni() {
    const idUsuario = sessionStorage.ID_USUARIO;
    

    fetch("/usuarios/verificarQtd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,

        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.QTD = json.quantidade;

            });

        } 
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function verificarEnd() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch("/usuarios/verificarQtd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,

        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.QTD = json.quantidade;

            });

        } 
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
