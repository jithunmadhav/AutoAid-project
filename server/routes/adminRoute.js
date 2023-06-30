import express from 'express'
import { adminCheckAuth, adminLogin, adminLogout, allMechanics, appliedMechanics, approveApplication, banMechanic, bannedMechanics, bannedUsers, banUser, dashboardRevenue, filterDateRevenue, getAllUsers, mechanics, monthlyRevenue, rejectApplication, reveueReport, unbanMechanic, unBanUser } from '../controller/adminController.js'
import { adminVerifyPayment, allPaymentRequest, allPendingPayment, allSuccessPayment, createPayment } from '../controller/paymentController.js'
import { addServices, allServices, deleteService } from '../controller/serviceController.js'
import upload from '../helper/multer.js'
import { verifyAdmin } from '../middleware/adminAuth.js'
const router=express.Router()

router.get('/auth',adminCheckAuth)
router.post('/login',adminLogin).get('/logout',adminLogout)
router.get('/allservices',allServices)
router.use(verifyAdmin)
router.get('/mechanics',allMechanics).get('/bannedmechnics',bannedMechanics)
router.patch('/banmechanic',banMechanic).patch('/unbanmechanic',unbanMechanic)
router.get('/applied',appliedMechanics)
router.post('/approve',approveApplication)
router.post('/reject',rejectApplication)
router.get('/users',getAllUsers).get('/bannedusers',bannedUsers)
router.patch('/banuser',banUser).patch('/unbanuser',unBanUser)
router.post('/addservice',upload.single('file'),addServices)
router.get('/paymentrequest',allPendingPayment).get('/successpayment',allSuccessPayment)
router.post('/createpayment',createPayment).post('/verifyPayment',adminVerifyPayment)
router.delete('/deleteservice/:id',deleteService)
router.get('/monthlyrevenue',monthlyRevenue).get('/dashboardRevenue',dashboardRevenue).get('/revenuereport',reveueReport)
router.post('/filterdaterevenue',filterDateRevenue)
router.get('/allmechanics/:service',mechanics)


export default router





