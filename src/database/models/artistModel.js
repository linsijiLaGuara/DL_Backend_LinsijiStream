const database = require("../dbConfig");

// Obtener todos los artistas
const getAllArtists = async () => {
  const consulta = "SELECT * FROM artista;";
  const { rows } = await database.query(consulta);

  return rows;
};
//paginacion de entrega de artista
const getPaginationArtist = async (limit, offset) => {
  const consulta = "SELECT * FROM artista LIMIT $1 OFFSET $2;";
  const { rows } = await database.query(consulta, [limit, offset]);
  return rows;
};

// Obtener un artista por ID
const getArtistById = async (id) => {
  const consulta = "SELECT * FROM artista WHERE id = $1;";
  const { rows } = await database.query(consulta, [id]);

  return rows[0];
};

// Crear un nuevo artista
const createArtist = async (artistData) => {
  const { nombre_artista, imagen, verificacion } = artistData;
  const consulta = `
    INSERT INTO artista (nombre_artista, imagen, verificacion)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [
    nombre_artista,
    imagen,
    verificacion,
  ]);

  return rows[0];
};

// Actualizar un artista existente
const updateArtist = async (id, artistData) => {
  const { nombre_artista, imagen, verificacion } = artistData;
  const consulta = `
    UPDATE artista
    SET nombre_artista = $1, imagen = $2, verificacion = $3
    WHERE id = $4
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [
    nombre_artista,
    imagen,
    verificacion,
    id,
  ]);

  return rows[0];
};

// Eliminar un artista por ID
const deleteArtist = async (id) => {
  const consulta = "DELETE FROM artista WHERE id = $1 RETURNING *;";
  const { rows } = await database.query(consulta, [id]);

  return rows[0];
};

// Obtener canciones de un artista por ID de artista
const getSongsByArtistId = async (id_artista) => {
  const consulta = `
    SELECT c.*
    FROM cancion c
    JOIN cancion_artista ca ON c.id = ca.id_cancion
    WHERE ca.id_artista = $1;
  `;
  const { rows } = await database.query(consulta, [id_artista]);

  return rows;
};

// Obtener álbumes de un artista por ID de artista
const getAlbumsByArtistId = async (id_artista) => {
  const consulta = `
    SELECT a.*
    FROM album a
    WHERE a.id_artista = $1;
  `;
  const { rows } = await database.query(consulta, [id_artista]);

  return rows;
};

// Vincular una canción a un artista
const linkSongToArtist = async (linkData) => {
  const { artista_principal, id_cancion, id_artista } = linkData;
  const consulta = `
    INSERT INTO cancion_artista (artista_principal, id_cancion, id_artista)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [
    artista_principal,
    id_cancion,
    id_artista,
  ]);

  return rows[0];
};

// Obtener artistas por nombre similar, insensible a mayúsculas/minúsculas
const getArtistsByName = async (name) => {
  if (name.length < 2) {
    return [];
  }
  const consulta =
    "SELECT * FROM artista WHERE LOWER(nombre_artista) LIKE LOWER($1);";
  const namePattern = `%${name}%`; // Agrega '%' antes y después para búsqueda parcial
  const { rows } = await database.query(consulta, [namePattern]);
  return rows;
};

const artistCollection = {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  getSongsByArtistId,
  getAlbumsByArtistId,
  linkSongToArtist,
  getArtistsByName,
  getPaginationArtist,
};

module.exports = artistCollection;
