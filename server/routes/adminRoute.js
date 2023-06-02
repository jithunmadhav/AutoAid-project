import express from 'express'
import { adminLogin, allMechanics, appliedMechanics, approveApplication, banMechanic, bannedMechanics, bannedUsers, banUser, getAllUsers, rejectApplication, unbanMechanic, unBanUser } from '../controller/adminController.js'
import { adminCheckAuth } from '../middleware/adminAuth.js'
const router=express.Router()

router.get('/auth',adminCheckAuth)
router.post('/login',adminLogin)
router.get('/mechanics',allMechanics).get('/bannedmechnics',bannedMechanics)
router.post('/banmechanic',banMechanic).post('/unbanmechanic',unbanMechanic)
router.get('/applied',appliedMechanics)
router.get('/approve/:id',approveApplication)
router.get('/reject/:id',rejectApplication)
router.get('/users',getAllUsers).get('/bannedusers',bannedUsers)
router.post('/banuser',banUser).post('/unbanuser',unBanUser)

export default router





