const { Account } = require('../models');

const validateWithdrawAmount = (availableBalance, requestedWithdraw) => {
  if (requestedWithdraw <= 0) {
    return {
      error: {
        code: 400,
        message: 'O valor do saque não pode ser negativo ou igual a zero.',
      },
    };
  }

  if (availableBalance < requestedWithdraw) {
    return {
      error: {
        code: 400,
        message: 'O valor do saque não pode ser maior do que o saldo da conta.',
      },
    };
  }

  return {};
};

module.exports = async (accountId, amount) => {
  const account = await Account.findByPk(accountId);

  const withdrawAmountValidation = validateWithdrawAmount(account.balance, amount);

  if (withdrawAmountValidation.error) return withdrawAmountValidation;

  await Account.update({ balance: (account.balance - amount) }, { where: { accountId } });

  const updatedAccount = await Account.findByPk(accountId);

  return { code: 200, content: updatedAccount };
};