import { Asset, AccountAsset } from '../models';

const validateQuantity = (availableQuantity, requestedQuantity) => {
  if (availableQuantity < requestedQuantity) {
    return {
      error: {
        code: 400,
        message: `Não há ativos suficientes na carteira para esta venda (ativos disponíveis: ${availableQuantity}).`,
      },
    };
  }

  return {};
};

export default async (accountId, assetId, quantity) => {
  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  const quantityValidation = validateQuantity(accountAsset.quantity, quantity);

  if (quantityValidation.error) return quantityValidation;

  if (accountAsset.quantity === quantity) {
    const removedAccountAsset = await AccountAsset.destroy({ where: { accountId, assetId } });

    return removedAccountAsset;
  }

  await AccountAsset.update({ quantity: (accountAsset.quantity - quantity) }, { where: { accountId, assetId } });

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  return updatedAccountAsset;
};
