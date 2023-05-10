const { IncomingWebhook }  = require('@slack/webhook');

const url = 'https://hooks.slack.com/services/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';

webhook = new IncomingWebhook(url);

(async () => {
await webhook.send({
    text: 'TA DANDO BOMBA NA MAQUINA',
});
})();

