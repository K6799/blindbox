const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth } = require('../middleware/auth');

// 注意：原有的getUserOrders已合并到getDrawHistory中，因为逻辑更贴近
router.get('/history', auth, orderController.getDrawHistory);

module.exports = router;
