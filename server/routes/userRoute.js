import  express  from 'express';
import { userLogin, userSignup } from '../controller/userController.js';
import { userCheckAuth } from '../middleware/userAuth.js';
const router=express.Router()

router.get('/auth',userCheckAuth)
router.post('/signup',userSignup)
router.post('/login',userLogin)


export default router