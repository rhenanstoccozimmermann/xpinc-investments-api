const { Client } = require('../models');

module.exports = async (id, password) => {
  await Client.update({ password }, { where: { accountId: id } });

  return { code: 200, content: { password } };
};
