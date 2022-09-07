const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')

router.post('/blacklist-refresh/user', authController.blacklistRefreshToken)
module.exports = router;
