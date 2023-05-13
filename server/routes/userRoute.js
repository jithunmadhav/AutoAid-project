import  express  from 'express';
import { userLogin, userSignup } from '../controller/userController.js';
const router=express.Router()

router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)


export default router