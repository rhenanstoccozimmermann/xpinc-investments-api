import buyAsset from '../services/buyAsset';

export default async (req, res) => {
  try {
    const { accountId, assetId, quantity } = req.body;

    // const clientId = req.clientId;

    const result = await buyAsset(accountId, assetId, quantity);

    if (result.error) {
      const { code, message } = result.error;

      const error = new Error(message);

      error.code = code;
      
      throw error;
    }

    if (!result) throw Error;

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};
