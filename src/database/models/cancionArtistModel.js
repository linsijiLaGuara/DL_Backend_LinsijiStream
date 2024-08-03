// artistModel.js
const database = require("../dbConfig");

const getAllCancionArtista = async () => {
  const consulta = "SELECT * FROM cancion_artista;";
  const { rows } = await database.query(consulta);

  return rows;
};

const cancionArtistaCollection = {
  getAllCancionArtista,
};

module.exports = cancionArtistaCollection;
