const sequelize = require('../config');
const User = require('./user');
const BlindBox = require('./blindbox');
const Order = require('./order');
const DrawRecord = require('./draw_record');
const Showcase = require('./showcase');

// 关联关系
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(DrawRecord, { foreignKey: 'user_id' });
DrawRecord.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Showcase, { foreignKey: 'user_id' });
Showcase.belongsTo(User, { foreignKey: 'user_id' });

BlindBox.hasMany(Order, { foreignKey: 'blindbox_id' });
Order.belongsTo(BlindBox, { foreignKey: 'blindbox_id' });

BlindBox.hasMany(DrawRecord, { foreignKey: 'blindbox_id' });
DrawRecord.belongsTo(BlindBox, { foreignKey: 'blindbox_id' });

BlindBox.hasMany(Showcase, { foreignKey: 'blindbox_id' });
Showcase.belongsTo(BlindBox, { foreignKey: 'blindbox_id' });

// 一键同步建表
async function syncModels() {
  await sequelize.sync({ alter: true });
  console.log('All models were synchronized successfully.');
}

module.exports = {
  sequelize,
  User,
  BlindBox,
  Order,
  DrawRecord,
  Showcase,
  syncModels,
}; 