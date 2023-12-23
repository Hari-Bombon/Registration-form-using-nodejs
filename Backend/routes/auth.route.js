const router = require('express').Router();
const authController=require('./../API/controller/auth.controller')


router.post('/register' , authController);

module.exports=router;