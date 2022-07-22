const sinon = require('sinon');
const { expect } = require('chai');

const removeAccountController = require('../../controllers/removeAccount');
const removeAccountService = require('../../services/removeAccount');

describe('Ao chamar o controller removeAccount', () => {
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

      sinon.stub(removeAccountService, 'removeAccount')
        .resolves({
          error: {
            code: 404,
            message,
          },
        });
    });

    after(() => {
      removeAccountService.removeAccount.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await removeAccountController.removeAccount(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await removeAccountController.removeAccount(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando a conta é removida com sucesso', async () => {
    const response = {};
    const request = {};  

    const message = 'A conta 1 foi removida com sucesso.';

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(removeAccountService, 'removeAccount')
        .resolves({
          code: 200,
          content: message,
        });
    });

    after(() => {
      removeAccountService.removeAccount.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await removeAccountController.removeAccount(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de sucesso', async () => {
      await removeAccountController.removeAccount(request, response);

      expect(response.json.calledWith(message)).to.be.equal(true);
    });
  }); 
});
