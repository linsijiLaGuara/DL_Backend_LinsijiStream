const albumCollection = require("../database/models/albumModel");
const artistCollection = require("../database/models/artistModel");

const getAlbumsByArtistName = async (req, res) => {
  const { name } = req.query;
  try {
    const artists = await artistCollection.getArtistsByName(name);
    console.log("Artists found:", artists);

    // Verificar si se encontraron artistas
    if (artists.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }

    // Opcional: elegir el primer artista encontrado si hay múltiples
    const artist = artists[0];

    // Asumiendo que tienes una función que obtiene álbumes por ID de artista
    const albums = await albumCollection.getAlbumsWithSongsByArtistId(
      artist.id
    );
    res.status(200).json(albums);
  } catch (error) {
    console.error("Error fetching albums by artist name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAlbumsByArtistName,
};
