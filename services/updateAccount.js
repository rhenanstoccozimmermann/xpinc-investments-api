const { Client } = require('../models');

const validateData = (accountId, password) => {
  if (accountId === undefined || !password) {
    return {
      error: {
        code: 400,
        message: 'O código da conta e a senha são obrigatórios.',
      },
    };
  }

  return {};
};

const updateAccount = async (accountId, password) => {
  const dataValidation = validateData(accountId, password);

  if (dataValidation.error) return dataValidation;

  const client = await Client.findOne({ where: { accountId } });

  if (!client) {
    return {
      error: {
        code: 404,
        message: 'A conta informada não foi encontrada.',
      },
    };
  }

  await Client.update({ password }, { where: { accountId } });

  return { code: 200, content: { message: 'A senha foi alterada com sucesso.' } };
};

module.exports = {
  updateAccount,
};
