Faça uma agenda telefônica (em formato de lista);

Na tela de contato deve conter campos de telefone, nome, email e imagem;

DEVE ser possível cadastrar, atualizar, visualizar e apagar contatos da agenda;

A aplicação DEVE ser feita em React, back em Node e Banco dados em SQL.

Backend 
   - [ ] nodejs 
   - [ ] express 
   - [ ] sequelize 
   - [ ] yup 
   - [ ] testes 
   - [ ] aws 
   - [ ] ci/cd
Frontend 
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
