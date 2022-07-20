const { sign } = require('jsonwebtoken');

module.exports = (id, password) => {
  const data = { id, password };

  const secret = process.env.JWT_SECRET;

  const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

  const token = sign({ data }, secret, jwtConfig);

  return token;
};
