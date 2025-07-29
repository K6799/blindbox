const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const db = require('../models');
const User = db.User;

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: '需要认证Token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        User.findByPk(decoded.id).then(user => {
            if (!user) {
                return res.status(404).json({ message: '用户未找到' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: '无效或过期的Token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: '需要管理员权限' });
    }
};

module.exports = { auth, isAdmin };
