const sinon = require('sinon');
const { expect } = require('chai');

const buyAssetController = require('../../controllers/buyAsset');
const buyAssetService = require('../../services/buyAsset');

describe('Ao chamar o controller buyAsset', () => {
  describe('quando o ativo informado não é encontrado na corretora', async () => {
    const response = {};
    const request = {};

    const message = 'O ativo informado não foi encontrado na corretora.';

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

      sinon.stub(buyAssetService, 'buyAsset')
        .resolves({
          error: {
            code: 404,
            message,
          },
        });
    });

    after(() => {
      buyAssetService.buyAsset.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await buyAssetController.buyAsset(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await buyAssetController.buyAsset(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando a compra é efetuada com sucesso', async () => {
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

      sinon.stub(buyAssetService, 'buyAsset')
        .resolves({
          code: 201,
          content: exampleAccountAsset,
        });
    });

    after(() => {
      buyAssetService.buyAsset.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await buyAssetController.buyAsset(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com os dados da compra', async () => {
      await buyAssetController.buyAsset(request, response);

      expect(response.json.calledWith(exampleAccountAsset)).to.be.equal(true);
    });
  }); 
});
