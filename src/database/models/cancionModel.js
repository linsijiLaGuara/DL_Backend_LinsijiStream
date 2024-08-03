const database = require("../dbConfig");

// Obtener todas las canciones
const getAllCancion = async () => {
  const consulta = "SELECT * FROM cancion;";
  const { rows } = await database.query(consulta);

  return rows;
};

// Obtener una canción por ID
const getCancionById = async (id) => {
  const consulta = "SELECT * FROM cancion WHERE id = $1;";
  const { rows } = await database.query(consulta, [id]);

  return rows[0];
};

// Crear una nueva canción
const createCancion = async (cancionData) => {
  const { titulo_cancion, reproducciones, duracion, genero_musical, url_cancion } = cancionData;
  const consulta = `
    INSERT INTO cancion (titulo_cancion, reproducciones, duracion, genero_musical, url_cancion)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [titulo_cancion, reproducciones, duracion, genero_musical, url_cancion]);

  return rows[0];
};

// Actualizar una canción existente
const updateCancion = async (id, cancionData) => {
  const { titulo_cancion, reproducciones, duracion, genero_musical, url_cancion } = cancionData;
  const consulta = `
    UPDATE cancion
    SET titulo_cancion = $1, reproducciones = $2, duracion = $3, genero_musical = $4, url_cancion = $5
    WHERE id = $6
    RETURNING *;
  `;
  const { rows } = await database.query(consulta, [titulo_cancion, reproducciones, duracion, genero_musical, url_cancion, id]);

  return rows[0];
};

// Eliminar una canción por ID
const deleteCancion = async (id) => {
  const consulta = "DELETE FROM cancion WHERE id = $1 RETURNING *;";
  const { rows } = await database.query(consulta, [id]);

  return rows[0];
};

const cancionCollection = {
  getAllCancion,
  getCancionById,
  createCancion,
  updateCancion,
  deleteCancion,
};

module.exports = cancionCollection;
