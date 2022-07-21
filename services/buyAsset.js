const Sequelize = require('sequelize');
const config = require('../config/config');
require('dotenv').config();
const { Asset, Account, AccountAsset } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const validateTransaction = (asset, requestedQuantity, totalPrice, account) => {
  if (!asset) {
    return {
      error: {
        code: 400,
        message: 'Ativo não encontrado na corretora.',
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

const executeTransaction = async (accountId, assetId, quantity, asset, account, totalPrice) => {
  try {
    return await sequelize.transaction(async (t) => {
      const newAccountAsset = await AccountAsset.create({ accountId, assetId, quantity }, { transaction: t });

      await Asset.update({ quantity: (Number(asset.quantity) - Number(quantity)) }, { where: { id: assetId }, transaction: t });

      await Account.update({ balance: (Number(account.balance) - totalPrice) }, { where: { id: accountId }, transaction: t });
      
      return newAccountAsset;
    });
  } catch (error) {
    return { error: { code: 500, message: error.message } };
  }
};

module.exports = async (accountId, assetId, quantity) => {
  const asset = await Asset.findByPk(assetId);

  const account = await Account.findByPk(accountId);

  const totalPrice = (Number(asset.price) * Number(quantity));

  const transactionValidation = validateTransaction(asset, quantity, totalPrice, account);

  if (transactionValidation.error) return transactionValidation;

  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  if (accountAsset) {
    await AccountAsset.update({ quantity: (Number(accountAsset.quantity) + Number(quantity)) },{ where: { accountId, assetId } });

    const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

    return { code: 200, content: updatedAccountAsset };
  }

  const newAccountAsset = await executeTransaction(accountId, assetId, quantity, asset, account, totalPrice);

  return { code: 201, content: newAccountAsset };
};
