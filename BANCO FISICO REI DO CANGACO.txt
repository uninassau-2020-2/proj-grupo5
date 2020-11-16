
#CREATE DATABASE reidocangacodb
#DROP DATABASE reidocangacodb
USE reidocangacodb
USE sys

CREATE TABLE EMPREGADOS(
	id_empregado int auto_increment primary key,
    nome_empregado varchar(100) not null,
    cpf char(14) not null,
    sexo char(1) not null,
    data_nascimento char(10) not null,
    telefone char(12) null,
    celular varchar(20) not null,
    email varchar(80) not null,
    endereco varchar(50) not null,
    complemento varchar(50) null,
    bairro varchar(50) not null,
    cep char(10) null, 
    cidade varchar(50) not null,
    estado char(2) not null,
    pais varchar(30) not null,
    status char(1) default "A"
)
ALTER TABLE EMPREGADOS AUTO_INCREMENT = 1000
SELECT * FROM EMPREGADOS

CREATE TABLE USUARIOS (
	id_user int auto_increment primary key,
    username varchar(50) not null, 
    senha varchar(600) not null,
    tipo varchar(30) not null,
    id_empregado int not null,
    status char(1) default "A",
    CONSTRAINT fk_id_empregado FOREIGN KEY (id_empregado) REFERENCES EMPREGADOS(id_empregado)
)
ALTER TABLE USUARIOS AUTO_INCREMENT = 1000
SELECT * FROM USUARIOS

CREATE TABLE FORNECEDORESPF(
	id_fornecedorpf int auto_increment primary key,
    nome varchar(100) not null,
    nickname varchar(40) null,
    cpf char(14) not null,
    sexo char(1) not null,
    data_nascimento char(10) not null,
    telefone char(12) null,
    celular varchar(20) not null,
    email varchar(80) not null,
    endereco varchar(50) not null,
    complemento varchar(50) null,
    bairro varchar(50) not null,
    cep char(10) null, 
    cidade varchar(50) not null,
    estado char(2) not null,
    pais varchar(30) not null,
    status char(1) default "A"
)
ALTER TABLE FORNECEDORESPF AUTO_INCREMENT = 10000
SELECT * FROM FORNECEDORESPF

CREATE TABLE FORNECEDORESPJ(
	id_fornecedorpj int auto_increment primary key,
    razao_social varchar(100) not null,
    nome_fantasia varchar(100) not null,
    nickname varchar(40) null,
    cnpj char(18) not null,
    telefone char(12) null,
    celular varchar(20) not null,
    email varchar(80) not null,
    endereco varchar(50) not null,
    complemento varchar(50) null,
    bairro varchar(50) not null,
    cep char(10) null, 
    cidade varchar(50) not null,
    estado char(2) not null,
    pais varchar(30) not null,
    status char(1) default "A"
)
ALTER TABLE FORNECEDORESPJ AUTO_INCREMENT = 100000
SELECT * FROM FORNECEDORESPJ

CREATE TABLE PRODUTOS(
	id_produto int auto_increment primary key,
    desc_produto varchar(80) not null,
    tipo_volume char(2) not null,
    preco decimal(10,2) not null,
    id_fornecedorpj int null,
    id_fornecedorpf int null,
    status char(1) default "A",
    CONSTRAINT fk_id_fornecedorpj_prod  FOREIGN KEY (id_fornecedorpj) REFERENCES FORNECEDORESPJ(id_fornecedorpj),
    CONSTRAINT fk_id_fornecedorpf_prod  FOREIGN KEY (id_fornecedorpf) REFERENCES FORNECEDORESPF(id_fornecedorpf)
)
SELECT * FROM PRODUTO

CREATE TABLE PEDIDOS(
	id_pedido int auto_increment primary key,
    data_pedido char(10) not null,
    status_pedido varchar(15) not null default 'Aberto',
    id_user int not null,
    CONSTRAINT fk_id_user_pedido FOREIGN KEY (id_user) REFERENCES USUARIOS(id_user)
)
ALTER TABLE PEDIDOS MODIFY COLUMN status_pedido varchar(15) not null default 'Finalizado'

CREATE TABLE PEDIDO_PRODUTOS(
	id_pedido int not null,
    id_produto int not null,
    quantidade_produto int not null,
    valor_registrado decimal(15,2),
    CONSTRAINT fk_id_pedido_pedidoproduto FOREIGN KEY (id_pedido) REFERENCES PEDIDOS(id_pedido),
    CONSTRAINT fk_id_produto_pedidoproduto FOREIGN KEY (id_produto) REFERENCES PRODUTOS(id_produto)
)

CREATE TABLE VENDAS(
	id_venda int auto_increment primary key,
    data_venda char(10) not null,
    id_pedido int not null,
    valor_total_venda decimal(15,2) not null,
    status_venda varchar(15) not null default 'A Receber',
    CONSTRAINT fk_id_pedido_venda FOREIGN KEY (id_pedido) REFERENCES PEDIDOS(id_pedido)
)
