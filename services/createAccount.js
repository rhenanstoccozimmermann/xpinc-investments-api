const Sequelize = require('sequelize');
const config = require('../config/config');
require('dotenv').config();
const { Client, Account } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const validateAccount = (identityCard, clients) => {
  if (clients && clients.some((el) => Number(el.identityCard) === Number(identityCard))) {
    return {
      error: {
        code: 409,
        message: `A cédula de identidade informada (${identityCard}) já possui uma conta na corretora.`,
      },
    };
  }
  
  return {};
};

const executeTransaction = async (name, identityCard, password) => {
  try {
    return await sequelize.transaction(async (t) => {
      const newAccount = await Account.create({ balance: 0 }, { transaction: t });

      await Client.create({ name, identityCard, password, accountId: newAccount.id }, { transaction: t });
      
      return newAccount;
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

module.exports = async (name, identityCard, password) => {
  const clients = await Client.findAll();

  const accountValidation = validateAccount(identityCard, clients);

  if (accountValidation.error) return accountValidation;

  const newAccount = await executeTransaction(name, identityCard, password);

  return { code: 201, content: newAccount };
};
