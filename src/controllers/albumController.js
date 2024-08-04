const albumCollection = require("../database/models/albumModel");

const searchAlbum = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .send({ error: "Debes proporcionar un término de búsqueda." });
  }
  try {
    const album = await albumCollection.getAlbumsWithSongsByArtistId(query);
    if (album.length > 0) {
      res.status(200).send(album);
    } else {
      res.status(404).send({ message: "Álbum no encontrado." });
    }
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    res.status(500).send({ error: "Ocurrió un error durante la búsqueda." });
  }
};
//paginacion
const get_pag_album_controller = async (req, res, next) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 0;
  const offset = page * limit;

  try {
    const albums = await albumCollection.getPaginationAlbums(limit, offset);
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los álbumes." });
  }
};

const get_all_album_controller = async (req, res, next) => {
  try {
    const album = await albumCollection.getAllAlbum();

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchAlbum,
  get_pag_album_controller,
  get_all_album_controller,
};
