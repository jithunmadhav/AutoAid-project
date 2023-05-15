import express from 'express'
import { adminLogin, appliedMechanics, approveApplication, getMechanic, rejectApplication } from '../controller/adminController.js'
const router=express.Router()

router.post('/login',adminLogin)
router.get('/AllMechanics',getMechanic)
router.get('/applied',appliedMechanics)
router.get('/approve/:id',approveApplication)
router.get('/reject/:id',rejectApplication)


export default router





