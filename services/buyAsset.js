const { Asset, AccountAsset } = require('../models');

const validateQuantity = (availableQuantity, requestedQuantity) => {
  if (Number(availableQuantity) < Number(requestedQuantity)) {
    return {
      error: {
        code: 400,
        message: `Não há ativos suficientes na corretora para esta compra (ativos disponíveis: ${availableQuantity}).`,
      },
    };
  }

  return {};
};

module.exports = async (accountId, assetId, quantity) => {
  const asset = await Asset.findByPk(assetId);

  const quantityValidation = validateQuantity(asset.quantity, quantity);

  if (quantityValidation.error) return quantityValidation;

  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  if (accountAsset) {
    await AccountAsset.update({ quantity: (Number(accountAsset.quantity) + Number(quantity)) },{ where: { accountId, assetId } });

    const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

    return { code: 200, content: updatedAccountAsset };
  }

  const newAccountAsset = await AccountAsset.create({ accountId, assetId, quantity });

  return { code: 201, content: newAccountAsset };
};
