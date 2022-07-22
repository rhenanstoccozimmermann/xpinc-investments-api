const { Account, Asset } = require('../models');

const getAssetsByAccountId = async (accountId) => {
  const accountAsset = await Account.findOne({
    where: { id: accountId },
    include: [
    { model: Asset, as: 'assets' },
  ],
});

  if (!accountAsset.assets.length) {
    return {
      error: { 
        code: 404,
        message: 'Não foram encontrados ativos na carteira.',
      },
    };
  }

  const assets = accountAsset.assets.map(({ id, ticker, price, AccountAsset }) => ({
    accountId: Number(accountId),
    assetId: id,
    ticker, 
    price,
    quantity: AccountAsset.quantity,
  }));

  return { code: 200, content: assets };
};

module.exports = {
  getAssetsByAccountId,
};
