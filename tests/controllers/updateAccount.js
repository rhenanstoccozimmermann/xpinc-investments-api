const sinon = require('sinon');
const { expect } = require('chai');

const updateAccountController = require('../../controllers/updateAccount');
const updateAccountService = require('../../services/updateAccount');

describe('Ao chamar o controller updateAccount', () => { 
  describe('quando a senha é alterada com sucesso', async () => {
    const response = {};
    const request = {};  

    const message = 'A senha foi alterada com sucesso.';

    before(() => {
      request.params = { id: 1 };
      request.body = { 
        password: '54321',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(updateAccountService, 'updateAccount')
        .resolves({
          code: 200,
          content: message,
        });
    });

    after(() => {
      updateAccountService.updateAccount.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await updateAccountController.updateAccount(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de sucesso', async () => {
      await updateAccountController.updateAccount(request, response);

      expect(response.json.calledWith(message)).to.be.equal(true);
    });
  }); 
});
