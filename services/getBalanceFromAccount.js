const { Account } = require('../models');

const validateData = (accountId) => {
  if (accountId === undefined) {
    return {
      error: {
        code: 400,
        message: 'O código da conta é obrigatório.',
      },
    };
  }

  return {};
};

const getBalanceFromAccount = async (accountId) => {
  const dataValidation = validateData(accountId);

  if (dataValidation.error) return dataValidation;

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
