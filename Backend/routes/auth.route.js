const router = require('express').Router();
const express = require('express');
const authController=require('./../API/controller/auth.controller')


router.post('/register' , authController);

module.exports=router;