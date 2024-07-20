const database = require("../dbConfig");

const getArtista = async (nombre_artista) => {
  const consulta = "SELECT * FROM artista WHERE nombre_artista = $1;";
  const values = [nombre_artista];

  const { rows } = await database.query(consulta, values);

  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

const artisCollection = {
  getArtista,
};

module.exports = artisCollection;  