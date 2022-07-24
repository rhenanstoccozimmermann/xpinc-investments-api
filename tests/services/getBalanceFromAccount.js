const sinon = require('sinon');
const { expect } = require('chai');

const getBalanceFromAccountService = require('../../services/getBalanceFromAccount');
const { Account } = require('../../models');

describe('Ao chamar o service getBalanceFromAccount', () => {
  describe('quando as informações obrigatórias não são passadas', async () => {
    const accountId = undefined;
    
    const code = 400;
    const message = 'O código da conta é obrigatório.';   

    it('retorna um objeto de erro', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando a conta informada não é encontrada', async () => {
    const accountId = 20;
    
    const code = 404;
    const message = 'A conta informada não foi encontrada.';

    before(() => {
      sinon.stub(Account, 'findByPk')
        .resolves(false);
    });

    after(() => {
      Account.findByPk.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando a conta é retornada com sucesso', async () => {
    const accountId = 1;
    
    const code = 200;
    const exampleAccount = {
      accountId: 1,
      balance: 0,
    };

    before(() => {      
      sinon.stub(Account, 'findByPk')
        .resolves({
          id: 1,
          balance: 0,
        });
    });

    after(() => {
      Account.findByPk.restore();
    });

    it('retorna um objeto', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccount);
    });
  });
});
