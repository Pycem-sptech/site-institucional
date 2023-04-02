process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
var empresaRouter = require("./src/routes/empresa");
var unidadeRouter = require("./src/routes/unidade");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas")
var maquinaRouter = require("./src/routes/maquina");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);

app.use("/usuario", usuarioRouter);
app.use("/empresa", empresaRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter)
app.use("/unidade", unidadeRouter)
app.use("/maquina", maquinaRouter)

app.listen(PORTA, function () {
    if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        console.log(`
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\n
\t\t\t\t\tO servidor PYCEM^2 está online!
\t\t\tAcesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\n
\t\t\t\t\t**** Ambiente de Desenvolvimento ****
\t\t\tVocê está utilizando o banco de dados local(MySQL Workbench).\n
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\n`
        );
    } else {
console.log(`
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\n
|\t\t\t\t\tO servidor PYCEM^2 está online!
|\t\t\tAcesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\n
\t\t\t\t\t**** Ambiente de Produção ****
\t\t\tVocê está utilizando o banco de dados remoto(SQL SERVER).\n
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\n`
);}});
