const { Sequelize } = require('sequelize');
const config = require('../config').database;

// 使用 SQLite 的配置来初始化 Sequelize
const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage,
  logging: false // 关闭日志以保持控制台清洁
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 引入模型 (这部分保持不变)
db.User = require('./user')(sequelize, Sequelize);
db.BlindBox = require('./blindbox')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);
db.DrawRecord = require('./draw_record')(sequelize, Sequelize);
db.Showcase = require('./showcase')(sequelize, Sequelize);

// 定义模型之间的关联关系 (这部分保持不变)
// 用户与订单 (一对多)
db.User.hasMany(db.Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

// 用户与抽盒记录 (一对多)
db.User.hasMany(db.DrawRecord, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.DrawRecord.belongsTo(db.User, { foreignKey: 'userId' });

// 用户与玩家秀 (一对多)
db.User.hasMany(db.Showcase, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Showcase.belongsTo(db.User, { foreignKey: 'userId' });

// 盲盒与抽盒记录 (一对多)
db.BlindBox.hasMany(db.DrawRecord, { foreignKey: 'blindBoxId' });
db.DrawRecord.belongsTo(db.BlindBox, { foreignKey: 'blindBoxId' });

// 订单与盲盒
db.Order.belongsTo(db.BlindBox, { foreignKey: 'blindBoxId' });
db.BlindBox.hasMany(db.Order, { foreignKey: 'blindBoxId' });


module.exports = db;
