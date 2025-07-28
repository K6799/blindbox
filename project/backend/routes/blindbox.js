const express = require('express');
const router = express.Router();
const blindboxController = require('../controllers/blindboxController');

router.get('/', blindboxController.list);
router.get('/:id', blindboxController.detail);
router.post('/', blindboxController.create);
router.put('/:id', blindboxController.update);
router.delete('/:id', blindboxController.remove);
router.post('/:id/draw', blindboxController.draw);

module.exports = router; 