const db = require('../models');
const { Op } = require('sequelize');
const BlindBox = db.BlindBox;
const User = db.User;
const Order = db.Order;
const DrawRecord = db.DrawRecord;

// 权重抽奖算法
const weightedDraw = (items) => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (const item of items) {
    if (random < item.weight) {
      return item;
    }
    random -= item.weight;
  }
};

// 获取所有盲盒列表
exports.getAllBlindBoxes = async (req, res) => {
  try {
    const blindBoxes = await BlindBox.findAll();
    res.json(blindBoxes);
  } catch (error) {
    res.status(500).json({ message: '获取盲盒列表失败', error: error.message });
  }
};

// 获取单个盲盒详情
exports.getBlindBoxById = async (req, res) => {
  try {
    const blindBox = await BlindBox.findByPk(req.params.id);
    if (!blindBox) {
      return res.status(404).json({ message: '盲盒未找到' });
    }
    res.json(blindBox);
  } catch (error) {
    res.status(500).json({ message: '获取盲盒详情失败', error: error.message });
  }
};

// 搜索盲盒
exports.searchBlindBoxes = async (req, res) => {
  try {
    const { query } = req.query;
    const blindBoxes = await BlindBox.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.json(blindBoxes);
  } catch (error) {
    res.status(500).json({ message: '搜索盲盒失败', error: error.message });
  }
};

// 抽盲盒
exports.drawBlindBox = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { blindBoxId } = req.body;
    const userId = req.user.id;

    const blindBox = await BlindBox.findByPk(blindBoxId, { transaction: t });
    const user = await User.findByPk(userId, { transaction: t });

    if (!blindBox) {
      await t.rollback();
      return res.status(404).json({ message: '盲盒未找到' });
    }

    const userBalance = parseFloat(user.balance);
    const boxPrice = parseFloat(blindBox.price);

    if (isNaN(userBalance) || userBalance < boxPrice) {
      await t.rollback();
      return res.status(400).json({ message: '余额不足或账户余额异常' });
    }

    // 扣除余额
    user.balance = userBalance - boxPrice;
    await user.save({ transaction: t });

    // 创建订单
    await Order.create({
      userId,
      blindBoxId,
      totalPrice: boxPrice,
    }, { transaction: t });

    // 【修复】将从数据库读取的 items 字符串解析为 JSON 数组
    const items = JSON.parse(blindBox.items);
    const drawnItem = weightedDraw(items);

    if (!drawnItem) {
      throw new Error('抽奖逻辑出错，未抽中任何物品');
    }

    // 创建抽奖记录
    const drawRecord = await DrawRecord.create({
      userId,
      blindBoxId,
      itemName: drawnItem.name,
      itemImage: drawnItem.image,
      rarity: drawnItem.rarity
    }, { transaction: t });

    await t.commit();

    res.json({
      message: '恭喜！抽中了！',
      drawnItem,
      recordId: drawRecord.id,
      newBalance: user.balance
    });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: '抽盒时发生错误', error: error.message });
  }
};

// (Admin) 创建盲盒
exports.createBlindBox = async (req, res) => {
  try {
    const { name, description, price, imageUrl, items } = req.body;
    if (!name || !price || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: '名称、价格和物品列表为必填项' });
    }
    const newBlindBox = await BlindBox.create({ name, description, price, imageUrl, items: JSON.stringify(items) });
    res.status(201).json(newBlindBox);
  } catch (error) {
    res.status(500).json({ message: '创建盲盒失败', error: error.message });
  }
};