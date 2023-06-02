import express from 'express'
import { adminLogin, appliedMechanics, approveApplication, getAllUsers, getMechanic, rejectApplication } from '../controller/adminController.js'
import { adminCheckAuth } from '../middleware/adminAuth.js'
const router=express.Router()

router.get('/auth',adminCheckAuth)
router.post('/login',adminLogin)
router.get('/AllMechanics',getMechanic)
router.get('/applied',appliedMechanics)
router.get('/approve/:id',approveApplication)
router.get('/reject/:id',rejectApplication)
router.get('/users',getAllUsers)


export default router





