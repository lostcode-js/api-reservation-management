const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/send-verification/:email', controller.sendVerification);
router.post('/verify-email', controller.verify);
router.post('/recovery-password/:email', controller.recoveryPassword);
router.post('/change-password', controller.changePassword);

module.exports = router;