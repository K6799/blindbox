const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/user');
const blindboxRoutes = require('./routes/blindbox');
const orderRoutes = require('./routes/order');
const showcaseRoutes = require('./routes/showcase');

app.use('/api/users', userRoutes);
app.use('/api/blindboxes', blindboxRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/showcases', showcaseRoutes);

// 数据库同步
db.sequelize.sync({ force: true }).then(() => { // 使用 force: true 在开发中清空并重建表
  console.log('Database synced');
  initialData();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 添加初始数据
async function initialData() {
  const count = await db.BlindBox.count();
  if (count === 0) {
    await db.BlindBox.bulkCreate([
      {
        name: '太空奇遇系列',
        description: '探索宇宙的奥秘，与可爱的宇航员一起冒险。',
        price: 59.00,
        imageUrl: 'https://placehold.co/400x400/7B68EE/FFFFFF?text=太空系列',
        items: JSON.stringify([
          { name: '火箭船长', rarity: 'N', image: 'https://placehold.co/200x200/cccccc/000000?text=火箭船长', weight: 45 },
          { name: '星星探险家', rarity: 'N', image: 'https://placehold.co/200x200/ADD8E6/000000?text=星星探险家', weight: 45 },
          { name: '月球漫步者', rarity: 'R', image: 'https://placehold.co/200x200/F0E68C/000000?text=月球漫步者', weight: 8 },
          { name: '银河守护者', rarity: 'SR', image: 'https://placehold.co/200x200/98FB98/000000?text=银河守护者', weight: 2 }
        ])
      },
      {
        name: '梦幻甜品系列',
        description: '沉浸在甜蜜的世界里，每一款都是味蕾的盛宴。',
        price: 49.00,
        imageUrl: 'https://placehold.co/400x400/FFB6C1/FFFFFF?text=甜品系列',
        items: JSON.stringify([
          { name: '草莓蛋糕', rarity: 'N', image: 'https://placehold.co/200x200/FF69B4/000000?text=草莓蛋糕', weight: 40 },
          { name: '巧克力泡芙', rarity: 'N', image: 'https://placehold.co/200x200/D2691E/FFFFFF?text=巧克力泡芙', weight: 40 },
          { name: '抹茶冰淇淋', rarity: 'R', image: 'https://placehold.co/200x200/3CB371/FFFFFF?text=抹茶冰淇淋', weight: 15 },
          { name: '彩虹马卡龙（隐藏款）', rarity: 'SSR', image: 'https://placehold.co/200x200/EE82EE/000000?text=彩虹马卡龙', weight: 5 }
        ])
      },
      {
        name: '神秘森林系列',
        description: '与森林中的小精灵们一起玩耍。',
        price: 69.00,
        imageUrl: 'https://placehold.co/400x400/228B22/FFFFFF?text=森林系列',
        items: JSON.stringify([
          { name: '蘑菇宝宝', rarity: 'N', image: 'https://placehold.co/200x200/FF6347/FFFFFF?text=蘑菇宝宝', weight: 50 },
          { name: '露珠仙子', rarity: 'N', image: 'https://placehold.co/200x200/87CEEB/000000?text=露珠仙子', weight: 30 },
          { name: '树懒长老', rarity: 'R', image: 'https://placehold.co/200x200/A0522D/FFFFFF?text=树懒长老', weight: 19 },
          { name: '森林之王（隐藏款）', rarity: 'SSR', image: 'https://placehold.co/200x200/FFD700/000000?text=森林之王', weight: 1 }
        ])
      },
      {
        name: '王者装备小手办', // 您的系列名称
        description: '游戏中常戴的痛苦面具手办长什么样', // 您的系列描述
        price: 79.00, // 定价
        imageUrl: 'https://placehold.co/400x400/3498DB/FFFFFF?text=奇幻生物', // 系列主图的URL
        items: JSON.stringify([
          // 这个系列包含的所有款式
          { name: '森之精灵', rarity: 'N', image: 'https://placehold.co/200x200/2ECC71/FFFFFF?text=精灵', weight: 45 },
          { name: '地底矮人', rarity: 'N', image: 'https://placehold.co/200x200/95A5A6/FFFFFF?text=矮人', weight: 45 },
          { name: '烈焰幼龙', rarity: 'R', image: 'https://placehold.co/200x200/E74C3C/FFFFFF?text=幼龙', weight: 9 },
          { name: '圣光麒麟（隐藏款）', rarity: 'SSR', image: 'https://placehold.co/200x200/F1C40F/000000?text=麒麟', weight: 1 }
        ])
      },{
        name: '三角洲红色物品系列', // 您的系列名称
        description: '哈吉米得吃', // 您的系列描述
        price: 79.00, // 定价
        imageUrl: 'https://placehold.co/400x400/3498DB/FFFFFF?text=奇幻生物', // 系列主图的URL
        items: JSON.stringify([
          // 这个系列包含的所有款式
          { name: '森之精灵', rarity: 'N', image: 'https://placehold.co/200x200/2ECC71/FFFFFF?text=精灵', weight: 45 },
          { name: '地底矮人', rarity: 'N', image: 'https://placehold.co/200x200/95A5A6/FFFFFF?text=矮人', weight: 45 },
          { name: '烈焰幼龙', rarity: 'R', image: 'https://placehold.co/200x200/E74C3C/FFFFFF?text=幼龙', weight: 9 },
          { name: '圣光麒麟（隐藏款）', rarity: 'SSR', image: 'https://placehold.co/200x200/F1C40F/000000?text=麒麟', weight: 1 }
        ])
      }
    ]);
    console.log('Initial blind boxes created.');
  }
}
