-- Active: 1717025083066@@127.0.0.1@5432@db_linsijistream
CREATE DATABASE DB_LinsijiStream;

\c DB_LinsijiStream;

CREATE TABLE usuario (
  id        SERIAL        NOT NULL,
  email     VARCHAR(50)   NOT NULL  UNIQUE,
  password  VARCHAR(60)   NOT NULL,
  nombre    VARCHAR(25)   NOT NULL,
  imagen    VARCHAR(255)  NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE usuario
ADD CONSTRAINT email_valido CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE usuario ADD COLUMN genero VARCHAR(10) NOT NULL;


    SELECT * FROM usuario;