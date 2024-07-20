-- Active: 1717025083066@@127.0.0.1@5432@db_linsijistream
CREATE DATABASE db_linsijistream;

\c DB_LinsijiStream;

CREATE TABLE usuario (
    id SERIAL NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    genero VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE usuario
ADD CONSTRAINT email_valido CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

SELECT * FROM usuario;


CREATE TABLE artista (
    id SERIAL NOT NULL,
    nombre_artista VARCHAR(50) NOT NULL,
    imagen VARCHAR(255),
    verificacion BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
);
SELECT * FROM artista;
CREATE TABLE cancion (
    id SERIAL NOT NULL,
    titulo_cacion VARCHAR(100) NOT NULL,
    nombre_artista VARCHAR(50) NOT NULL,
    reproducciones INTEGER DEFAULT 0,
    duracion INTEGER,
    genero_musical VARCHAR(50),
    PRIMARY KEY (id)
);
SELECT * FROM cancion;