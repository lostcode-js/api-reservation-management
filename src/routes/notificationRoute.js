const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController')
const { requireAuth } = require('../utils/auth.js')

router.get('/', requireAuth, controller.get);
router.get('/:_id', requireAuth, controller.getById);
router.post('/', requireAuth, controller.post);
router.put('/:_id', requireAuth, controller.put);
router.delete('/:_id', requireAuth, controller.delete);
router.post('/read/:_id', requireAuth, controller.read);
router.post('/read-all', requireAuth, controller.readAll);

module.exports = router;