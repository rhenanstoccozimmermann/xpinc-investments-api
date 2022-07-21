const { Account } = require('../models');

module.exports = async (accountId) => {
  const account = await Account.findByPk(accountId);

  if (!account) {
    return {
      error: { 
        code: 404,
        message: 'Conta não encontrada.',
      },
    };
  }

  const { id, balance } = account;

  return { code: 200, content: { accountId: id, balance } };
};
