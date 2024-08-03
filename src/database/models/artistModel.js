// artistModel.js
const database = require("../dbConfig");

const getAllArtists = async () => {
  const consulta = "SELECT * FROM artista;";
  const { rows } = await database.query(consulta);

  return rows;
};

const artisCollection = {
  getAllArtists,
};

module.exports = artisCollection;
