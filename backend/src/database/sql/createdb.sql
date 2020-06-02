-- CREATE ROLE jhonn WITH LOGIN PASSWORD 'carbono12';
CREATE DATABASE e_coleta_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  second_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE companies (
  company_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  address VARCHAR NOT NULL
);

-- Populating database
INSERT INTO users (first_name, second_name, email, phone, address, password) 
  VALUES ('Jerry', 'Coss', 'jerry@gmail.com', '+558381337200', 'Joao Pessoa - PB', 'senha1'), 
         ('Mary', 'Coss', 'Mary@gmail.com', '+558381335200', 'Joao Pessoa - PB', 'senha1'),
         ('Marco', 'Coss', 'marco@gmail.com', '+558384337200', 'Campina Grande - PB', 'senha4'), 
         ('Josh', 'Coss', 'jerry@gmail.com', '+558383337200', 'Recife - PE', 'senha3'), 
         ('Mathias', 'Coss', 'mathias@gmail.com', '+558382337200', 'Rio de Janeiro - RJ', 'senha2');

INSERT INTO companies (name, email, phone, address) 
  VALUES ('ENLU', 'enlu@contato.com', '+558381337200', 'Joao Pessoa - PB'),
         ('ENLAU', 'enlau@contato.com', '+558381337300', 'Joao Pessoa - RJ'),
         ('NACIONAL', 'nacional@contato.com', '+558441337300', 'Joao Pessoa - RJ');