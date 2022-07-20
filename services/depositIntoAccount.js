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

module.exports = async (id, amount) => {
  const account = await Account.findByPk(id);

  const depositAmountValidation = validateDepositAmount(amount);

  if (depositAmountValidation.error) return depositAmountValidation;

  await Account.update({ balance: (Number(account.balance) + Number(amount)) }, { where: { id } });

  const updatedAccount = await Account.findByPk(id);

  return { code: 200, content: updatedAccount };
};
