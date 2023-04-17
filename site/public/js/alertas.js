function mostrarAlertasNaTela() {
  document.getElementById('freq_alerta').value = (sessionStorage.ATT_FREQ / 1000);
  document.getElementById('cpu_alerta').value = (sessionStorage.ALERT_CPU);
  document.getElementById('ram_alerta').value = (sessionStorage.ALERT_RAM);
  document.getElementById('hd_alerta').value = (sessionStorage.ALERT_HD);
  document.getElementById('cpu_critico').value = (sessionStorage.CRIT_CPU);
  document.getElementById('ram_critico').value = (sessionStorage.CRIT_RAM);
  document.getElementById('hd_critico').value = (sessionStorage.CRIT_HD);
}

function listarAlertas() {
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

function editarFrequenciaAtualizacao(freqDigitada) {
  let frequenciaAntiga = sessionStorage.ATT_FREQ;
  let freqValida = validarNovaFrequencia(freqDigitada, frequenciaAntiga);
  if (freqValida) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarFrequenciaAtualizacao/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novaFrequenciaServer: freqDigitada,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Frequência atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function editarProcessadorAlerta(novoAlerta, alertaCritico) {
  let alertaAntigo = sessionStorage.ALERT_CPU;
  let alertaValido = validarNovoAlerta(novoAlerta, alertaCritico, alertaAntigo);
  if (alertaValido) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarProcessadorAlerta/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoAlertaServer: novoAlerta,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Alerta do processador atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function editarProcessadorAlertaCritico(alerta, novoAlertaCritico) {
  let alertaAntigo = sessionStorage.CRIT_CPU;
  let alertaValido = validarNovoAlertaCritico(alerta, novoAlertaCritico, alertaAntigo);
  if (alertaValido) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarProcessadorAlertaCritico/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoAlertaServer: novoAlertaCritico,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Alerta crítico do processador atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}
function editarRamAlerta(novoAlerta, alertaCritico) {
  let alertaAntigo = sessionStorage.ALERT_RAM;
  let alertaValido = validarNovoAlerta(novoAlerta, alertaCritico, alertaAntigo);
  if (alertaValido) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarRamAlerta/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoAlertaServer: novoAlerta,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Alerta da memória ram atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }

}

function editarRamAlertaCritico(alerta, novoAlertaCritico) {
  let alertaAntigo = sessionStorage.CRIT_RAM;
  let alertaValido = validarNovoAlertaCritico(alerta, novoAlertaCritico, alertaAntigo);
  if (alertaValido) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarRamAlertaCritico/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoAlertaServer: novoAlertaCritico,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Alerta crítico da memória ram atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}
function editarHdAlerta(novoAlerta, alertaCritico) {
  let alertaAntigo = sessionStorage.ALERT_HD;
  let alertaValido = validarNovoAlerta(novoAlerta, alertaCritico, alertaAntigo);
  if (alertaValido) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarHdAlerta/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoAlertaServer: novoAlerta,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Alerta da memória de massa atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function editarHdAlertaCritico(alerta, novoAlertaCritico) {
  let alertaAntigo = sessionStorage.CRIT_HD;
  let alertaValido = validarNovoAlertaCritico(alerta, novoAlertaCritico, alertaAntigo);
  if (alertaValido) {
    const fkEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/alerta/editarHdAlertaCritico/${fkEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoAlertaServer: novoAlertaCritico,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          toastPadrao('success', 'Alerta crítico da memória de massa atualizada com sucesso!');
          listarAlertas()
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function validarNovaFrequencia(novaFrequencia, frequenciaAntiga) {

  if (novaFrequencia == "" || novaFrequencia == null || novaFrequencia == undefined) {
    return false;
  } else if (novaFrequencia < 1 && novaFrequencia != frequenciaAntiga) {
    return false;
  } else if (novaFrequencia >= 1) {
    return true;
  } else {
    return false;
  }
}

function validarNovoAlerta(novoAlerta, alertaCritico, alertaAntigo) {
  console.log(novoAlerta);
  console.log(alertaCritico);
  console.log(alertaAntigo);

  if (novoAlerta == "" || novoAlerta == null || novoAlerta == undefined) {
    return false;
  } else if (novoAlerta < 1 || novoAlerta >= alertaCritico) {
    return false;
  } else if (novoAlerta >= 1 && novoAlerta < alertaCritico && novoAlerta != alertaAntigo) {
    return true;
  } else {
    return false;
  }
}

function validarNovoAlertaCritico(alerta, novoAlertaCritico, alertaAntigo) {
  if (novoAlertaCritico == "" || novoAlertaCritico == null || novoAlertaCritico == undefined) {
    return false;
  } else if (novoAlertaCritico < 1) {
    return false;
  } else if (novoAlertaCritico > alerta && novoAlertaCritico != alertaAntigo) {
    return true;
  } else {
    return false;
  }
}