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
        imageUrl: 'http://localhost:5173/images/C5488114A6444C11FFADA9F3358B384C.jpg',
        items: JSON.stringify([
          { name: '火箭船长', rarity: 'N', image: 'http://localhost:5173/images/55C2957E9BAE8A604BEBCA4E4E062CF6.jpg', weight: 45 },
          { name: '星星探险家', rarity: 'N', image: 'http://localhost:5173/images/D8BA6EE3DB7D2E1002F2A0D27DB16BE1.jpg', weight: 45 },
          { name: '月球漫步者', rarity: 'R', image: 'http://localhost:5173/images/EA976E78C8EDD5B771DE8849D999A470.jpg', weight: 8 },
          { name: '银河守护者', rarity: 'SR', image: 'http://localhost:5173/images/76396AFC0B49ACF0C1C6A1F9C4FB1ADE.jpg', weight: 2 }
        ])
      },
      {
        name: '海洋奇缘系列',
        description: '海洋中的奥秘探索。',
        price: 49.00,
        imageUrl: 'http://localhost:5173/images/BFD011C3BE4CACE417C0D33BFF8BF88A.jpg',
        items: JSON.stringify([
          { name: '珊瑚守护者', rarity: 'N', image: 'http://localhost:5173/images/4B275E350363C8488BAFEA4F36A6D89E.jpg', weight: 40 },
          { name: '潮汐歌者', rarity: 'R', image: 'http://localhost:5173/images/531BC8CAA75C170945BECF1245A4D9E6.jpg', weight: 40 },
          { name: '探海寻宝者', rarity: 'SSR', image: 'http://localhost:5173/images/64C1A93B1FBE6E77EA2DF1166D9CC355.jpg', weight: 15 }
        ])
      },
      {
        name: '神秘森林系列',
        description: '与森林中的小精灵们一起玩耍。',
        price: 69.00,
        imageUrl: 'http://localhost:5173/images/633C63990B305085122BCB1B56310BF7.jpg',
        items: JSON.stringify([
          { name: '蘑菇信使', rarity: 'N', image: 'http://localhost:5173/images/80BB41530E790D5FD3296F49B5062394.jpg', weight: 50 },
          { name: '花仙子', rarity: 'N', image: 'http://localhost:5173/images/310B815B0928CECD12A3D923746DFDDD.jpg', weight: 30 },
          { name: '森林猎人', rarity: 'R', image: 'http://localhost:5173/images/F19140E9C742CD1E367B82E2D6F8333B.jpg', weight: 19 },
          { name: '树林守护者（隐藏款）', rarity: 'SSR', image: 'http://localhost:5173/images/27C6547ABC4877BB213CF38CFC13DEEA.jpg', weight: 1 }
        ])
      },
      {
        name: '王者装备小手办', // 您的系列名称
        description: '游戏中常戴的痛苦面具手办长什么样', // 您的系列描述
        price: 79.00, // 定价
        imageUrl: 'http://localhost:5173/images/屏幕截图 2025-07-30 191615.png', // 系列主图的URL
        items: JSON.stringify([
          // 这个系列包含的所有款式
          { name: '暗影战斧', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210514.png', weight: 45 },
          { name: '制裁之刃', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210515.png', weight: 45 },
          { name: '无尽战刃', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210516.png', weight: 9 },
          { name: '痛苦面具', rarity: 'SSR', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210517.png', weight: 1 },
          { name: '虚无法杖', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210518.png', weight: 45 },
          { name: '极影', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210519.png', weight: 9 },
          { name: '近卫荣耀', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 210520.png', weight: 1 }
        ])
      },{
        name: '三角洲红色物品系列', // 您的系列名称
        description: '哈吉米得吃,嘻嘻', // 您的系列描述
        price: 79.00, // 定价
        imageUrl: 'http://localhost:5173/images/屏幕截图 2025-07-30 191325.png', // 系列主图的URL
        drawSoundUrl: '/sounds/哈基米音乐-滑雪大冒险_爱给网_aigei_com.mp3',
        items: JSON.stringify([
          // 这个系列包含的所有款式
          { name: '刀片服务器', rarity: 'SSR', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205800.png', weight: 45 },
          { name: '超算单元', rarity: 'SSR', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205801.png', weight: 45 },
          { name: '呼吸机', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205802.png', weight: 9 },
          { name: '化石', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205803.png', weight: 1 },
          { name: '名贵机械表', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205804.png', weight: 1 },
          { name: '军用炮弹', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205805.png', weight: 1 },
          { name: '黄金瞪羚', rarity: 'R', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205806.png', weight: 1 },
          { name: '显卡', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205807.png', weight: 1 },
          { name: '金条', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205808.png', weight: 1 },
          { name: '香槟', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205809.png', weight: 1 },
          { name: '实验数据', rarity: 'N', image: 'http://localhost:5173/images/屏幕截图 2025-07-29 205810.png', weight: 1 }
        ])
      }
    ]);
    console.log('Initial blind boxes created.');
  }
}
