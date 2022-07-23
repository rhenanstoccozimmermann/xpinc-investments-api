const { Account } = require('../models');

const validateDepositAmount = (requestedDeposit) => {
  if (Number(requestedDeposit) <= 0) {
    return {
      error: {
        code: 400,
        message: 'O valor do depósito não pode ser negativo ou igual a zero.',
      },
    };
  }

  return {};
};

const depositIntoAccount = async (accountId, amount) => {
  const depositAmountValidation = validateDepositAmount(amount);

  if (depositAmountValidation.error) return depositAmountValidation;

  const account = await Account.findByPk(accountId);

  await Account.update({ balance: (Number(account.balance) + Number(amount)) }, { where: { id: accountId } });

  const updatedAccount = await Account.findByPk(accountId);

  const { id, balance } = updatedAccount;

  return { code: 200, content: { accountId: id, balance } };
};

module.exports = {
  depositIntoAccount,
};
