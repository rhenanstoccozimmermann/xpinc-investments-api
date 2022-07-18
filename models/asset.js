module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(65, 2)
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'Assets'
  });

  return Asset;
};
