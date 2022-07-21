module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticker: DataTypes.STRING,
    price: DataTypes.DECIMAL(65, 2),
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'Assets',
  });

  return Asset;
};
