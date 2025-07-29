const db = require('../models');
const Order = db.Order;
const BlindBox = db.BlindBox;

// 获取用户的抽奖记录
exports.getDrawHistory = async (req, res) => {
  try {
    const history = await db.DrawRecord.findAll({
      where: { userId: req.user.id },
      include: [{ model: BlindBox, attributes: ['name'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: '获取抽奖记录失败', error: error.message });
  }
};
