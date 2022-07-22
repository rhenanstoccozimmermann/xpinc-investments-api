const sinon = require('sinon');
const { expect } = require('chai');

const getAssetByAssetIdController = require('../../controllers/getAssetByAssetId');
const getAssetByAssetIdService = require('../../services/getAssetByAssetId');

describe('Ao chamar o controller getAssetByAssetId', () => {
  describe('quando a conta informada não é encontrada', async () => {
    const response = {};
    const request = {};

    const message = 'O ativo informado não foi encontrado na corretora.';

    before(() => {
      request.params = { id: 20 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getAssetByAssetIdService, 'getAssetByAssetId')
        .resolves({
          error: {
            code: 404,
            message,
          },
        });
    });

    after(() => {
      getAssetByAssetIdService.getAssetByAssetId.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await getAssetByAssetIdController.getAssetByAssetId(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem de erro', async () => {
      await getAssetByAssetIdController.getAssetByAssetId(request, response);

      expect(response.json.calledWith({ message })).to.be.equal(true);
    });
  });

  describe('quando o ativo é retornado com sucesso', async () => {
    const response = {};
    const request = {};  

    const exampleAsset = {
      assetId: 1,
      ticker: 'BLAU3',
      price: 24.53,
      quantity: 1,
    };

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(getAssetByAssetIdService, 'getAssetByAssetId')
        .resolves({
          code: 200,
          content: exampleAsset,
        });
    });

    after(() => {
      getAssetByAssetIdService.getAssetByAssetId.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await getAssetByAssetIdController.getAssetByAssetId(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com os dados do ativo', async () => {
      await getAssetByAssetIdController.getAssetByAssetId(request, response);

      expect(response.json.calledWith(exampleAsset)).to.be.equal(true);
    });
  }); 
});
