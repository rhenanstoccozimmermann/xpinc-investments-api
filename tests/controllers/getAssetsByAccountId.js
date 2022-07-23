const sinon = require('sinon');
const { expect } = require('chai');

const getAssetsByAccountIdController = require('../../controllers/getAssetsByAccountId');
const getAssetsByAccountIdService = require('../../services/getAssetsByAccountId');

describe('Ao chamar o controller getAssetsByAccountId', () => {
  describe('quando não são encontrados ativos na carteira', async () => {
    const response = {};
    const request = {};

    const message = 'Não foram encontrados ativos na carteira.';

    before(() => {
      request.params = { id: 20 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getAssetsByAccountIdService, 'getAssetsByAccountId')
        .resolves({
          error: {
            code: 404,
            message,
          },
        });
    });

    after(() => {
      getAssetsByAccountIdService.getAssetsByAccountId.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await getAssetsByAccountIdController.getAssetsByAccountId(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await getAssetsByAccountIdController.getAssetsByAccountId(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando ocorre algum erro desconhecido', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getAssetsByAccountIdService, 'getAssetsByAccountId')
        .resolves(false);
    });

    after(() => {
      getAssetsByAccountIdService.getAssetsByAccountId.restore();
    });

    it('é chamado o status com o código 500', async () => {
      await getAssetsByAccountIdController.getAssetsByAccountId(request, response);

      expect(response.status.calledWith(500)).to.be.equal(true);
    }); 
  });

  describe('quando os ativos são retornados com sucesso', async () => {
    const response = {};
    const request = {};  

    const exampleAssets = [{
      accountId: 1,
      assetId: 1,
      ticker: 'BLAU3',
      price: 24.53,
      quantity: 1,
    }];

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getAssetsByAccountIdService, 'getAssetsByAccountId')
        .resolves({
          code: 200,
          content: exampleAssets,
        });
    });

    after(() => {
      getAssetsByAccountIdService.getAssetsByAccountId.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await getAssetsByAccountIdController.getAssetsByAccountId(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os dados dos ativos', async () => {
      await getAssetsByAccountIdController.getAssetsByAccountId(request, response);

      expect(response.json.calledWith(exampleAssets)).to.be.equal(true);
    });
  }); 
});
