function validarSenha(senhaVar) {
    const senha = {valida: false, 
        dadosSenha: {
            qtdEspeciais: 0,
            qtdMaiusculas: 0,
            qtdNumeros: 0,
            qtdDigitos: senhaVar.value.length,
    }};
    
    let posicao = 0;
    const caracteresEspeciais = '@#$%¨&*(){}`^~:;><.,?/+-=§_';
    const numeros = '0123456789';
    while (posicao < senhaVar.value.length) {
            console.log(senhaVar.value[posicao])
            if (caracteresEspeciais.indexOf(senhaVar.value[posicao]) >= 0) {
                senha.dadosSenha.qtdEspeciais++;
            } else if (numeros.indexOf(senhaVar.value[posicao]) >= 0) {
                senha.dadosSenha.qtdNumeros++;
            } else if (senhaVar.value[posicao] == senhaVar.value[posicao].toUpperCase()){
                senha.dadosSenha.qtdMaiusculas++;
            }          
            posicao++
     
    }

    if (senha.dadosSenha.qtdDigitos >= 6 && senha.dadosSenha.qtdEspeciais >= 1 && senha.dadosSenha.qtdMaiusculas >= 1 && senha.dadosSenha.qtdNumeros >= 1) {
        senha.valida = true;
    }
    return senha;
}

function mostrarSituacaoSenha(senhaJ){
    if (senhaJ.dadosSenha.qtdDigitos >= 6){
        digito.innerHTML = `<img src="img/certo.svg"> 6 dígitos`
    }else {
        digito.innerHTML = `<img src="img/errado.svg"> 6 dígitos`
    }

    if (senhaJ.dadosSenha.qtdMaiusculas >= 1){
        maiuscula.innerHTML = `<img src="img/certo.svg"> Letra maiúculas`
    }else {
        maiuscula.innerHTML = `<img src="img/errado.svg"> Letra maiúculas`
    }

    if (senhaJ.dadosSenha.qtdEspeciais >= 1){
        caracterEspecial.innerHTML = `<img src="img/certo.svg"> Carac. Especial`
    }else {
        caracterEspecial.innerHTML = `<img src="img/errado.svg"> Carac. Especial`
    }

    if (senhaJ.dadosSenha.qtdNumeros >= 1){
        numeros.innerHTML = `<img src="img/certo.svg"> Números`
    }else {
        numeros.innerHTML = `<img src="img/errado.svg"> Números`
    }
}

