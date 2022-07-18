const { AccountAsset, Asset } = require('../models');

module.exports = async (accountId) => {
  const assets = await AccountAsset.findAll({
    where: { accountId },
    include: [
    { model: Asset, as: 'assets', attributes: { exclude: 'quantity' } },
  ],
});

  if (!assets) {
    return {
      error: { 
        code: 404,
        message: 'Ativo não encontrado na carteira.',
      },
    };
  }

  return { code: 200, content: assets };
};
