const welcomeController = (req, res) => {
  const { nombre } = req.user;
  res.json({ message: `Bienvenido, ${nombre}!` });
};

module.exports = welcomeController;
