function listarAlertas(){
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/listarAlertas/${fkEmpresa}`)
      .then(function (resposta) {
        if (resposta.ok) {
          if (resposta.status == 204) {
            console.log("Nenhum resultado encontrado!!");
            cpfExiste = false;
            throw "Nenhum resultado encontrado!!";
          }
          resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            sessionStorage.ATT_FREQ = resposta[0].freq_alerta * 1000;
            sessionStorage.ALERT_CPU = resposta[0].cpu_alerta;
            sessionStorage.ALERT_RAM = resposta[0].ram_alerta;
            sessionStorage.ALERT_HD = resposta[0].hd_alerta;
            sessionStorage.CRIT_CPU = resposta[0].cpu_critico;
            sessionStorage.CRIT_RAM = resposta[0].ram_critico;
            sessionStorage.CRIT_HD = resposta[0].hd_critico;
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