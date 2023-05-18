-- SCRIPT MYSQL 
create database pycem;
use pycem;

    create table empresa(
    idEmpresa int primary key auto_increment,
    nome varchar(60) not null,
    cnpj varchar(18) not null,
    telefone varchar(15) not null unique,
    email varchar(100) not null unique,
    data_cadastro datetime not null default current_timestamp
    )auto_increment = 100;

create table alerta(
idAlerta int primary key auto_increment,
freq_alerta int not null default 5,
cpu_alerta int not null default 50,
cpu_critico int not null default 80,
ram_alerta int not null default 50,
ram_critico int not null default 80,
hd_alerta int not null default 50,
hd_critico int not null default 80,
fkEmpresa int unique, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
)

create table usuario(
idUsuario int auto_increment primary key,
nome varchar(50) not null,
email varchar(100) not null unique,
cpf varchar(14) not null,
senha varchar(80) not null,
cargo varchar(10) not null, constraint chkCargo check (cargo in('Tecnico','Supervisor','Dono')),
fkEmpresa int, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

create table unidade(
idUnidade int primary key auto_increment,
nome varchar(60) not null,
telefone varchar(15) not null unique,
uf CHAR(2) not null,
cidade VARCHAR(60) not null,
logradouro VARCHAR(70) not null,
bairro VARCHAR(70) not null, 
numero INT not null unique,
cep CHAR(9) not null,
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

create table supervisiona(
fkUsuario int not null, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
fkEmpresa int not null, FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
fkUnidade int not null, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade),
PRIMARY KEY(fkUsuario,fkEmpresa,fkUnidade)
);

create table totem(
idTotem int primary key auto_increment,
numeroSerie varchar(30) not null,
processador varchar(30) not null,
freq_processador varchar(10) not null,
ram int not null,
tipo_armazenamento varchar(3) not null,  constraint chkArmazenamento check (tipo_armazenamento in('HD','SSD')),
qtd_armazenamento int not null,
estado varchar(10) not null default 'Desligado', constraint chkEstado check (estado in('Disponivel','Manutencao','Desligado')),
fkUnidade int, FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade) ON DELETE CASCADE
);

create table registro(
idRegistro int primary key auto_increment,
uso_processador varchar(45),
uso_ram varchar(45),
uso_hd varchar(45),
cpu_status varchar(8) not null,
ram_status varchar(8) not null,
hd_status varchar(8) not null,
data_registro datetime not null default current_timestamp,
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);

create table relatorio(
idRelatorio int primary key auto_increment,
titulo varchar(50),
descricao varchar(255),
tipo varchar(12) not null default 'Desligado', constraint chkTipo check (tipo in('Desligamento','Sobrecarga','Outro')),
data_relatorio date,
fkTotem int, FOREIGN KEY (fkTotem) REFERENCES totem(idTotem)
);

insert into [dbo].[relatorio] (titulo, descricao, tipo, data_relatorio, fkTotem) values
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1),
('deu ruim','a maquina parou de funcionar apos um pico de energia','Desligamento',GETDATE(),1)
