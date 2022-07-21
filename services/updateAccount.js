const { Client } = require('../models');

module.exports = async (accountId, password) => {
  await Client.update({ password }, { where: { accountId } });

  return { code: 200, content: { password } };
};
