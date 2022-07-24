const Sequelize = require('sequelize');
const config = require('../config/config');
require('dotenv').config();
const { AccountAsset, Asset, Account } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const validateData = (accountId, assetId, quantity) => {
  if (accountId === undefined || assetId === undefined || quantity === undefined) {
    return {
      error: {
        code: 400,
        message: 'O código da conta, o código do ativo e a quantidade são obrigatórios.',
      },
    };
  }

  return {};
};

const validateTransaction = (accountAsset, requestedQuantity) => {
  if (!accountAsset) {
    return {
      error: {
        code: 404,
        message: 'O ativo informado não foi encontrado na carteira.',
      },
    };
  }

  if (Number(accountAsset.quantity) < Number(requestedQuantity)) {
    return {
      error: {
        code: 400,
        message: `Não há ativos suficientes na carteira para esta venda (ativos disponíveis: ${accountAsset.quantity}).`,
      },
    };
  }

  return {};
};

const executeDestroyTransaction = async (asset, quantity, assetId, account, totalPrice, accountId) => {
  try {
    return await sequelize.transaction(async (t) => {
      await AccountAsset.destroy({ where: { accountId, assetId }, transaction: t });

      await Asset.update({ quantity: (Number(asset.quantity) + Number(quantity)) }, { where: { id: assetId }, transaction: t });

      await Account.update({ balance: (Number(account.balance) + totalPrice) }, { where: { id: accountId }, transaction: t });
      
      return { code: 200, content: { accountId, assetId, quantity: 0 } };
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

const executeUpdateTransaction = async (asset, quantity, assetId, account, totalPrice, accountId, accountAsset) => {
  try {
    return await sequelize.transaction(async (t) => {
      await AccountAsset.update({ quantity: (Number(accountAsset.quantity) - Number(quantity)) }, { where: { accountId, assetId }, transaction: t });

      await Asset.update({ quantity: (Number(asset.quantity) + Number(quantity)) }, { where: { id: assetId }, transaction: t });

      await Account.update({ balance: (Number(account.balance) + totalPrice) }, { where: { id: accountId }, transaction: t });
      
      return {};
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

const sellAsset = async (accountId, assetId, quantity) => {
  const dataValidation = validateData(accountId, assetId, quantity);

  if (dataValidation.error) return dataValidation;

  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  const transactionValidation = validateTransaction(accountAsset, quantity);

  if (transactionValidation.error) return transactionValidation;

  const asset = await Asset.findByPk(assetId);

  const account = await Account.findByPk(accountId);

  const totalPrice = (Number(asset.price) * Number(quantity));

  if (Number(accountAsset.quantity) === Number(quantity)) {
    const transactionResult = await executeDestroyTransaction(asset, quantity, assetId, account, totalPrice, accountId);

    return transactionResult;
  }

  const transactionResult = await executeUpdateTransaction(asset, quantity, assetId, account, totalPrice, accountId, accountAsset);

  if (transactionResult.error) return transactionResult;

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  return { code: 200, content: updatedAccountAsset };
};

module.exports = {
  sellAsset,
};
