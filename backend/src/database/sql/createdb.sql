-- CREATE ROLE jhonn WITH LOGIN PASSWORD 'carbono12';
--\i /Users/jhonnatha_am/Development/portfolio/projects/e-coleta/backend/src/database/sql/createdb.sql
CREATE DATABASE e_coleta_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS points_items;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS items;

CREATE TABLE points (
  point_id    serial PRIMARY KEY
, name        VARCHAR NOT NULL
, email       VARCHAR NOT NULL
, whatsapp    VARCHAR NOT NULL
, latitude    NUMERIC NOT NULL DEFAULT 0
, longitude   NUMERIC NOT NULL DEFAULT 0
, city        VARCHAR NOT NULL
, uf          VARCHAR(2) NOT NULL
);

CREATE TABLE items (
  item_id     serial PRIMARY KEY
, image       VARCHAR NOT NULL
, title       VARCHAR NOT NULL
);

CREATE TABLE points_items (
  point_id    int REFERENCES points (point_id) ON UPDATE CASCADE ON DELETE CASCADE
, item_id     int REFERENCES items (item_id) ON UPDATE CASCADE ON DELETE CASCADE
, CONSTRAINT points_items_pkey PRIMARY KEY (point_id, item_id)
);

INSERT INTO points (name, email, whatsapp, city, uf) 
  VALUES  ('Ponto1', 'ponto1@gmail.com', '+55839114532', 'Joao Pessoa', 'PB')
        , ('Ponto3', 'ponto1@gmail.com', '+55839114532', 'Joao Pessoa', 'PB')
        , ('Ponto2', 'ponto1@gmail.com', '+55839114532', 'Joao Pessoa', 'PB');

INSERT INTO items (title, image) 
  VALUES  ('Lâmpadas', 'lampadas.svg')
        , ('Pilhas e Baterias', 'baterias.svg')
        , ('Papéis e Papelão', 'papeis-papelao.svg')
        , ('Resíduos Eletrônicos', 'eletronicos.svg')
        , ('Resíduos Orgânicos', 'organicos.svg')
        , ('Óleo de Cozinha', 'oleo.svg');

-- Ponto 1 coleta os itens 1 e 2
INSERT INTO points_items (point_id, item_id)
  VALUES  (1, 1)
        , (1, 2);
