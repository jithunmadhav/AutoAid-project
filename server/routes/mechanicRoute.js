import express  from 'express';
import { mechanicLogin, mechanicSignup1, mechanicSignup2, verifyMechanicSignup } from '../controller/mechanicController.js'
const router=express.Router()

router.post('/signup',mechanicSignup1).post('/signupComplete',mechanicSignup2).post('/verifySignup',verifyMechanicSignup)
router.post('/login',mechanicLogin)

export default router