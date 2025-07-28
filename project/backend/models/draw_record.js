const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const DrawRecord = sequelize.define('DrawRecord', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  blindbox_id: { type: DataTypes.INTEGER, allowNull: false },
  result: { type: DataTypes.STRING(255) },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'draw_records',
  timestamps: false,
});

module.exports = DrawRecord; 