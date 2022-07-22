const Sequelize = require('sequelize');
const config = require('../config/config');
require('dotenv').config();
const { AccountAsset, Asset, Account } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const validateTransaction = (accountAsset, requestedQuantity) => {
  if (!accountAsset) {
    return {
      error: {
        code: 400,
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

const executeUpdateTransaction = async (asset, quantity, assetId, account, totalPrice, accountId) => {
  try {
    return await sequelize.transaction(async (t) => {
      await Asset.update({ quantity: (Number(asset.quantity) + Number(quantity)) }, { where: { id: assetId }, transaction: t });

      await Account.update({ balance: (Number(account.balance) + totalPrice) }, { where: { id: accountId }, transaction: t });
      
      return {};
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

const sellAsset = async (accountId, assetId, quantity) => {
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

  await AccountAsset.update({ quantity: (Number(accountAsset.quantity) - Number(quantity)) }, { where: { accountId, assetId } });

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  const transactionResult = await executeUpdateTransaction(asset, quantity, assetId, account, totalPrice, accountId);

  if (transactionResult.error) return transactionResult;

  return { code: 200, content: updatedAccountAsset };
};

module.exports = {
  sellAsset,
};
