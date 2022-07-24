const { Asset } = require('../models');

const validateData = (assetId) => {
  if (assetId === undefined) {
    return {
      error: {
        code: 400,
        message: 'O código do ativo é obrigatório.',
      },
    };
  }

  return {};
};

const getAssetByAssetId = async (assetId) => {
  const dataValidation = validateData(assetId);

  if (dataValidation.error) return dataValidation;

  const asset = await Asset.findByPk(assetId);

  if (!asset) {
    return {
      error: { 
        code: 404,
        message: 'O ativo informado não foi encontrado na corretora.',
      },
    };
  }

  const { id, ticker, price, quantity } = asset;

  return { code: 200, content: { assetId: id, ticker, price, quantity } };
};

module.exports = {
  getAssetByAssetId,
};
