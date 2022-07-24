const sinon = require('sinon');
const { expect } = require('chai');

const getAssetsByAccountIdService = require('../../services/getAssetsByAccountId');
const { Account, Asset } = require('../../models');

describe('Ao chamar o service getAssetsByAccountId', () => {
  describe('quando as informações obrigatórias não são passadas', async () => {
    const accountId = undefined;
    
    const code = 400;
    const message = 'O código da conta é obrigatório.';    

    it('retorna um objeto de erro', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando não são encontrados ativos na carteira', async () => {
    const accountId = 1;
    
    const code = 404;
    const message = 'Não foram encontrados ativos na carteira.';

    before(() => {
      sinon.stub(Account, 'findOne')
        .resolves({
          assets: [],
        });
    });

    after(() => {
      Account.findOne.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando os ativos são retornados com sucesso', async () => {
    const accountId = 1;
    
    const code = 200;
    const exampleAccountAsset = [{
      accountId: 1,
      assetId: 1,
      ticker: 'BLAU3',
      price: 24.53,
      quantity: 1,
    }];

    before(() => {      
      sinon.stub(Account, 'findOne')
        .resolves({
          assets: [{
            id: 1,
            ticker: 'BLAU3',
            price: 24.53,
            AccountAsset: { quantity: 1 },
          }],
        });
    });

    after(() => {
      Account.findOne.restore();
    });

    it('retorna um objeto', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await getAssetsByAccountIdService.getAssetsByAccountId(accountId);

      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccountAsset);
    });
  });
});
