const { Client } = require('../models');

const updateAccount = async (accountId, password) => {
  await Client.update({ password }, { where: { accountId } });

  return { code: 200, content: { message: 'A senha foi alterada com sucesso.' } };
};

module.exports = {
  updateAccount,
};
