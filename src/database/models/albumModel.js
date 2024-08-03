const database = require("../dbConfig");

// Obtener todos los álbumes
const getAllAlbum = async () => {
  const consulta = "SELECT * FROM album;";
  const { rows } = await database.query(consulta);

  return rows;
};

// Obtener un álbum por ID
const getAlbumById = async (id) => {
  const consulta = "SELECT * FROM album WHERE id = $1;";
  const { rows } = await database.query(consulta, [id]);

  return rows[0];
};

// Crear un nuevo álbum
const createAlbum = async (albumData) => {
  const { nombre, img, id_artista } = albumData;
  const consulta = `
    INSERT INTO album (nombre, img, id_artista)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [nombre, img, id_artista]);

  return rows[0];
};

// Actualizar un álbum existente
const updateAlbum = async (id, albumData) => {
  const { nombre, img, id_artista } = albumData;
  const consulta = `
    UPDATE album
    SET nombre = $1, img = $2, id_artista = $3
    WHERE id = $4
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [nombre, img, id_artista, id]);

  return rows[0];
};

// Eliminar un álbum por ID
const deleteAlbum = async (id) => {
  const consulta = "DELETE FROM album WHERE id = $1 RETURNING *;";
  const { rows } = await database.query(consulta, [id]);

  return rows[0];
};

// Obtener álbumes por nombre
const getAlbumsByName = async (nombre) => {
  const consulta = "SELECT * FROM album WHERE nombre ILIKE $1;";
  const { rows } = await database.query(consulta, [`%${nombre}%`]);

  return rows;
};

const albumCollection = {
  getAllAlbum,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumsByName,
};

module.exports = albumCollection;
