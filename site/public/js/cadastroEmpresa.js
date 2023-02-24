function cadastrar() {

    const nomeVar = idNome.value;
    const emailVar = idEmail.value;
    const telefoneVar = idTelefone.value;
    const cnpjVar = idCnpj.value;
    if (nomeVar == "") {
        div_erros.innerHTML = "Campo nome inválido";
        return false;
    }
        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
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
                // cardErro.style.display = "block";

                // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "inOrUp.html";
                }, "1000")

            } else {
                div_erros.innerHTML = "Houve um erro ao tentar realizar o cadastro! Tente novamente.";
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;
    }
