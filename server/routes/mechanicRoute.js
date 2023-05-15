import express  from 'express';
import { mechanicLogin, mechanicSignup } from '../controller/mechanicController.js'
const router=express.Router()

router.post('/signup',mechanicSignup)
router.post('/login',mechanicLogin)

export default router