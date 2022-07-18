import sellAsset from '../services/sellAsset';

export default async (req, res) => {
  try {
    const { accountId, assetId, quantity } = req.body;

    // const clientId = req.clientId;

    const result = await sellAsset(accountId, assetId, quantity);

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
