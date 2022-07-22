const sellAssetService = require('../services/sellAsset');

const sellAsset = async (req, res) => {
  try {
    const { accountId, assetId, quantity } = req.body;

    const result = await sellAssetService.sellAsset(accountId, assetId, quantity);

    if (result.error) {
      const { code, message } = result.error;

      const error = new Error(message);

      error.code = code;
      
      throw error;
    }

    if (!result) throw Error;

    return res.status(result.code).json(result.content);
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  sellAsset,
};
