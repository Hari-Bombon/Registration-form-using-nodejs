const express = require('express');
const router = express.Router();
const cors = require('cors');
const authController = require('../API/controller/auth.controller');

router.use(
  cors({
    credentials: true,
    origin: 'https://localhost:3000',
  })
);

router.post('/register', authController.register);
router.post('/Forgotpassword', authController.Forgotpassword);
router.post('/Resetpassword', authController.Resetpassword);

module.exports = router;
