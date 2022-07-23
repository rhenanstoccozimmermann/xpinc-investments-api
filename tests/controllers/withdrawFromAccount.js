const sinon = require('sinon');
const { expect } = require('chai');

const withdrawFromAccountController = require('../../controllers/withdrawFromAccount');
const withdrawFromAccountService = require('../../services/withdrawFromAccount');

describe('Ao chamar o controller withdrawFromAccount', () => {
  describe('quando o valor do saque é igual a zero', async () => {
    const response = {};
    const request = {};

    const message = 'O valor do saque não pode ser negativo ou igual a zero.';

    before(() => {
      request.body = {
        accountId: 1,
        amount: 0,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(withdrawFromAccountService, 'withdrawFromAccount')
        .resolves({
          error: {
            code: 400,
            message,
          },
        });
    });

    after(() => {
      withdrawFromAccountService.withdrawFromAccount.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await withdrawFromAccountController.withdrawFromAccount(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await withdrawFromAccountController.withdrawFromAccount(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando ocorre algum erro desconhecido', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        accountId: 1,
        amount: 100,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(withdrawFromAccountService, 'withdrawFromAccount')
        .resolves(false);
    });

    after(() => {
      withdrawFromAccountService.withdrawFromAccount.restore();
    });

    it('é chamado o status com o código 500', async () => {
      await withdrawFromAccountController.withdrawFromAccount(request, response);

      expect(response.status.calledWith(500)).to.be.equal(true);
    }); 
  });

  describe('quando o saque é efetuado com sucesso', async () => {
    const response = {};
    const request = {};  

    const exampleAccount = {
      accountId: 1,
      balance: 0,
    };

    before(() => {
      request.body = {
        accountId: 1,
        amount: 100,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(withdrawFromAccountService, 'withdrawFromAccount')
        .resolves({
          code: 200,
          content: exampleAccount,
        });
    });

    after(() => {
      withdrawFromAccountService.withdrawFromAccount.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await withdrawFromAccountController.withdrawFromAccount(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os dados da conta', async () => {
      await withdrawFromAccountController.withdrawFromAccount(request, response);

      expect(response.json.calledWith(exampleAccount)).to.be.equal(true);
    });
  }); 
});
