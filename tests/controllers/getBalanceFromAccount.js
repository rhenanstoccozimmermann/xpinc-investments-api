const sinon = require('sinon');
const { expect } = require('chai');

const getBalanceFromAccountController = require('../../controllers/getBalanceFromAccount');
const getBalanceFromAccountService = require('../../services/getBalanceFromAccount');

describe('Ao chamar o controller getBalanceFromAccount', () => {
  describe('quando a conta informada não é encontrada', async () => {
    const response = {};
    const request = {};

    const message = 'A conta informada não foi encontrada.';

    before(() => {
      request.params = { id: 20 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getBalanceFromAccountService, 'getBalanceFromAccount')
        .resolves({
          error: {
            code: 404,
            message,
          },
        });
    });

    after(() => {
      getBalanceFromAccountService.getBalanceFromAccount.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await getBalanceFromAccountController.getBalanceFromAccount(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await getBalanceFromAccountController.getBalanceFromAccount(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando a conta é retornada com sucesso', async () => {
    const response = {};
    const request = {};  

    const exampleAccount = {
      accountId: 1,
      balance: 100.55,
    };

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getBalanceFromAccountService, 'getBalanceFromAccount')
        .resolves({
          code: 200,
          content: exampleAccount,
        });
    });

    after(() => {
      getBalanceFromAccountService.getBalanceFromAccount.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await getBalanceFromAccountController.getBalanceFromAccount(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os dados da conta', async () => {
      await getBalanceFromAccountController.getBalanceFromAccount(request, response);

      expect(response.json.calledWith(exampleAccount)).to.be.equal(true);
    });
  }); 
});
