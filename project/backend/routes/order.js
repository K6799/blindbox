const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.list);
router.get('/:id', orderController.detail);
router.post('/', orderController.create);
router.put('/:id', orderController.update);

module.exports = router; 