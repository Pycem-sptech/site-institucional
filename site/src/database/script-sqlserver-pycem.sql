--******************************************ATENÇÃO***********************************************
-- SCRIPT SQL SERVER ( ********NÃO UTILIZAR CREATE DATABASE OU DROP DATABASE********)
--******************************************ATENÇÃO***********************************************

create table empresa(
idEmpresa int primary key identity(100,1),
nome varchar(60) not null,
cnpj varchar(18) not null,
telefone varchar(15) not null unique,
email varchar(100) not null unique,
sigla CHAR(2) not null,
data_cadastro datetime not null default GETDATE()
);

create table alerta(
idAlerta int primary key identity(1,1),
freq_alerta int not null default 5,
cpu_alerta int not null default 50,
cpu_critico int not null default 70,
ram_alerta int not null default 50,
ram_critico int not null default 70,
hd_alerta int not null default 50,
hd_critico int not null default 70,
fkEmpresa int unique, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

create table usuario(
idUsuario int identity(1,1) primary key,
nome varchar(50) not null,
email varchar(100) not null unique,
cpf varchar(14) not null,
senha varchar(80) not null,
cargo varchar(10) not null, constraint chkCargo check (cargo in('Tecnico','Supervisor','Dono')),
fkEmpresa int, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

create table unidade(
idUnidade int primary key identity(1,1),
nome varchar(60) not null,
telefone varchar(15) not null unique,
sigla CHAR(2) not null,
cidade VARCHAR(60) not null,
logradouro VARCHAR(70) not null,
bairro VARCHAR(70) not null, 
numero INT not null unique,
cep CHAR(9) not null,
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
);

create table supervisiona(
fkUsuario int not null, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
fkUnidade int not null, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade),
PRIMARY KEY(fkUsuario,fkEmpresa,fkUnidade)
);

create table totem(
idTotem int primary key identity(1,1),
usuario varchar(20) not null unique,
senha varchar(10) not null,
numeroSerie varchar(30) not null default 'Não Especificado',
processador varchar(80) not null default 'Não Especificado',
ram varchar(30) not null default 'Não Especificado',
tipo_armazenamento varchar(3) not null default 'HD', constraint chkArmazenamento check (tipo_armazenamento in('HD','SSD')),
qtd_armazenamento varchar(30) not null default 'Não Especificado',
ipv6 varchar(40) not null default 'Não Especificado',
mac_address varchar(18) default 'Não Especificado',
estado varchar(10) not null default 'Desligado', constraint chkEstado check (estado in('Disponivel','Manutencao','Desligado')),
fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade) ON DELETE CASCADE
);

create table registro(
idRegistro int primary key identity(1,1),
uso_processador varchar(45),
uso_ram varchar(45),
uso_hd varchar(45),
cpu_status varchar(8) not null,
ram_status varchar(8) not null,
hd_status varchar(8) not null,
data_registro datetime not null default GETDATE(),
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);

create table relatorio(
idRelatorio int primary key identity(1,1),
titulo varchar(50),
descricao varchar(255),
tipo varchar(17) not null default 'Desligamento', constraint chkTipo check (tipo in('Desligamento','Sobrecarga', 'MauFuncionamento', 'Outro')),
data_relatorio date,
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);

create table historico_totem(
idHistorico int primary key identity(1,1),
estadoTotem varchar(10) not null default 'Desligado', constraint chkEstadoTotem check (estadoTotem in('Disponivel','Manutencao','Desligado')),
data_historico datetime not null,
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);

create table chamado(
idChamado int primary key identity(1,1),
titulo CHAR(7) not null default '--',
tipo varchar(17) not null default 'Desligamento', constraint chkTipoChamado check (tipo in('Desligamento','Sobrecarga', 'MauFuncionamento', 'Outro')),
prioridade varchar(10) not null default 'P1', constraint chkPrioridadeChamado check (prioridade in('P1','P2', 'P3','P4','P5')),
estado varchar(15) not null default 'Aberto', constraint chkEstadoChamado check (estado in('Aberto','EmAndamento', 'Encerrado','Cancelado')),
criado_por_nome varchar(50) not null default 'System Administrator',
criado_por_id int, FOREIGN KEY (criado_por_id) REFERENCES usuario(idUsuario),
atribuido_nome varchar(50) not null default 'Nao Atribuido',
atribuido_id int, FOREIGN KEY (atribuido_id) REFERENCES usuario(idUsuario),
data_inicio varchar(30) not null default GETDATE(),
data_fim varchar(30),
descricao varchar(255) not null,
resolucao varchar(255),
usuario_totem varchar(20),
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem),
nome_unidade varchar(60),
fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade),
fkEmpresa int, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

insert into chamado(fkTotem, fkUnidade, fkEmpresa) values 
(1, 1, 100)

-- TRIGGERS
-- Atualizar titulo dos chamados
create trigger CriarTituloChamado
ON chamado
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;
    DECLARE @idChamado INT
	DECLARE @idTotem INT
	DECLARE @idEmpresa INT

	SELECT @idChamado = i.idChamado FROM inserted i
	SELECT @idTotem = i.fkTotem FROM inserted i
	SELECT @idEmpresa = i.fkEmpresa FROM inserted i

UPDATE chamado SET titulo = (SELECT FORMAT((SELECT count(idChamado) from chamado where fkEmpresa = @idEmpresa), CAST((SELECT sigla FROM empresa where idEmpresa = @idEmpresa)+REPLICATE(0, 7) AS NVARCHAR(7)))) where idChamado = @idChamado;

END;

-- Atualizar SLA chamado
-- SE P1 == 2 HORAS
-- SE P2 == 4 HORAS
-- SE P3 == 8 HORAS
-- SE P4 == 16 HORAS
-- SE P5 == 24 HORAS

create trigger AtualizarSla
ON chamado
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;
    DECLARE @idChamado INT
	DECLARE @prioridade VARCHAR(30)
    DECLARE @data_inicio VARCHAR(30)

	SELECT @idChamado = i.idChamado FROM inserted i
	SELECT @prioridade = i.prioridade FROM inserted i
	SELECT @data_inicio = DATEADD(Hour, -3, getdate())

	IF (@prioridade = 'P1')
		BEGIN 
		UPDATE chamado SET data_fim = (SELECT DATEADD(Hour, +2, @data_inicio)) WHERE idChamado = @idChamado
		END
	ELSE IF(@prioridade = 'P2')
		BEGIN 
		UPDATE chamado SET data_fim = (SELECT DATEADD(Hour, +4, @data_inicio)) WHERE idChamado = @idChamado
		END
	ELSE IF(@prioridade = 'P3')
		BEGIN 
		UPDATE chamado SET data_fim = (SELECT DATEADD(Hour, +8, @data_inicio)) WHERE idChamado = @idChamado
		END
	ELSE IF(@prioridade = 'P4')
		BEGIN 
		UPDATE chamado SET data_fim = (SELECT DATEADD(Hour, +16, @data_inicio)) WHERE idChamado = @idChamado
		END
	ELSE IF(@prioridade = 'P5')
		BEGIN 
		UPDATE chamado SET data_fim = (SELECT DATEADD(Hour, +24, @data_inicio)) WHERE idChamado = @idChamado
		END
END;

-- Procedures
-- DesatribuirChamado
CREATE PROCEDURE DesatribuirChamado
@idUsuario INT
AS
BEGIN
    DECLARE @contador INT;
    DECLARE @qtdChamadosAtribuidos INT;
    SET @contador = 0;
    SET @qtdChamadosAtribuidos = (select count(idChamado) from chamado where atribuido_id = @idUsuario)
    WHILE @contador < @qtdChamadosAtribuidos
        BEGIN
			DECLARE @idChamado INT;
			SET @idChamado = (select top 1 idChamado from chamado where atribuido_id = @idUsuario);
			update chamado set atribuido_id = null, atribuido_nome = 'Nao Atribuido' where idChamado = @idChamado;
        END
END

CREATE PROCEDURE DesatribuirTotem
@idTotem INT
AS
BEGIN
    DECLARE @contador INT;
    DECLARE @qtdChamadosAtribuidos INT;
    SET @contador = 0;
    SET @qtdChamadosAtribuidos = (select count(fkTotem) from chamado where fkTotem = @idTotem)
    WHILE @contador < @qtdChamadosAtribuidos
        BEGIN
			DECLARE @idChamado INT;
			SET @idChamado = (select top 1 idChamado from chamado where fkTotem = @idTotem);
			update chamado set atribuido_id = null, atribuido_nome = 'Nao Atribuido' where idChamado = @idChamado;
        END
END

INSERT INTO chamado(prioridade,fkTotem, fkUnidade, fkEmpresa) values
('P2',1, 1, 100);

select top 1 * from chamado order by idChamado desc

insert into [dbo].[relatorio] (titulo, descricao, tipo, data_relatorio, fkTotem) values
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1),
('Houve uma falha','A maquina parou de funcionar apos uma alta demanda','Sobrecarga','04/04/2023',1)
