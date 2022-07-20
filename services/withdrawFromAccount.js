const { Account } = require('../models');

const validateWithdrawAmount = (availableBalance, requestedWithdraw) => {
  if (Number(requestedWithdraw) <= 0) {
    return {
      error: {
        code: 400,
        message: 'O valor do saque não pode ser negativo ou igual a zero.',
      },
    };
  }

  if (Number(availableBalance) < Number(requestedWithdraw)) {
    return {
      error: {
        code: 400,
        message: 'O valor do saque não pode ser maior do que o saldo da conta.',
      },
    };
  }

  return {};
};

module.exports = async (id, amount) => {
  const account = await Account.findByPk(id);

  const withdrawAmountValidation = validateWithdrawAmount(account.balance, amount);

  if (withdrawAmountValidation.error) return withdrawAmountValidation;

  await Account.update({ balance: (Number(account.balance) - Number(amount)) }, { where: { id } });

  const updatedAccount = await Account.findByPk(id);

  return { code: 200, content: updatedAccount };
};
