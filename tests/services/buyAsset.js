const sinon = require('sinon');
const { expect } = require('chai');

const buyAssetService = require('../../services/buyAsset');
const { Asset, Account, AccountAsset } = require('../../models');

describe('Ao chamar o service buyAsset', () => {
  describe('quando o ativo informado não é encontrado na corretora', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 1;
    
    const code = 404;
    const message = 'O ativo informado não foi encontrado na corretora.';

    before(() => {
      sinon.stub(Asset, 'findByPk')
        .resolves(false);
      sinon.stub(Account, 'findByPk')
        .resolves();
    });

    after(() => {
      Asset.findByPk.restore();
      Account.findByPk.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando não há ativos suficientes na corretora para a compra', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 101;
    
    const code = 400;
    const message = 'Não há ativos suficientes na corretora para esta compra (ativos disponíveis: 100).';

    before(() => {
      sinon.stub(Asset, 'findByPk')
        .resolves({
          id: 1,
          ticker: 'BLAU3',
          price: 24.53,
          quantity: 100,
        });
      sinon.stub(Account, 'findByPk')
        .resolves();
    });

    after(() => {
      Asset.findByPk.restore();
      Account.findByPk.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando não há saldo suficiente na conta para a compra', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 10;
    
    const code = 400;
    const message = 'Não há saldo suficiente na conta para esta compra (saldo disponível: 100).';

    before(() => {
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
    });

    after(() => {
      Asset.findByPk.restore();
      Account.findByPk.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de erro', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('error');
      expect(response.error).to.have.a.property('code');
      expect(response.error).to.have.a.property('message');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);
  
      expect(response.error.code).to.be.equal(code);
      expect(response.error.message).to.be.equal(message);
    });
  });

  describe('quando a compra é efetuada com sucesso', async () => {
    const accountId = 1;
    const assetId = 1;
    const quantity = 1;

    const code = 201;
    const exampleAccountAsset = {
      accountId: 1,
      assetId: 1,
      quantity: 1,
    };

    before(() => {      
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
      sinon.stub(AccountAsset, 'findOne')
        .resolves(false);
      sinon.stub(AccountAsset, 'create')
        .resolves(exampleAccountAsset);
      sinon.stub(Asset, 'update')
        .resolves();
      sinon.stub(Account, 'update')
        .resolves();
    });

    after(() => {
      Asset.findByPk.restore();
      Account.findByPk.restore();
      AccountAsset.findOne.restore();
      AccountAsset.create.restore();
      Asset.update.restore();
      Account.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui as propriedades de sucesso', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);

      expect(response).to.have.a.property('code');
      expect(response).to.have.a.property('content');
    });

    it('tais propriedades possuem os valores corretos', async () => {
      const response = await buyAssetService.buyAsset(accountId, assetId, quantity);
  
      expect(response.code).to.be.equal(code);
      expect(response.content).to.deep.equal(exampleAccountAsset);
    });
  });
});
