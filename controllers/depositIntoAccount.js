const depositIntoAccount = require('../services/depositIntoAccount');

module.exports = async (req, res) => {
  try {
    const { accountId, amount } = req.body;

    const result = await depositIntoAccount(accountId, amount);

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
