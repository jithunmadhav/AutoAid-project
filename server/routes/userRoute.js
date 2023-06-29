import  express  from 'express';
import {  cancelBooking, completedBookingHistory, emergencySchedule, generateRazorpay, newBooking, stripePayment, verifyPayment, webhookHandler }  from '../controller/appointmentController.js';
import { refund } from '../controller/paymentController.js';
import { addVehicle, allVehicle, deleteVehicle, editVehicle, editVehicleDetails } from '../controller/serviceController.js';
import { forgotPassword, rating, resendOtp, resetpassword, userCheckAuth, userLogin, userLogout, userSignup, VerifyResetOtp, verifyUserSignup } from '../controller/userController.js';
import { verifyUser } from '../middleware/userAuth.js';
const router=express.Router()
router.post('/login',userLogin).get('/logout',userLogout)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/resendOtp',resendOtp)

router.get('/auth',userCheckAuth)
router.use(verifyUser)
router.post('/forgotPassword',forgotPassword).post('/resetPassword',resetpassword).post('/verifyResetOtp',VerifyResetOtp)
router.post('/addvehicle',addVehicle).get('/allvehicle/:id',allVehicle).patch('/deletevehicle',deleteVehicle)
router.get('/vehicleDetails',editVehicleDetails).patch('/editvehicle',editVehicle)
router.post('/appointment',emergencySchedule)

router.post('/stripepayment',stripePayment)
router.post('/webhook',express.raw({ type: 'application/json' }), webhookHandler);
router.post('/createOrder',generateRazorpay).post('/verifyPayment',verifyPayment)
router.patch('/rating',rating)
router.post('/refund',refund)
router.post('/cancelbooking',cancelBooking)
router.get('/bookinghistory',completedBookingHistory).get('/newbooking',newBooking)
export default router                                  