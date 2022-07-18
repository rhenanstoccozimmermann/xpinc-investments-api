import { Account } from '../models';

export default async (id) => {
  const account = await Account.findByPk(id);

  if (!account) {
    return {
      error: { 
        code: 404,
        message: 'Conta não encontrada.',
      },
    };
  }

  return { code: 200, content: account };
};
