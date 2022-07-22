const sinon = require('sinon');
const { expect } = require('chai');

const controllers = require('../../controllers/login');
const { Client } = require('../../models');
const auth = require('../../middlewares/generateToken');

describe('Ao chamar o controller login', () => {
  describe('quando o código da conta e a senha não são informados', async () => {
    const response = {};
    const request = {};

    const message = 'O código da conta e a senha são obrigatórios.';

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(); 
        
      sinon.stub(Client, 'findOne')
        .resolves(false);
    });

    after(() => {
      Client.findOne.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await controllers.login(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await controllers.login(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando o cliente não é encontrado', async () => {
    const response = {};
    const request = {};

    const message = 'Campos inválidos.';

    before(() => {
      request.body = { accountId: 20, password: '54321' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(Client, 'findOne')
        .resolves(false);
    });

    after(() => {
      Client.findOne.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await controllers.login(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await controllers.login(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando o cliente é encontrado', async () => {
    const response = {};
    const request = {};

    const token = 'XXXXX';

    before(() => {
      request.body = { accountId: 1, password: '12345' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(Client, 'findOne')
        .resolves(true);
      sinon.stub(auth, 'generateToken')
        .returns(token);
    });

    after(() => {
      Client.findOne.restore();
      auth.generateToken.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await controllers.login(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o token', async () => {
      await controllers.login(request, response);

      expect(response.json.calledWith({ token })).to.be.equal(true);
    });
  });
});
