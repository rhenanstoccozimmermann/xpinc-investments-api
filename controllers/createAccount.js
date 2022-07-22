const createAccountService = require('../services/createAccount');

const createAccount = async (req, res) => {
  try {
    const { name, identityCard, password } = req.body;

    const result = await createAccountService.createAccount(name, identityCard, password);

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
  createAccount,
};
