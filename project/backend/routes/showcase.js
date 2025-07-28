const express = require('express');
const router = express.Router();
const showcaseController = require('../controllers/showcaseController');

router.get('/', showcaseController.list);
router.get('/:id', showcaseController.detail);
router.post('/', showcaseController.create);

module.exports = router; 