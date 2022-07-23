const { Client } = require('../models');

const updateAccount = async (accountId, password) => {
  const client = await Client.findOne({ where: { accountId } });

  if (!client) {
    return {
      error: {
        code: 404,
        message: 'A conta informada não foi encontrada.',
      },
    };
  }

  await Client.update({ password }, { where: { accountId } });

  return { code: 200, content: { message: 'A senha foi alterada com sucesso.' } };
};

module.exports = {
  updateAccount,
};
