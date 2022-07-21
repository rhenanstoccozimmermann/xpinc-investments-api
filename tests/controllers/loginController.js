const sinon = require('sinon');
const { expect } = require('chai');

const login = require('../../controllers/login');

describe('Ao chamar o controller login', () => {
  describe('quando o id e a senha não são encontrados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();  
    });  

    it('é chamado o status com o código 400', async () => {
      await login(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "O id e a senha são obrigatórios."', async () => {
      await login(request, response);

      expect(response.json.calledWith({ message: 'O id e a senha são obrigatórios.' })).to.be.equal(true);
    });

  });

  describe('quando o cliente não é encontrado', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { id: 20, password: '54321' };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();  
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
});
