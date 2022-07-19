const Sequelize = require('sequelize');
const config = require('../config/config');
require('dotenv').config();
const { Client, Account } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const validateAccount = (account) => {
  if (!account) {
    return {
      error: {
        code: 404,
        message: 'A conta informada não foi encontrada.',
      },
    };
  }

  if (account.balance > 0) {
    return {
      error: {
        code: 400,
        message: `O saldo precisa estar zerado para a conta ser removida (saldo atual: ${account.balance}).`,
      },
    };
  }
  
  return {};
};

const executeTransaction = async (accountId) => {
  try {
    return await sequelize.transaction(async (t) => {
      await Client.destroy({ where: { accountId } }, { transaction: t });

      await Account.destroy({ where: { id: accountId } }, { transaction: t });
      
      return {};
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

module.exports = async (accountId) => {
  const removedAccount = await Account.findByPk(accountId);

  const accountValidation = validateAccount(removedAccount);

  if (accountValidation.error) return accountValidation;

  const transactionResult = await executeTransaction(accountId);

  if (transactionResult.error) return transactionResult;

  return { code: 200, content: removedAccount };
};