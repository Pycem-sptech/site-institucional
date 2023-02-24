function cadastrar() {

    const nomeVar = idNome.value;
    const emailVar = idEmail.value;
    const telefoneVar = idTelefoneEmpresa.value;
    const cnpjVar = idCnpj.value;
    if (nomeVar == "") {
        // div_erros.innerHTML = "Campo nome inválido";
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
