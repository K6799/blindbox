const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Showcase = sequelize.define('Showcase', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  blindbox_id: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT },
  images: { type: DataTypes.TEXT }, // 存储 JSON 字符串
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'showcases',
  timestamps: false,
});

module.exports = Showcase; 