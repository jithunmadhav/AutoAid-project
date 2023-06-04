import express from 'express'
import { adminLogin, adminLogout, allMechanics, appliedMechanics, approveApplication, banMechanic, bannedMechanics, bannedUsers, banUser, getAllUsers, rejectApplication, unbanMechanic, unBanUser } from '../controller/adminController.js'
import { adminCheckAuth } from '../middleware/adminAuth.js'
const router=express.Router()

router.get('/auth',adminCheckAuth)
router.post('/login',adminLogin).get('/logout',adminLogout)
router.get('/mechanics',allMechanics).get('/bannedmechnics',bannedMechanics)
router.post('/banmechanic',banMechanic).post('/unbanmechanic',unbanMechanic)
router.get('/applied',appliedMechanics)
router.post('/approve',approveApplication)
router.post('/reject',rejectApplication)
router.get('/users',getAllUsers).get('/bannedusers',bannedUsers)
router.patch('/banuser',banUser).patch('/unbanuser',unBanUser)


export default router





