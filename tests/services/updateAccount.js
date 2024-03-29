const sinon = require('sinon');
const { expect } = require('chai');

const updateAccountService = require('../../services/updateAccount');
const { Client } = require('../../models');

describe('Ao chamar o service updateAccount', () => {
  describe('quando as informações obrigatórias não são passadas', async () => {
    const accountId = undefined;
    const password = undefined;

    const code = 400;
    const message = 'O código da conta e a senha são obrigatórios.';    

    it('retorna um objeto de erro', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando a conta informada não é encontrada', async () => {
    const accountId = 20;
    const password = '54321';

    const code = 404;
    const message = 'A conta informada não foi encontrada.';

    before(() => {
      sinon.stub(Client, 'findOne')
        .resolves(false);
    });

    after(() => {
      Client.findOne.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando a senha é alterada com sucesso', async () => {
    const accountId = 1;
    const password = '54321';

    const code = 200;
    const message = 'A senha foi alterada com sucesso.';

    before(() => {  
      sinon.stub(Client, 'findOne')
        .resolves({
          id: 1,
          name: 'Mr. Buffet',
          identityCard: '11111111111',
          password: '12345',
          accountId: 1,
        });
      sinon.stub(Client, 'update')
        .resolves();
    });

    after(() => {
      Client.findOne.restore();
      Client.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);
  
      expect(response.code).to.be.equal(code);
      expect(response.content.message).to.be.equal(message);
    });
  });
});
