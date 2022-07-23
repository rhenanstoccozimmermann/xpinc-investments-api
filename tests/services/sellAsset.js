const sinon = require('sinon');
const { expect } = require('chai');

const sellAssetService = require('../../services/sellAsset');
const { AccountAsset, Asset, Account } = require('../../models');

describe('Ao chamar o service sellAsset', () => {
  describe('quando o ativo informado não é encontrado na carteira', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 1;
    
    const code = 404;
    const message = 'O ativo informado não foi encontrado na carteira.';

    before(() => {
      sinon.stub(AccountAsset, 'findOne')
        .resolves(false);
    });

    after(() => {
      AccountAsset.findOne.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando não há ativos suficientes na carteira para a venda', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 10;
    
    const code = 400;
    const message = 'Não há ativos suficientes na carteira para esta venda (ativos disponíveis: 1).';

    before(() => {
      sinon.stub(AccountAsset, 'findOne')
        .resolves({
          accountId: 1,
          assetId: 1,
          quantity: 1,
        });
    });

    after(() => {
      AccountAsset.findOne.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });  

  describe('quando a venda de parte dos ativos é efetuada com sucesso', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 1;

    const code = 200;
    const exampleAccountAsset = {
      accountId: 1,
      assetId: 1,
      quantity: 9,
    };

    before(() => {
      sinon.stub(AccountAsset, 'findOne')
        .resolves({
          accountId: 1,
          assetId: 1,
          quantity: 9,
        });
      sinon.stub(Asset, 'findByPk')
        .resolves({
          id: 1,
          ticker: 'BLAU3',
          price: 24.53,
          quantity: 100,
        });
      sinon.stub(Account, 'findByPk')
        .resolves({
          id: 1,
          balance: 100,
        });
      sinon.stub(AccountAsset, 'update')
        .resolves();
      sinon.stub(Asset, 'update')
        .resolves();
      sinon.stub(Account, 'update')
        .resolves();
    });

    after(() => {
      AccountAsset.findOne.restore();
      Asset.findByPk.restore();
      Account.findByPk.restore();
      AccountAsset.update.restore();
      Asset.update.restore();
      Account.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);
  
      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccountAsset);
    });
  });

  describe('quando a venda de todos os ativos é efetuada com sucesso', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 1;

    const code = 200;
    const exampleAccountAsset = {
      accountId: 1,
      assetId: 1,
      quantity: 0,
    };

    before(() => {
      sinon.stub(AccountAsset, 'findOne')
        .resolves({
          accountId: 1,
          assetId: 1,
          quantity: 1,
        });
      sinon.stub(Asset, 'findByPk')
        .resolves({
          id: 1,
          ticker: 'BLAU3',
          price: 24.53,
          quantity: 100,
        });
      sinon.stub(Account, 'findByPk')
        .resolves({
          id: 1,
          balance: 100,
        });
      sinon.stub(AccountAsset, 'destroy')
        .resolves();
      sinon.stub(Asset, 'update')
        .resolves();
      sinon.stub(Account, 'update')
        .resolves();
    });

    after(() => {
      AccountAsset.findOne.restore();
      Asset.findByPk.restore();
      Account.findByPk.restore();
      AccountAsset.destroy.restore();
      Asset.update.restore();
      Account.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await sellAssetService.sellAsset(accountId, assetId, quantity);
  
      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccountAsset);
    });
  });
});
