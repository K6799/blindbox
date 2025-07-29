module.exports = {
  database: {
    dialect: 'sqlite',
    storage: './blindbox.sqlite' // SQLite 数据库将作为这个文件存储在 backend 目录下
  },
  jwtSecret: 'your_super_secret_jwt_key_that_is_long_and_secure'
};