const db = require('../models');
const Showcase = db.Showcase;
const User = db.User;

// 获取所有玩家秀
exports.getAllShowcases = async (req, res) => {
  try {
    const showcases = await Showcase.findAll({
      include: {
        model: User,
        attributes: ['username']
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(showcases);
  } catch (error) {
    res.status(500).json({ message: '获取玩家秀失败', error: error.message });
  }
};

// 创建一个新的玩家秀
exports.createShowcase = async (req, res) => {
  try {
    const { comment, imageUrl, itemName } = req.body;
    if (!comment || !imageUrl || !itemName) {
      return res.status(400).json({ message: '缺少必要信息' });
    }
    const userId = req.user.id;

    // 1. 创建新的 showcase 记录
    const newShowcase = await Showcase.create({
      userId,
      comment,
      imageUrl,
      itemName
    });

    // 2. 查找刚刚创建的记录，并连同用户信息一起返回
    // 这是关键的修复步骤，确保返回的数据结构和 `getAllShowcases` 一致
    const result = await Showcase.findOne({
      where: { id: newShowcase.id },
      include: {
        model: User,
        attributes: ['username']
      }
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: '创建玩家秀失败', error: error.message });
  }
};
