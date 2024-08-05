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
    titulo_cancion VARCHAR(100) NOT NULL,
    reproducciones INTEGER DEFAULT 0,
    duracion VARCHAR(10),
    genero_musical VARCHAR(50),
    url_cancion VARCHAR(200),
    PRIMARY KEY (id)
);

SELECT * FROM cancion;

CREATE TABLE album (
    id SERIAL NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    img VARCHAR(500) NOT NULL,
    id_artista integer,
    PRIMARY KEY (id)
);

SELECT * FROM album;

CREATE TABLE cancion_artista (
    id SERIAL NOT NULL,
    artista_principal VARCHAR(50) NOT NULL,
    id_cancion integer NOT NULL,
    id_artista integer NOT NULL,
    FOREIGN KEY (id_cancion) REFERENCES cancion (id),
    FOREIGN KEY (id_artista) REFERENCES artista (id)
);

alter table cancion
add column id_album integer
ALTER TABLE cancion
ADD CONSTRAINT fk_cancion_album FOREIGN KEY (id_album) REFERENCES album (id)

