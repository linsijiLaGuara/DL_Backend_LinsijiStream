const albumCollection = require('../database/models/albumModel');

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
    }
    catch (error) {
        console.error("Error en la búsqueda:", error);
        res.status(500).send({ error: "Ocurrió un error durante la búsqueda." });
    }
}

module.exports = {
    searchAlbum,
};
