const { Account } = require('../models');

const validateData = (accountId, amount) => {
  if (accountId === undefined || amount === undefined) {
    return {
      error: {
        code: 400,
        message: 'O código da conta e o valor do saque são obrigatórios.',
      },
    };
  }

  return {};
};

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

const withdrawFromAccount = async (accountId, amount) => {
  const dataValidation = validateData(accountId, amount);

  if (dataValidation.error) return dataValidation;

  const account = await Account.findByPk(accountId);

  const withdrawAmountValidation = validateWithdrawAmount(account.balance, amount);

  if (withdrawAmountValidation.error) return withdrawAmountValidation;

  await Account.update({ balance: (Number(account.balance) - Number(amount)) }, { where: { id: accountId } });

  const updatedAccount = await Account.findByPk(accountId);

  const { id, balance } = updatedAccount;

  return { code: 200, content: { accountId: id, balance } };
};

module.exports = {
  withdrawFromAccount,
};
