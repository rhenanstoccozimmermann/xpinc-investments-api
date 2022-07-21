const { Client } = require('../models');
const generateToken = require('../middlewares/generateToken');

const validateRequest = (req, res) => {
  const { id, password } = req.body;

  if (id === undefined || !password) {
    res.status(400).json({ message: 'O id e a senha são obrigatórios.' });

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

    const { id, password } = req.body; // refatorar

    const client = await Client.findOne({ where: { accountId: id, password } });

    if (!validateClient(client)) throw Error;

    const token = generateToken(id, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: 'Campos inválidos.' });
  }
};
