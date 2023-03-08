// b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

// function limparFormulario() {
//   document.getElementById("form_postagem").reset();
// }

// function publicar() {
//   var idUsuario = sessionStorage.ID_USUARIO;

//   var corpo = {
//     titulo: form_postagem.titulo.value,
//     descricao: form_postagem.descricao.value,
//   };

//   fetch(`/avisos/publicar/${idUsuario}`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(corpo),
//   })
//     .then(function (resposta) {
//       console.log("resposta: ", resposta);

//       if (resposta.ok) {
//         window.alert(
//           "Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!"
//         );
//         window.location = "/dashboard/mural.html";
//         limparFormulario();
//    
//       } else if (resposta.status == 404) {
//         window.alert("Deu 404!");
//       } else {
//         throw (
//           "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
//           resposta.status
//         );
//       }
//     })
//     .catch(function (resposta) {
//       console.log(`#ERRO: ${resposta}`);
//  
//     });

//   return false;
// }

// function editar(idAviso) {
//   sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
//   console.log("cliquei em editar - " + idAviso);
//   window.alert(
//     "Você será redirecionado à página de edição do aviso de id número: " +
//       idAviso
//   );
//   window.location = "/dashboard/edicao-aviso.html";
// }

// function deletar(idAviso) {
//   console.log("Criar função de apagar post escolhido - ID" + idAviso);
//   fetch(`/avisos/deletar/${idAviso}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then(function (resposta) {
//       if (resposta.ok) {
//         window.alert(
//           "Post deletado com sucesso pelo usuario de email: " +
//             sessionStorage.getItem("EMAIL_USUARIO") +
//             "!"
//         );
//         window.location = "/dashboard/mural.html";
//       } else if (resposta.status == 404) {
//         window.alert("Deu 404!");
//       } else {
//         throw (
//           "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
//           resposta.status
//         );
//       }
//     })
//     .catch(function (resposta) {
//       console.log(`#ERRO: ${resposta}`);
//     });
// }

function atualizarFeed() {
    //
    fetch("/maquina/listar")
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var feed = document.getElementById("registeredMachine");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado.";
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("registeredMachine");
                    feed.innerHTML = "";
                    for (let i = 0; i < resposta.length; i++) {
                        var publicacao = resposta[i];

                        // criando e manipulando elementos do HTML via JavaScript
                        var divRegisteredMachine = document.createElement("div");
                        var divIdMachine = document.createElement("div");
                        var spanID = document.createElement("span");
                        var spanUnidade = document.createElement("span");
                        var divBtnEditDelete = document.createElement("div");
                        var img1 = document.createElement("img");
                        var img2 = document.createElement("img");

                        spanID.innerHTML = publicacao.numeroSerie;
                        spanUnidade.innerHTML = publicacao.nomeUnidade;

                        divRegisteredMachine.className = "registeredMachine";
                        divIdMachine.className = "idMachine";
                        spanUnidade.className = "addresOpacity";
                        divBtnEditDelete.className = "btnEditDelete";
                        img1.src = "img/Botão Editar.svg";
                        img2.src = "img/Botão Fechar.svg";

                        //     <div class="registeredMachine">
                        //     <div class="idMachine">
                        //         <span>238975192</span>
                        //         <span class="addresOpacity">Unidade Ipiranga</span>
                        //     </div>
                        //     <div class="btnEditDelete">
                        //         <img src="img/Botão Editar.svg" onclick="mostrarModal()">
                        //         <img src="img/Botao Fechar.svg" onclick="deletarRegistroUnidade()">
                        //     </div>
                        // </div>

                        divRegisteredMachine.appendChild(divIdMachine);
                        divRegisteredMachine.appendChild(spanID);
                        divRegisteredMachine.appendChild(spanUnidade);
                        divRegisteredMachine.appendChild(divBtnEditDelete);
                        divIdMachine.appendChild(img1);
                        divIdMachine.appendChild(img2);
                        feed.appendChild(divRegisteredMachine);
                        feed.appendChild(divIdMachine);
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

// function testar() {
//

//   var formulario = new URLSearchParams(
//     new FormData(document.getElementById("form_postagem"))
//   );

//   var divResultado = document.getElementById("div_feed");

//   divResultado.appendChild(
//     document.createTextNode(formulario.get("descricao"))
//   );
//   divResultado.innerHTML = formulario.get("descricao");



//   return false;
// }
