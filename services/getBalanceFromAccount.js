const { Account } = require('../models');

const getBalanceFromAccount = async (accountId) => {
  const account = await Account.findByPk(accountId);

  if (!account) {
    return {
      error: { 
        code: 404,
        message: 'A conta informada não foi encontrada.',
      },
    };
  }

  const { id, balance } = account;

  return { code: 200, content: { accountId: id, balance } };
};

module.exports = {
  getBalanceFromAccount,
};
