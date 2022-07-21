const { AccountAsset } = require('../models');

const validateTransaction = (accountAsset, requestedQuantity) => {
  if (!accountAsset) {
    return {
      error: {
        code: 400,
        message: 'Ativo não encontrado na carteira.',
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

module.exports = async (accountId, assetId, quantity) => {
  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  const transactionValidation = validateTransaction(accountAsset, quantity);

  if (transactionValidation.error) return transactionValidation;

  if (Number(accountAsset.quantity) === Number(quantity)) {
    await AccountAsset.destroy({ where: { accountId, assetId } });

    return { code: 200, content: { accountId, assetId, quantity: 0 } };
  }

  await AccountAsset.update({ quantity: (Number(accountAsset.quantity) - Number(quantity)) }, { where: { accountId, assetId } });

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  return { code: 200, content: updatedAccountAsset };
};
