// Sequelize 配置文件
const { Sequelize } = require('sequelize');

// 请根据实际情况修改数据库连接参数
const sequelize = new Sequelize('blindbox_db', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // 生产环境建议关闭
});

module.exports = sequelize; 