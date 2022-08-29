
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')

router.post('/verify', authController.verifyToken)

module.exports = router;


