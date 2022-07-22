const sinon = require('sinon');
const { expect } = require('chai');

const updateAccountService = require('../../services/updateAccount');
const { Client } = require('../../models');

describe('Ao chamar o service updateAccount', () => {
  describe('quando a senha é alterada com sucesso', async () => {
    const accountId = 1;
    const password = '12345';

    const message = 'A senha foi alterada com sucesso.';

    before(() => {
      const exampleClient = {
        id: 1,
        name: 'Mr. Buffet',
        identityCard: '11111111111',
        password: '12345',
        accountId: 1,
      };
      
      sinon.stub(Client, 'update')
        .resolves(exampleClient);
    });

    after(() => {
      Client.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui propriedades confirmando a alteração de senha', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);

      expect(response).to.have.a.property('content');
      expect(response.content).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await updateAccountService.updateAccount(accountId, password);
  
      expect(response.content.message).to.be.equal(message);
    });
  });
});
