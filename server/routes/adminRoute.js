import express from 'express'
import { adminLogin, adminLogout, allMechanics, appliedMechanics, approveApplication, banMechanic, bannedMechanics, bannedUsers, banUser, getAllUsers, mechanics, rejectApplication, unbanMechanic, unBanUser } from '../controller/adminController.js'
import { adminVerifyPayment, allPaymentRequest, allPendingPayment, allSuccessPayment, createPayment } from '../controller/paymentController.js'
import { addServices, allServices, deleteService } from '../controller/serviceController.js'
import upload from '../helper/multer.js'
import { adminCheckAuth } from '../middleware/adminAuth.js'
const router=express.Router()

router.get('/auth',adminCheckAuth)
router.post('/login',adminLogin).get('/logout',adminLogout)
router.get('/mechanics',allMechanics).get('/bannedmechnics',bannedMechanics)
router.patch('/banmechanic',banMechanic).patch('/unbanmechanic',unbanMechanic)
router.get('/applied',appliedMechanics)
router.post('/approve',approveApplication)
router.post('/reject',rejectApplication)
router.get('/users',getAllUsers).get('/bannedusers',bannedUsers)
router.patch('/banuser',banUser).patch('/unbanuser',unBanUser)
router.post('/addservice',upload.single('file'),addServices)
router.get('/allservices',allServices)
router.get('/paymentrequest',allPendingPayment).get('/successpayment',allSuccessPayment)
router.post('/createpayment',createPayment).post('/verifyPayment',adminVerifyPayment)
router.delete('/deleteservice/:id',deleteService)
router.get('/allmechanics/:service',mechanics)


export default router





