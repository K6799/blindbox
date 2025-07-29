module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: '用户名已存在'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: '邮箱已被注册'
      },
      validate: {
        isEmail: {
          msg: '请输入有效的邮箱地址'
        }
      }
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 99999.00 // 初始给一些余额用于测试
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user' // 'user' or 'admin'
    }
  });
  return User;
};
