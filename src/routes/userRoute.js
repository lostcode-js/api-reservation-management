const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')
const { requireAuth } = require('../utils/auth.js')

router.get('/', requireAuth, controller.get);
router.get('/:_id', requireAuth, controller.getById);
router.post('/', requireAuth, controller.post);
router.put('/:_id', requireAuth, controller.put);
router.delete('/:_id', requireAuth, controller.delete);

module.exports = router;