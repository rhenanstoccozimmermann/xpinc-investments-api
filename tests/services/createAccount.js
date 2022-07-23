const sinon = require('sinon');
const { expect } = require('chai');

const createAccountService = require('../../services/createAccount');
const { Client, Account } = require('../../models');

describe('Ao chamar o service createAccount', () => {
  describe('quando o identityCard informado já possui uma conta na corretora', async () => {
    const name = 'Mr. Buffet';
    const identityCard = '11111111111';
    const password = '12345';
    
    const code = 409;
    const message = 'A cédula de identidade informada (11111111111) já possui uma conta na corretora.';

    before(() => {
      sinon.stub(Client, 'findAll')
        .resolves([{
          id: 1,
          name: 'Mr. Buffet',
          identityCard: '11111111111',
          password: '12345',
          accountId: 1,
        }]);
    });

    after(() => {
      Client.findAll.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando a conta é criada com sucesso', async () => {
    const name = 'Mr. Soros';
    const identityCard = '21111111111';
    const password = '54321';

    const code = 201;
    const exampleAccount = {
      accountId: 2,
      balance: 0,
    };

    before(() => {      
      sinon.stub(Client, 'findAll')
        .resolves([{
          id: 1,
          name: 'Mr. Buffet',
          identityCard: '11111111111',
          password: '12345',
          accountId: 1,
        }]);
      sinon.stub(Account, 'create')
        .resolves({
          id: 2,
          balance: 0,
        });
      sinon.stub(Client, 'create')
        .resolves({
          id: 2,
          name: 'Mr. Soros',
          identityCard: '21111111111',
          password: '54321',
          accountId: 2,
        });
    });

    after(() => {
      Client.findAll.restore();
      Account.create.restore();
      Client.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);
  
      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccount);
    });
  });
});
