
// const { IncomingWebhook } = require('@slack/webhook');

// const url = 'https://hooks.slack.com/services/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';

// window.webhook = new IncomingWebhook(url);

// (async () => {
// await window.webhook.send({
//     text: 'TA DANDO BOMBA NA MAQUINA',
// });
// })();
const express = require('express')
const app = express()
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
  })
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const url = 'https://hooks.slack.com/services/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';
const data = { text: 'TA DANDO BOMBA NA MAQUINA' };

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(response => {
  console.log('Mensagem enviada com sucesso!');
}).catch(error => {
  console.error('Erro ao enviar mensagem:', error);
});