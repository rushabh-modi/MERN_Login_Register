const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');

// router.post('/', authController.handleLogin);
router.route('/').post(loginLimiter, authController.handleLogin);

module.exports = router;
