import  express  from 'express';
import { resendOtp, userLogin, userLogout, userSignup, verifyUserSignup } from '../controller/userController.js';
import { userCheckAuth } from '../middleware/userAuth.js';
const router=express.Router()

router.get('/auth',userCheckAuth)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/resendOtp',resendOtp)

router.post('/login',userLogin).get('/logout',userLogout)


export default router