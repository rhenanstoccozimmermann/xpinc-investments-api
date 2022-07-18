import { Asset, AccountAsset } from '../models';

const validateQuantity = (availableQuantity, requestedQuantity) => {
  if (availableQuantity < requestedQuantity) {
    return {
      error: {
        code: 400,
        message: `Não há ativos suficientes na corretora para esta compra (ativos disponíveis: ${availableQuantity}).`,
      },
    };
  }

  return {};
};

export default async (accountId, assetId, quantity) => {
  const asset = await Asset.findByPk(assetId);

  const quantityValidation = validateQuantity(asset.quantity, quantity);

  if (quantityValidation.error) return quantityValidation;

  const accountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  if (!accountAsset) {
    const newAccountAsset = await AccountAsset.create({ accountId, assetId, quantity });

    return newAccountAsset;
  }

  await AccountAsset.update({ quantity: (accountAsset.quantity + quantity) },{ where: { accountId, assetId } });

  const updatedAccountAsset = await AccountAsset.findOne({ where: { accountId, assetId } });

  return updatedAccountAsset;
};
