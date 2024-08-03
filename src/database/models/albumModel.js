// artistModel.js
const database = require("../dbConfig");

const getAllAlbum = async () => {
  const consulta = "SELECT * FROM album;";
  const { rows } = await database.query(consulta);

  return rows;
};

const albumCollection = {
    getAllAlbum,
};

module.exports = albumCollection;
