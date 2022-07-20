module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: DataTypes.DECIMAL(65, 2),
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'Accounts',
  });

  Account.associate = (models) => {
    Account.hasOne(models.Client,
      { foreignKey: 'id', as: 'clients' });
  };

  return Account;
};
