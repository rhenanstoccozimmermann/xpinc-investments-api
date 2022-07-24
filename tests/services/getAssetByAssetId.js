const sinon = require('sinon');
const { expect } = require('chai');

const getAssetByAssetIdService = require('../../services/getAssetByAssetId');
const { Asset } = require('../../models');

describe('Ao chamar o service getAssetByAssetId', () => {
  describe('quando as informações obrigatórias não são passadas', async () => {
    const assetId = undefined;
    
    const code = 400;
    const message = 'O código do ativo é obrigatório.';    

    it('retorna um objeto de erro', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando o ativo informado não é encontrado', async () => {
    const assetId = 20;
    
    const code = 404;
    const message = 'O ativo informado não foi encontrado na corretora.';

    before(() => {
      sinon.stub(Asset, 'findByPk')
        .resolves(false);
    });

    after(() => {
      Asset.findByPk.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando o ativo é retornado com sucesso', async () => {
    const assetId = 1;
    
    const code = 200;
    const exampleAsset = {
      assetId: 1,
      ticker: 'BLAU3',
      price: 24.53,
      quantity: 100,
    };

    before(() => {      
      sinon.stub(Asset, 'findByPk')
        .resolves({
          id: 1,
          ticker: 'BLAU3',
          price: 24.53,
          quantity: 100,
        });
    });

    after(() => {
      Asset.findByPk.restore();
    });

    it('retorna um objeto', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getAssetByAssetIdService.getAssetByAssetId(assetId);

      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAsset);
    });
  });
});
