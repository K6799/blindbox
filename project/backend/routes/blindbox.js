const express = require('express');
const router = express.Router();
const blindboxController = require('../controllers/blindboxController');
const { auth, isAdmin } = require('../middleware/auth');

router.get('/', blindboxController.getAllBlindBoxes);
router.get('/search', blindboxController.searchBlindBoxes);
router.get('/:id', blindboxController.getBlindBoxById);
router.post('/draw', auth, blindboxController.drawBlindBox);
router.post('/', auth, isAdmin, blindboxController.createBlindBox); // 只有管理员能创建

module.exports = router;
