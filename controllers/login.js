const { Client } = require('../models');
const generateToken = require('../middlewares/generateToken');

const validateRequest = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ message: 'O nome e a senha são obrigatórios.' });

    return false;
  }

  return true;
};

const validateClient = (client) => {
  if (!client) {
    return false;
  }

  return true;
};

module.exports = async (req, res) => {
  try {
    if (!validateRequest(req, res)) return;

    const { name, password } = req.body;

    const client = await Client.findOne({ where: { name, password } });

    if (!validateClient(client)) throw Error;

    const token = generateToken(name, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: 'Campos inválidos.' });
  }
};
