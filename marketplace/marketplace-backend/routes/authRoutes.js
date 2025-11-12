// /routes/authRoutes.js
const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();

router.post('/registro', register);
// router.post('/login', login); // Se añade en el siguiente paso del sprint

module.exports = router;