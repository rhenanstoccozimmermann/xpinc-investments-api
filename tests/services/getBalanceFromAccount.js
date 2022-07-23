const sinon = require('sinon');
const { expect } = require('chai');

const getBalanceFromAccountService = require('../../services/getBalanceFromAccount');
const { Account } = require('../../models');

describe('Ao chamar o service getBalanceFromAccount', () => {
  describe('quando a conta informada não é encontrada', async () => {
    const accountId = 20;
    
    const code = 404;
    const message = 'A conta informada não foi encontrada.';

    before(() => {  
      const exampleAccount = null;

      sinon.stub(Account, 'findByPk')
        .resolves(exampleAccount);
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
      id: 1,
      balance: 0,
    };

    before(() => {      
      sinon.stub(Account, 'findByPk')
        .resolves(exampleAccount);
    });

    after(() => {
      Account.findByPk.restore();
    });

    it('retorna um objeto', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui propriedades ccom os dados da conta', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
      expect(response.content).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getBalanceFromAccountService.getBalanceFromAccount(accountId);

      expect(response.code).to.be.equal(code);
      expect(response.content).to.be.equal(exampleAccount);
    });
  });
});
