module.exports = (sequelize, DataTypes) => {
  const AccountAsset = sequelize.define('AccountAsset', {
    accountId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    assetId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'AccountAssets',
  });

  AccountAsset.associate = (models) => {
    models.Account.belongsToMany(models.Asset, {
      as: 'assets',
      through: AccountAsset,
      foreignKey: 'accountId',
      otherKey: 'assetId',
    });
    models.Asset.belongsToMany(models.Account, {
      as: 'accounts',
      through: AccountAsset,
      foreignKey: 'assetId',
      otherKey: 'accountId',
    });
  };

  return AccountAsset;
};
