const { Client } = require('../models');
const auth = require('../middlewares/generateToken');

const validateRequest = (req, res) => {
  const { accountId, password } = req.body;

  if (accountId === undefined || !password) {
    res.status(400).json({ message: 'O código da conta e a senha são obrigatórios.' });

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

const login = async (req, res) => {
  try {
    if (!validateRequest(req, res)) return;

    const { accountId, password } = req.body;

    const client = await Client.findOne({ where: { accountId, password } });

    if (!validateClient(client)) throw Error;

    const token = auth.generateToken(accountId, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: 'Campos inválidos.' });
  }
};

module.exports = {
  login,
};
