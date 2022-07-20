const updateAccount = require('../services/updateAccount');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const { password } = req.body;

    const result = await updateAccount(id, password);

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
