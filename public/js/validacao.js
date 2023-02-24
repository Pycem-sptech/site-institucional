
function validarSenha(senhaVar) {
    const senha = {valida: false, 
        dadosSenha: {
            qtdEspeciais: 0,
            qtdMaiusculas: 0,
            qtdNumeros: 0,
    }};
    if (senhaVar.value.length >= 6) {
        let posicao = 0;
        const caracteresEspeciais = '@#$%¨&*(){}`^~:;><.,?/+-=§_';
        const numeros = '0123456789';
        while (posicao < senhaVar.length) {
            console.log(senhaVar[posicao])
            if (caracteresEspeciais.indexOf(senhaVar[posicao]) >= 0) {
                senha.dadosSenha.qtdEspeciais++;
            } else if (numeros.indexOf(senhaVar[posicao]) >= 0) {
                senha.dadosSenha.qtdNumeros++;
            } else if (senhaVar[posicao] == String(senhaVar[posicao]).toLowerCase()) {
                senha.dadosSenha.qtdMinusculas++;
            } else {
                senha.dadosSenha.qtdMaiusculas++;
            }

            if (senha.dadosSenha.qtdEspeciais >= 1 && senha.dadosSenha.qtdMaiusculas >= 1 && senha.dadosSenha.qtdNumeros >= 1) {
                senha.valida = true;
                break;
            }
            posicao++
        }
    return senha;
    }
}

function mostrarSituacaoSenha(senha){
    senha.dadosSenha
}

function validarConfimarSenha(senha, confirmarSenha) {
    return senha == confirmarSenha;
}