import express  from 'express';
import { customerDetails, getEmergencyApp, getscheduledApp, updateStatus } from '../controller/appointmentController.js';
import { mechanicLogin, mechanicLogout, mechanicSignup1, mechanicSignup2, mechResetpassword, mechVerifyResetOtp, scheduledDate, updateProfile, verifyMechanicSignup } from '../controller/mechanicController.js'
import { allPaymentRequest, paymentRequest } from '../controller/paymentController.js';
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
router.patch('/updateProfile',updateProfile)
router.get('/paymentrequest',allPaymentRequest).post('/paymentrequest',paymentRequest)
router.post('/login',mechanicLogin)
router.get('/logout',mechanicLogout)

export default router