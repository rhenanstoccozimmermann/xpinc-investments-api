const { Client } = require('../models');

const validateAccount = (name, clients) => {
  if (clients && clients.some((el) => el.name === name)) {
    return {
      error: {
        code: 409,
        message: `O novo nome informado (${name}) já possui uma conta na corretora.`,
      },
    };
  }
  
  return {};
};

module.exports = async (accountId, name, password) => {
  const clients = await Client.findAll();

  const accountValidation = validateAccount(name, clients);

  if (accountValidation.error) return accountValidation;

  await Client.update({ name, password }, { where: { accountId } });

  return { code: 200, content: { name, password } };
};
