create database pycem;
-- drop database pycem;
use pycem;

create table empresa(
idEmpresa int primary key auto_increment,
nome_fantasia varchar(60) not null,
cnpj varchar(15) not null,
telefone varchar(13) not null,
data_cadastro datetime not null default current_timestamp
);

create table usuario(
idUsuario int auto_increment,
nome varchar(50) not null,
email varchar(100) not null unique,
senha varchar(45) not null,
cpf varchar(45) not null,
cargo varchar(10) not null, constraint chkCargo check (cargo in('Tecnico','Supervisor')),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
primary key(idUsuario, fkEmpresa)
);

create table endereco(
idEndereco int primary key auto_increment,
sigla CHAR(2) not null,
cidade VARCHAR(60) not null,
logradouro VARCHAR(70) not null,
bairro VARCHAR(70) not null, 
numero INT not null,
cep CHAR(9) not null,
complemento VARCHAR(80)
);

create table unidade(
idUnidade int auto_increment,
nome varchar(45) not null,
telefone varchar(13) not null,
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
fkEndereco int not null unique, FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
primary key(idUnidade, fkEmpresa)
);

create table supervisiona(
fkUsuario int not null, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
fkUnidade int not null, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade),
PRIMARY KEY(fkUsuario,fkEmpresa,fkUnidade)
);

create table totem(
idTotem int primary key auto_increment,
processador varchar(45) not null,
ram varchar(45) not null,
hd varchar(45) not null,
estado varchar(10) not null, constraint chkEstado check (estado in('Disponivel','Manutencao','Desligado')),
fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
);

create table registro(
idRegistro int primary key auto_increment,
uso_processador varchar(45),
uso_ram varchar(45),
uso_hd varchar(45),
data_registro datetime not null default current_timestamp,
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);
