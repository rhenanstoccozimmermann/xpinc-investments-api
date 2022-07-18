const { Client } = require('../models');
const { verify } = require('jsonwebtoken');

const validateRequest = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Token não encontrado.' });

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

module.exports = async (req, res, next) => {
  try {
    if (!validateRequest(req, res)) return;

    const token = req.headers.authorization;
  
    const secret = process.env.JWT_SECRET;

    const decoded = verify(token, secret);

    const { name, password } = decoded.data;

    const client = await Client.findOne({ where: { name, password } });

    if (!validateClient(client)) throw Error;
   
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido.' });
  }
};
