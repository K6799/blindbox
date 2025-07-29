const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// 用户注册
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: '所有字段均为必填项' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      balance: 9999.00 // 您可以在这里设置想要的初始金额
    });

    res.status(201).json({ message: '用户注册成功', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: '注册失败', error: error.errors ? error.errors[0].message : error.message });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '密码错误' });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '24h' });

    res.json({
      message: '登录成功',
      token,
      // 【修复】在这里添加了 balance: user.balance，确保余额信息被发送到前端
      user: { id: user.id, username: user.username, email: user.email, role: user.role, balance: user.balance }
    });
  } catch (error) {
    res.status(500).json({ message: '登录失败', error: error.message });
  }
};

// 获取用户个人资料
exports.getProfile = async (req, res) => {
  // req.user is attached by the auth middleware
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    balance: req.user.balance,
    role: req.user.role
  });
};
