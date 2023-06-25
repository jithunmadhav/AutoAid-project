import  express  from 'express';
import { bookingHistory, emergencySchedule, generateRazorpay, stripePayment, verifyPayment, webhookHandler }  from '../controller/appointmentController.js';
import { refund } from '../controller/paymentController.js';
import { addVehicle, allVehicle, deleteVehicle, editVehicle, editVehicleDetails } from '../controller/serviceController.js';
import { forgotPassword, resendOtp, resetpassword, userLogin, userLogout, userSignup, VerifyResetOtp, verifyUserSignup } from '../controller/userController.js';
import { userCheckAuth } from '../middleware/userAuth.js';
const router=express.Router()

router.get('/auth',userCheckAuth)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/resendOtp',resendOtp)
router.post('/forgotPassword',forgotPassword).post('/resetPassword',resetpassword).post('/verifyResetOtp',VerifyResetOtp)
router.post('/addvehicle',addVehicle).get('/allvehicle/:id',allVehicle).patch('/deletevehicle',deleteVehicle)
router.get('/vehicleDetails',editVehicleDetails).patch('/editvehicle',editVehicle)
router.post('/appointment',emergencySchedule)
router.post('/login',userLogin).get('/logout',userLogout)

router.post('/stripepayment',stripePayment)
router.post('/webhook',express.raw({ type: 'application/json' }), webhookHandler);
router.post('/createOrder',generateRazorpay).post('/verifyPayment',verifyPayment)
router.post('/refund',refund)
router.get('/bookinghistory',bookingHistory)
export default router                                  