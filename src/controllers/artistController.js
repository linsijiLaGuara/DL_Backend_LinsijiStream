const artisCollection = require("../database/models/artistModel");

const get_all_artists_controller = async (req, res, next) => {
  try {
    const artists = await artisCollection.getAllArtists();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

//paginacion
const get_pag_artist_controller = async (req, res, next) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 0;
  const offset = page * limit;

  try {
    const artists = await artisCollection.getPaginationArtist(limit, offset);
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los artistas." });
  }
};

module.exports = {
  get_all_artists_controller,
  get_pag_artist_controller,
};
