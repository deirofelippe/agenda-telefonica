Faça uma agenda telefônica (em formato de lista);

Na tela de contato deve conter campos de telefone, nome, email e imagem;

DEVE ser possível cadastrar, atualizar, visualizar e apagar contatos da agenda;

A aplicação DEVE ser feita em React, back em Node e Banco dados em SQL.

Backend 
   - [x] nodejs 
   - [x] express 
   - [x] sequelize 
   - [ ] yup 
   - [x] testes 
   - [ ] upload da imagem
   - [ ] aws 
   - [ ] ci/cd
Frontend 
   - [x] html e css
   - [ ] react 
   - [ ] unform 
   - [ ] hooks 
   - [ ] testes 
   - [ ] responsivo
Banco 
   - [ ] MySQL

CRUD

CREATE TABLE Contato (
   id UUID not null primary key,
   telefone VARCHAR(10) not null unique,
   nome VARCHAR(100) not null,
   email VARCHAR(100) not null,
   imagem VARCHAR(100)
)
