module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    identityCard: DataTypes.STRING,
    password: DataTypes.STRING,
    accountId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'Clients',
  });

  Client.associate = (models) => {
    Client.belongsTo(models.Account,
      { foreignKey: 'accountId', as: 'accounts' });
  };

  return Client;
};
