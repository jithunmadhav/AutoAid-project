const express=require('express')
const adminController = require('../controller/adminController')
const router=express.Router()

router.post('/adminLogin',adminController.adminLogin)
.get('/getMechanic',adminController.getMechanic)
module.exports=router





