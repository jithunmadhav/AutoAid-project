const express=require('express')
const mechanicController = require('../controller/mechanicController')
const router=express.Router()

router.post('/mechanicSignup',mechanicController.mechanicSignup)
.post('/mechanicLogin',mechanicController.mechanicLogin)

module.exports=router;                    