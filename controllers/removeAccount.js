const removeAccountService = require('../services/removeAccount');

const removeAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeAccountService.removeAccount(id);

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
  removeAccount,
};
