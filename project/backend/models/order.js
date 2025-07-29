module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'completed'
    }
    // userId and blindBoxId are added via associations
  });
  return Order;
};
