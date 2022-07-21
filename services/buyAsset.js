const { Asset, Account, AccountAsset } = require('../models');

const validateTransaction = (asset, requestedQuantity, account) => {
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

  if (Number(account.balance) < (Number(asset.price) * Number(requestedQuantity))) {
    return {
      error: {
        code: 400,
        message: `Não há saldo suficiente na conta para esta compra (saldo disponível: ${account.balance}).`,
      },
    };
  }

  return {};
};

module.exports = async (accountId, assetId, quantity) => {
  const asset = await Asset.findByPk(assetId);

  const account = await Account.findByPk(accountId);

  const transactionValidation = validateTransaction(asset, quantity, account);

  if (transactionValidation.error) return transactionValidation;

  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  if (accountAsset) {
    await AccountAsset.update({ quantity: (Number(accountAsset.quantity) + Number(quantity)) },{ where: { accountId, assetId } });

    const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

    return { code: 200, content: updatedAccountAsset };
  }

  const newAccountAsset = await AccountAsset.create({ accountId, assetId, quantity });

  return { code: 201, content: newAccountAsset };
};
