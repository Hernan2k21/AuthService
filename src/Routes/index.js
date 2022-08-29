const express = require('express');
const router = express.Router();
const {isAdmin} = require('../Middlewares')
const authRoutes = require('./auth')
const adminAuthRoutes = require('./admin')
const jwtRoutes = require('./jwtRoutes')
router.use('/auth', authRoutes)
router.use('/auth/admin', isAdmin, adminAuthRoutes)
router.use('/jwt', jwtRoutes)

module.exports = router;
