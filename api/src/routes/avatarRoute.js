const express = require('express');
const router = express.Router();
const controller = require('../controllers/avatarController')
const { requireAuth } = require('../utils/auth.js')

router.post('/', requireAuth, controller.upload);

module.exports = router;