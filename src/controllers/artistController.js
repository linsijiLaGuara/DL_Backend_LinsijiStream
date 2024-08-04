// artistController.js
const artisCollection = require("../database/models/artistModel");
const albumCollection = require("../database/models/albumModel");

const get_all_artists_controller = async (req, res, next) => {
  try {
    const artists = await artisCollection.getAllArtists();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
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

const get_pag_album_controller = async (req, res, next) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 0; // Usa `req.query.page` y maneja el caso en que no se proporcione `page`
  const offset = page * limit;

  try {
    const albums = await albumCollection.getAllAlbums(limit, offset);
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los álbumes." });
  }
};


module.exports = {
  get_all_artists_controller,
  get_all_album_controller,
  get_pag_album_controller,
};
