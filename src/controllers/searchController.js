const artisCollection = require("../database/models/artistModel");

const searchArtist = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .send({ error: "Debes proporcionar un término de búsqueda." });
  }

  try {
    const artistas = await artisCollection.getArtistsByName(query); // Note que cambié el nombre a artistas para reflejar que podría haber múltiples resultados

    if (artistas.length > 0) {
      res.status(200).send(artistas);
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
