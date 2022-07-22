const { Asset } = require('../models');

const getAssetByAssetId = async (assetId) => {
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
