const sinon = require('sinon');
const { expect } = require('chai');

const sellAssetController = require('../../controllers/sellAsset');
const sellAssetService = require('../../services/sellAsset');

describe('Ao chamar o controller sellAsset', () => {
  describe('quando o ativo informado não é encontrado na carteira', async () => {
    const response = {};
    const request = {};

    const message = 'O ativo informado não foi encontrado na carteira.';

    before(() => {
      request.body = {
        accountId: 1,
        assetId: 20,
        quantity: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(sellAssetService, 'sellAsset')
        .resolves({
          error: {
            code: 404,
            message,
          },
        });
    });

    after(() => {
      sellAssetService.sellAsset.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await sellAssetController.sellAsset(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await sellAssetController.sellAsset(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando ocorre algum erro desconhecido', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        accountId: 1,
        assetId: 1,
        quantity: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(sellAssetService, 'sellAsset')
        .resolves(false);
    });

    after(() => {
      sellAssetService.sellAsset.restore();
    });

    it('é chamado o status com o código 500', async () => {
      await sellAssetController.sellAsset(request, response);

      expect(response.status.calledWith(500)).to.be.equal(true);
    }); 
  });

  describe('quando a venda é efetuada com sucesso', async () => {
    const response = {};
    const request = {};  

    const exampleAccountAsset = {
      accountId: 1,
      assetId: 1,
      quantity: 1,
    };

    before(() => {
      request.body = {
        accountId: 1,
        assetId: 1,
        quantity: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(sellAssetService, 'sellAsset')
        .resolves({
          code: 200,
          content: exampleAccountAsset,
        });
    });

    after(() => {
      sellAssetService.sellAsset.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await sellAssetController.sellAsset(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os dados da venda', async () => {
      await sellAssetController.sellAsset(request, response);

      expect(response.json.calledWith(exampleAccountAsset)).to.be.equal(true);
    });
  }); 
});
