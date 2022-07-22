const { sign } = require('jsonwebtoken');

const generateToken = (accountId, password) => {
  const data = { accountId, password };

  const secret = process.env.JWT_SECRET;

  const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

  const token = sign({ data }, secret, jwtConfig);

  return token;
};

module.exports = {
  generateToken,
};
