import express  from 'express';
import { mechanicLogin, mechanicLogout, mechanicSignup1, mechanicSignup2, mechResetpassword, mechVerifyResetOtp, scheduledDate, verifyMechanicSignup } from '../controller/mechanicController.js'
import upload from '../helper/multer.js';
import { mechCheckAuth } from '../middleware/mechAuth.js';
const router=express.Router()

router.get('/auth',mechCheckAuth)
router.post('/signup',mechanicSignup1).post('/signupComplete',mechanicSignup2).post('/verifySignup',upload.single('file'),verifyMechanicSignup)
router.post('/mechVerifyReset',mechVerifyResetOtp).post('/resetPassword',mechResetpassword)
router.post('/scheduleddate',scheduledDate)
router.post('/login',mechanicLogin)
router.get('/logout',mechanicLogout)

export default router