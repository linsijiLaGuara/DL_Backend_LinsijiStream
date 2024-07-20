const artisCollection = require("../database/models/artistModel");

const searchArtist = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .send({ error: "Debes proporcionar un término de búsqueda." });
  }

  try {
    const artista = await artisCollection.getArtista(query);

    if (artista) {
      res.status(200).send(artista);
    } else {
      res.status(404).send({ message: "Artista no encontrado." });
    }
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    res.status(500).send({ error: "Ocurrió un error durante la búsqueda." });
  }
};

module.exports = {
  searchArtist,
};
