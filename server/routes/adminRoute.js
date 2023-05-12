const express=require('express')
const adminController = require('../controller/adminController')
const router=express.Router()

router.post('/adminSignup',adminController.adminSignup)
module.exports=router





