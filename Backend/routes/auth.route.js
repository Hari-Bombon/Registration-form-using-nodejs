const router = require('express').Router();
const cors = require('cors');
const authController = require('./../API/controller/auth.controller');

router.use(
  cors({
    credentials: true,
    origin: 'https://localhost:3001',
  })
);

router.get('/', authController.login); // Assuming login is a function in authController
router.post('/register', authController.register);

module.exports = router;
