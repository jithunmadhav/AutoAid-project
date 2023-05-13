import express from 'express'
import { adminLogin, appliedMechanics, approveApplication, getMechanic, rejectApplication } from '../controller/adminController.js'
const router=express.Router()

router.post('/adminLogin',adminLogin)
router.get('/getAllMechanics',getMechanic)
router.get('/appliedMechanics',appliedMechanics)
router.get('/approveApplication/:id',approveApplication)
router.get('/rejectApplication/:id',rejectApplication)


export default router





