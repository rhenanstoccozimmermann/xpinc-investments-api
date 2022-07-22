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
      const exampleClients = [{
        id: 1,
        name: 'Mr. Buffet',
        identityCard: '11111111111',
        password: '12345',
        accountId: 1,
      }];

      sinon.stub(Client, 'findAll')
        .resolves(exampleClients);
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

    const exampleNewAccount = {
      id: 2,
      balance: 0,
    };

    before(() => {  
      const exampleClients = [{
        id: 1,
        name: 'Mr. Buffet',
        identityCard: '11111111111',
        password: '12345',
        accountId: 1,
      }];
      const exampleNewClient = {
        id: 2,
        name: 'Mr. Soros',
        identityCard: '21111111111',
        password: '54321',
        accountId: 2,
      };
      
      sinon.stub(Client, 'findAll')
        .resolves(exampleClients);
      sinon.stub(Account, 'create')
        .resolves(exampleNewAccount);
      sinon.stub(Client, 'create')
        .resolves(exampleNewClient);
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

    it('tal objeto possui propriedades com os dados da conta', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);

      expect(response).to.have.a.property('content');
      expect(response.content).to.have.a.property('accountId');
      expect(response.content).to.have.a.property('balance');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await createAccountService.createAccount(name, identityCard, password);
  
      expect(response.content.accountId).to.be.equal(exampleNewAccount.id);
      expect(response.content.balance).to.be.equal(exampleNewAccount.balance);
    });
  });
});
