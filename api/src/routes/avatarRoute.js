const express = require('express');
const router = express.Router();
const controller = require('../controllers/avatarController')


router.post('/', requireAuth, controller.upload);

module.exports = router;