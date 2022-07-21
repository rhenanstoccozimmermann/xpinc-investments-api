const { Asset } = require('../models');

module.exports = async (assetId) => {
  const asset = await Asset.findByPk(assetId);

  if (!asset) {
    return {
      error: { 
        code: 404,
        message: 'Ativo não encontrado na corretora.',
      },
    };
  }

  const { id, ticker, price, quantity } = asset;

  return { code: 200, content: { assetId: id, ticker, price, quantity } };
};
