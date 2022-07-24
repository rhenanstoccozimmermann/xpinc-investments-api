const Sequelize = require('sequelize');
const config = require('../config/config');
require('dotenv').config();
const { Asset, Account, AccountAsset } = require('../models');

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

const validateTransaction = (asset, requestedQuantity, account) => {
  if (!asset) {
    return {
      error: {
        code: 404,
        message: 'O ativo informado não foi encontrado na corretora.',
      },
    };
  }

  if (Number(asset.quantity) < Number(requestedQuantity)) {
    return {
      error: {
        code: 400,
        message: `Não há ativos suficientes na corretora para esta compra (ativos disponíveis: ${asset.quantity}).`,
      },
    };
  }

  const totalPrice = (Number(asset.price) * Number(requestedQuantity));

  if (Number(account.balance) < totalPrice) {
    return {
      error: {
        code: 400,
        message: `Não há saldo suficiente na conta para esta compra (saldo disponível: ${account.balance}).`,
      },
    };
  }

  return {};
};

const executeCreateTransaction = async (accountId, assetId, quantity, asset, account, totalPrice) => {
  try {
    return await sequelize.transaction(async (t) => {
      const newAccountAsset = await AccountAsset.create({ accountId, assetId, quantity }, { transaction: t });

      await Asset.update({ quantity: (Number(asset.quantity) - Number(quantity)) }, { where: { id: assetId }, transaction: t });

      await Account.update({ balance: (Number(account.balance) - totalPrice) }, { where: { id: accountId }, transaction: t });
      
      return { code: 201, content: newAccountAsset };
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

const executeUpdateTransaction = async (accountId, assetId, quantity, asset, account, totalPrice, accountAsset) => {
  try {
    return await sequelize.transaction(async (t) => {
      await AccountAsset.update({ quantity: (Number(accountAsset.quantity) + Number(quantity)) }, { where: { accountId, assetId }, transaction: t });

      await Asset.update({ quantity: (Number(asset.quantity) - Number(quantity)) }, { where: { id: assetId }, transaction: t });

      await Account.update({ balance: (Number(account.balance) - totalPrice) }, { where: { id: accountId }, transaction: t });

      return {};
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

const buyAsset = async (accountId, assetId, quantity) => {
  const dataValidation = validateData(accountId, assetId, quantity);

  if (dataValidation.error) return dataValidation;

  const asset = await Asset.findByPk(assetId);

  const account = await Account.findByPk(accountId);

    const transactionValidation = validateTransaction(asset, quantity, account);

  if (transactionValidation.error) return transactionValidation;

  const totalPrice = (Number(asset.price) * Number(quantity));

  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  if (!accountAsset) {
    const newAccountAsset = await executeCreateTransaction(accountId, assetId, quantity, asset, account, totalPrice);

    return newAccountAsset;
  } 

  const transactionResult = await executeUpdateTransaction(accountId, assetId, quantity, asset, account, totalPrice, accountAsset);

  if (transactionResult.error) return transactionResult;

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });
      
  return { code: 200, content: updatedAccountAsset };
};

module.exports = {
  buyAsset,
};
