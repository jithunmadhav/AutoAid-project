import express  from 'express';
import { customerDetails, getEmergencyApp, getscheduledApp, updateStatus } from '../controller/appointmentController.js';
import { mechanicLogin, mechanicLogout, mechanicSignup1, mechanicSignup2, mechResetpassword, mechVerifyResetOtp, scheduledDate, verifyMechanicSignup } from '../controller/mechanicController.js'
import upload from '../helper/multer.js';
import { mechCheckAuth } from '../middleware/mechAuth.js';
const router=express.Router()

router.get('/auth',mechCheckAuth)
router.post('/signup',mechanicSignup1).post('/signupComplete',mechanicSignup2).post('/verifySignup',upload.single('file'),verifyMechanicSignup)
router.post('/mechVerifyReset',mechVerifyResetOtp).post('/resetPassword',mechResetpassword)
router.post('/scheduleddate',scheduledDate)
router.get('/getscheduledApp',getscheduledApp).get('/getEmergencyApp',getEmergencyApp)
router.get('/customerDetails/:id',customerDetails)
router.patch('/updatestatus',updateStatus)
router.post('/login',mechanicLogin)
router.get('/logout',mechanicLogout)

export default router