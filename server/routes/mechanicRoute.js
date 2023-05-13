import express  from 'express';
import { mechanicLogin, mechanicSignup } from '../controller/mechanicController.js'
const router=express.Router()

router.post('/mechanicSignup',mechanicSignup)
router.post('/mechanicLogin',mechanicLogin)

export default router