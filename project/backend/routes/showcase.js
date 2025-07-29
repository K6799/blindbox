const express = require('express');
const router = express.Router();
const showcaseController = require('../controllers/showcaseController');
const { auth } = require('../middleware/auth');

router.get('/', showcaseController.getAllShowcases);
router.post('/', auth, showcaseController.createShowcase);

module.exports = router;
