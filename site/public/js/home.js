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
                        var divFeed = document.createElement("div");
                        var divRegisteredUnit = document.createElement("div");
                        var divnameUnit = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var spanEndereco = document.createElement("span");

                        divFeed.className = "feed";
                        divRegisteredUnit.className = "registeredUnit";
                        divnameUnit.className = "nameUnit";
                        spanEndereco.className = "addresOpacity";
                        spanNome.innerHTML = publicacao.nome;
                        spanEndereco.innerHTML = publicacao.logradouro;

                        feed.appendChild(divRegisteredUnit);
                        divRegisteredUnit.appendChild(divnameUnit);
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