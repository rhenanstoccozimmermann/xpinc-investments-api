const Sequelize = require('sequelize');
const config = require('../config/config');
const { Client, Account } = require('../models');

const sequelize = new Sequelize(config.process.env.NODE_ENV);

const validateAccount = (name, clients) => {
  if (clients && clients.some((el) => el.name === name)) {
    return {
      error: {
        code: 409,
        message: `O nome informado (${name}) já possui uma conta na corretora.`,
      },
    };
  }
  
  return {};
};

const executeTransaction = async (name, password) => {
  try {
    return await sequelize.transaction(async (t) => {
      const newAccount = await Account.create({ balance: 0 }, { transaction: t });

      await Client.create({ name, password, accountId: newAccount.id }, { transaction: t });
      
      return newAccount;
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

module.exports = async (name, password) => {
  const clients = await Client.findAll();

  const accountValidation = validateAccount(name, clients);

  if (accountValidation.error) return accountValidation;

  const newAccount = await executeTransaction(name, password);

  return { code: 201, content: newAccount };
};
