const { Account } = require('../models');

const validateDepositAmount = (requestedDeposit) => {
  if (requestedDeposit <= 0) {
    return {
      error: {
        code: 400,
        message: 'O valor do depósito não pode ser negativo ou igual a zero.',
      },
    };
  }

  return {};
};

module.exports = async (accountId, amount) => {
  const account = await Account.findByPk(accountId);

  const depositAmountValidation = validateDepositAmount(amount);

  if (depositAmountValidation.error) return depositAmountValidation;

  await Account.update({ balance: (account.balance + amount) }, { where: { accountId } });

  const updatedAccount = await Account.findByPk(accountId);

  return { code: 200, content: updatedAccount };
};
