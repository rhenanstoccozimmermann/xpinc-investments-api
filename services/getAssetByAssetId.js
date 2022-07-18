const { Asset } = require('../models');

module.exports = async (id) => {
  const asset = await Asset.findByPk(id);

  if (!asset) {
    return {
      error: { 
        code: 404,
        message: 'Ativo não encontrado na corretora.',
      },
    };
  }

  return { code: 200, content: asset };
};
