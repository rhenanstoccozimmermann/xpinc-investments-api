const sinon = require('sinon');
const { expect } = require('chai');

const createAccountController = require('../../controllers/createAccount');
const createAccountService = require('../../services/createAccount');

describe('Ao chamar o controller createAccount', () => {
  describe('quando o identityCard informado já possui uma conta na corretora', async () => {
    const response = {};
    const request = {};

    const message = 'A cédula de identidade informada (11111111111) já possui uma conta na corretora.';

    before(() => {
      request.body = {
        name: 'Mr. Buffet',
        identityCard: '11111111111',
        password: '12345',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(createAccountService, 'createAccount')
        .resolves({
          error: {
            code: 409,
            message,
          },
        });
    });

    after(() => {
      createAccountService.createAccount.restore();
    });

    it('é chamado o status com o código 409', async () => {
      await createAccountController.createAccount(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await createAccountController.createAccount(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando a conta é criada com sucesso', async () => {
    const response = {};
    const request = {};  

    const exampleAccount = {
      accountId: 2,
      balance: 100.55,
    };

    before(() => {
      request.body = {
        name: 'Mr. Soros',
        identityCard: '11111111112',
        password: '23456',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(createAccountService, 'createAccount')
        .resolves({
          code: 201,
          content: exampleAccount,
        });
    });

    after(() => {
      createAccountService.createAccount.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await createAccountController.createAccount(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com os dados da conta', async () => {
      await createAccountController.createAccount(request, response);

      expect(response.json.calledWith(exampleAccount)).to.be.equal(true);
    });
  }); 
});
