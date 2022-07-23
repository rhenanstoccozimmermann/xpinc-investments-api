const sinon = require('sinon');
const { expect } = require('chai');

const updateAccountService = require('../../services/updateAccount');
const { Client } = require('../../models');

describe('Ao chamar o service updateAccount', () => {
  describe('quando a senha é alterada com sucesso', async () => {
    const accountId = 1;
    const password = '54321';

    const code = 200;
    const message = 'A senha foi alterada com sucesso.';

    before(() => {      
      sinon.stub(Client, 'update')
        .resolves();
    });

    after(() => {
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
