const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { syncModels } = require('./models');
const userRouter = require('./routes/user');
const blindboxRouter = require('./routes/blindbox');
const orderRouter = require('./routes/order');
const showcaseRouter = require('./routes/showcase');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 路由占位
app.get('/', (req, res) => {
  res.send('Blindbox API running!');
});

// TODO: 挂载各功能模块路由
app.use('/api/user', userRouter);
app.use('/api/blindboxes', blindboxRouter);
app.use('/api/orders', orderRouter);
app.use('/api/showcases', showcaseRouter);

// 启动服务前同步数据库
syncModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}); 