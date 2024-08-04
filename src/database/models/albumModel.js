const database = require("../dbConfig");
const consulta = "SELECT * FROM album;";

// Obtener todos los álbumes
const getAllAlbum = async () => {
  const { rows } = await database.query(consulta);

  return rows;
};
// Obtener todos los álbumes con paginación

const getAllAlbums = async (limit, offset) => {
  const consulta = "SELECT * FROM album LIMIT $1 OFFSET $2;";
  const { rows } = await database.query(consulta, [limit, offset]);
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
  const { rows } = await database.query(consulta, [
    nombre,
    img,
    id_artista,
    id,
  ]);

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

// Obtener álbumes y canciones por ID de artista
const getAlbumsWithSongsByArtistId = async (artistId) => {
  const consulta = `
  SELECT a.id as album_id, a.nombre as album_nombre, a.img as album_img, 
  c.id as cancion_id, c.titulo_cancion, c.duracion, c.genero_musical, c.url_cancion
    FROM album a
    LEFT JOIN cancion_artista ca ON a.id_artista = ca.id_artista
    LEFT JOIN cancion c ON ca.id_cancion = c.id
    WHERE a.id = $1
  `;
  const { rows } = await database.query(consulta, [artistId]);

  // Reorganiza los resultados en una estructura de datos útil
  const albums = {};
  rows.forEach((row) => {
    if (!albums[row.album_id]) {
      // Si el álbum aún no está en el objeto, lo crea
      albums[row.album_id] = {
        id: row.album_id,
        nombre: row.album_nombre,
        img: row.album_img,
        canciones: [],
      };
    }
    if (row.cancion_id) {
      // Solo agrega canciones si existen (debido al LEFT JOIN)
      albums[row.album_id].canciones.push({
        id: row.cancion_id,
        titulo: row.titulo_cancion,
        duracion: row.duracion,
        genero_musical: row.genero_musical,
        url: row.url_cancion,
      });
    }
  });

  return Object.values(albums); // Devuelve solo los valores del objeto como un array
};

const albumCollection = {
  getAllAlbum,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumsByName,
  getAlbumsWithSongsByArtistId,
  getAllAlbums,
};

module.exports = albumCollection;
