const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  blindbox_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.TINYINT, defaultValue: 0 },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order; 