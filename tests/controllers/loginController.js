const sinon = require('sinon');
const { expect } = require('chai');

const login = require('../../controllers/login');
const { Client } = require('../../models');
const auth = require('../../middlewares/generateToken');

describe('Ao chamar o controller login', () => {
  describe('quando o código da conta e a senha não são encontrados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(); 
        
      sinon.stub(Client, 'findOne')
        .resolves(null);
    });

    after(() => {
      Client.findOne.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await login(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "O código da conta e a senha são obrigatórios."', async () => {
      await login(request, response);

      expect(response.json.calledWith({ message: 'O código da conta e a senha são obrigatórios.' })).to.be.equal(true);
    });

  });

  describe('quando o cliente não é encontrado', async () => {
    const response = {};
    const request = {};

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
      await login(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Campos inválidos."', async () => {
      await login(request, response);

      expect(response.json.calledWith({ message: 'Campos inválidos.' })).to.be.equal(true);
    });

  });

  describe('quando o cliente é encontrado', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { accountId: 1, password: '12345' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(Client, 'findOne')
        .resolves(true);
      sinon.stub(auth, 'generateToken')
        .returns('XXXXX');
    });

    after(() => {
      Client.findOne.restore();
      auth.generateToken.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await login(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o token "XXXXX"', async () => {
      await login(request, response);

      expect(response.json.calledWith({ token: 'XXXXX' })).to.be.equal(true);
    });

  });
});
