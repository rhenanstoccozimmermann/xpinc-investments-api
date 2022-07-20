const { AccountAsset } = require('../models');

const validateQuantity = (availableQuantity, requestedQuantity) => {
  if (Number(availableQuantity) < Number(requestedQuantity)) {
    return {
      error: {
        code: 400,
        message: `Não há ativos suficientes na carteira para esta venda (ativos disponíveis: ${availableQuantity}).`,
      },
    };
  }

  return {};
};

module.exports = async (accountId, assetId, quantity) => {
  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  const quantityValidation = validateQuantity(accountAsset.quantity, quantity);

  if (quantityValidation.error) return quantityValidation;

  if (Number(accountAsset.quantity) === Number(quantity)) {
    await AccountAsset.destroy({ where: { accountId, assetId } });

    return { code: 200, content: { accountId, assetId, quantity: 0 } };
  }

  await AccountAsset.update({ quantity: (Number(accountAsset.quantity) - Number(quantity)) }, { where: { accountId, assetId } });

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  return { code: 200, content: updatedAccountAsset };
};
