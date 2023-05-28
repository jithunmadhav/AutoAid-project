import  express  from 'express';
import { resendOtp, userLogin, userSignup, verifyUserSignup } from '../controller/userController.js';
import { userCheckAuth } from '../middleware/userAuth.js';
const router=express.Router()

router.get('/auth',userCheckAuth)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/user/resendOtp',resendOtp)

router.post('/login',userLogin)


export default router