-- create database pycem;
-- -- drop database pycem;
-- use pycem;

-- create table empresa(
-- idEmpresa int primary key auto_increment,
-- nome varchar(60) not null,
-- cnpj varchar(18) not null,
-- telefone varchar(15) not null,
-- email varchar(100) not null unique,
-- data_cadastro datetime not null default current_timestamp
-- )auto_increment = 100;

-- create table usuario(
-- idUsuario int auto_increment primary key,
-- nome varchar(50) not null,
-- email varchar(100) not null unique,
-- cpf varchar(45) not null,
-- senha varchar(64) not null,
-- cargo varchar(10) not null, constraint chkCargo check (cargo in('Tecnico','Supervisor','Dono')),
-- fkEmpresa int, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
-- );

-- select * from usuario;
-- -- create table endereco(
-- -- idEndereco int primary key auto_increment,
-- -- sigla CHAR(2) not null,
-- -- cidade VARCHAR(60) not null,
-- -- logradouro VARCHAR(70) not null,
-- -- bairro VARCHAR(70) not null, 
-- -- numero INT not null,
-- -- cep CHAR(9) not null,
-- -- complemento VARCHAR(80)
-- -- );

-- create table unidade(
-- idUnidade int auto_increment,
-- nome varchar(45) not null,
-- telefone varchar(15) not null unique,
-- sigla CHAR(2) not null,
-- cidade VARCHAR(60) not null,
-- logradouro VARCHAR(70) not null,
-- bairro VARCHAR(70) not null, 
-- numero INT not null unique,
-- cep CHAR(9) not null,
-- complemento VARCHAR(80),
-- fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
-- primary key(idUnidade, fkEmpresa)
-- );

-- create table supervisiona(
-- fkUsuario int not null, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
-- fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
-- fkUnidade int not null, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade),
-- PRIMARY KEY(fkUsuario,fkEmpresa,fkUnidade)
-- );

-- create table totem(
-- idTotem int primary key auto_increment,
-- numeroSerie varchar(45) not null,
-- processador varchar(45) not null,
-- ram varchar(45) not null,
-- armazenamento varchar(45) not null,  constraint chkArmazenamento check (armazenamento in('HD','SSD')),
-- qtdArmazenamento varchar(45) not null,
-- estado varchar(10) not null default 'Desligado', constraint chkEstado check (estado in('Disponivel','Manutencao','Desligado')),
-- fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
-- );


-- create table registro(
-- idRegistro int primary key auto_increment,
-- uso_processador varchar(45),
-- uso_ram varchar(45),
-- uso_hd varchar(45),
-- data_registro datetime not null default current_timestamp,
-- fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
-- );
-- select * from usuario;
-- -- select unidade.nome, totem.numeroSerie from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade;
-- -- select * from usuario where fkEmpresa = 100 AND cargo = 'Tecnico' OR cargo = 'Supervisor';
-- -- select nome, cargo, idUsuario from usuario where fkEmpresa = 102 AND (cargo = 'Tecnico' OR cargo = 'Supervisor');
-- -- select * from unidade;
-- -- select * from totem;
-- -- select unidade.nome as nomeUnidade, totem.numeroSerie as numeroSerie, totem.idTotem from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade where unidade.fkEmpresa = 102; 
-- -- SELECT * FROM usuario WHERE email = 'matheus' AND senha = (select sha2('M@theus', 256));
-- -- select sha2('matheus',256);
-- -- SELECT nome, logradouro, idUnidade FROM unidade where fkEmpresa = 102;



-- create database pycem;
-- -- drop database pycem;
-- use pycem;

-- create table empresa(
-- idEmpresa int primary key auto_increment,
-- nome varchar(60) not null,
-- cnpj varchar(18) not null,
-- telefone varchar(15) not null,
-- email varchar(100) not null unique,
-- data_cadastro datetime not null default current_timestamp
-- )auto_increment = 100;

-- create table usuario(
-- idUsuario int auto_increment primary key,
-- nome varchar(50) not null,
-- email varchar(100) not null unique,
-- cpf varchar(45) not null,
-- senha varchar(80) not null,
-- cargo varchar(10) not null, constraint chkCargo check (cargo in('Tecnico','Supervisor','Dono')),
-- fkEmpresa int, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
-- );

-- select * from usuario;
-- create table endereco(
-- idEndereco int primary key auto_increment,
-- sigla CHAR(2) not null,
-- cidade VARCHAR(60) not null,
-- logradouro VARCHAR(70) not null,
-- bairro VARCHAR(70) not null, 
-- numero INT not null,
-- cep CHAR(9) not null,
-- complemento VARCHAR(80)
-- );

create table unidade(
idUnidade int auto_increment,
nome varchar(45) not null,
telefone varchar(15) not null unique,
sigla CHAR(2) not null,
cidade VARCHAR(60) not null,
logradouro VARCHAR(70) not null,
bairro VARCHAR(70) not null, 
numero INT not null unique,
cep CHAR(9) not null,
complemento VARCHAR(80),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
primary key(idUnidade, fkEmpresa)
);


select * from usuario;
select * from unidade;

create table supervisiona(
fkUsuario int not null, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
fkUnidade int not null, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade),
PRIMARY KEY(fkUsuario,fkEmpresa,fkUnidade)
);

create table totem(
idTotem int primary key auto_increment,
numeroSerie varchar(45) not null,
processador varchar(45) not null,
ram varchar(45) not null,
armazenamento varchar(45) not null,  constraint chkArmazenamento check (armazenamento in('HD','SSD')),
qtdArmazenamento varchar(45) not null,
estado varchar(10) not null default 'Desligado', constraint chkEstado check (estado in('Disponivel','Manutencao','Desligado')),
fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade) ON DELETE CASCADE
);

select unidade.nome, totem.numeroSerie from totem totem join unidade unidade on unidade.idUnidade = totem.fkUnidade;
 
create table registro(
idRegistro int primary key auto_increment,
uso_processador varchar(45),
uso_ram varchar(45),
uso_hd varchar(45),
data_registro datetime not null default current_timestamp,
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);

select * from unidade;


select * from totem;

UPDATE usuario SET nome = 'Pedro', cargo = 'Supervisor', email = 'p@p', cpf = '21332', senha = sha2('123@AA', 256)
    WHERE idUsuario = 2;


-- DELETE u FROM unidade u right JOIN totem on u.idUnidade = totem.FkUnidade where u.idUnidade = 1;

-- select * from unidade LEFT JOIN totem on unidade.idUnidade = totem.FkUnidade ;



// SCRIPT SQL SERVER ( ********NÃO UTILIZAR CREATE DATABASE OU DROP DATABASE********)
create table empresa(
idEmpresa int primary key identity(100,1),
nome varchar(60) not null,
cnpj varchar(18) not null,
telefone varchar(15) not null,
email varchar(100) not null unique,
data_cadastro datetime not null default current_timestamp
);

create table usuario(
idUsuario int identity(1,1) primary key,
nome varchar(50) not null,
email varchar(100) not null unique,
cpf varchar(45) not null,
senha varchar(80) not null,
cargo varchar(10) not null, constraint chkCargo check (cargo in('Tecnico','Supervisor','Dono')),
fkEmpresa int, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

create table unidade(
idUnidade int primary key identity(1,1),
nome varchar(45) not null,
telefone varchar(15) not null unique,
sigla CHAR(2) not null,
cidade VARCHAR(60) not null,
logradouro VARCHAR(70) not null,
bairro VARCHAR(70) not null, 
numero INT not null unique,
cep CHAR(9) not null,
complemento VARCHAR(80),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
);

create table totem(
idTotem int primary key identity(1,1),
numeroSerie varchar(45) not null,
processador varchar(45) not null,
ram varchar(45) not null,
armazenamento varchar(45) not null,  constraint chkArmazenamento check (armazenamento in('HD','SSD')),
qtdArmazenamento varchar(45) not null,
estado varchar(10) not null default 'Desligado', constraint chkEstado check (estado in('Disponivel','Manutencao','Desligado')),
fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade) ON DELETE CASCADE
);