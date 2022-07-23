const sinon = require('sinon');
const { expect } = require('chai');

const depositIntoAccountService = require('../../services/depositIntoAccount');
const { Account } = require('../../models');

describe('Ao chamar o service depositIntoAccount', () => {
  describe('quando o valor do depósito é igual a zero', async () => {
    const accountId = 1;
    const amount = 0;
    
    const code = 400;
    const message = 'O valor do depósito não pode ser negativo ou igual a zero.'; 

    it('retorna um objeto de erro', async () => {
      const response = await depositIntoAccountService.depositIntoAccount(accountId, amount);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await depositIntoAccountService.depositIntoAccount(accountId, amount);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await depositIntoAccountService.depositIntoAccount(accountId, amount);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando o depósito é efetuado com sucesso', async () => {
    const accountId = 1;
    const amount = 100.55;

    const code = 200;
    const exampleAccount = {
      accountId: 1,
      balance: 100.55,
    };

    before(() => {      
      sinon.stub(Account, 'findByPk')
        .resolves({
          id: 1,
          balance: 100.55,
        });
      sinon.stub(Account, 'update')
        .resolves();
    });

    after(() => {
      Account.findByPk.restore();
      Account.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await depositIntoAccountService.depositIntoAccount(accountId, amount);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await depositIntoAccountService.depositIntoAccount(accountId, amount);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await depositIntoAccountService.depositIntoAccount(accountId, amount);
  
      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccount);
    });
  });
});
