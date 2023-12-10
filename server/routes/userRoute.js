import  express  from 'express';
import { mechanics } from '../controller/adminController.js';
import {  cancelBooking, completedBookingHistory, emergencySchedule, generateRazorpay, newBooking, stripePayment, verifyPayment, webhookHandler }  from '../controller/appointmentController.js';
import { createChat, findChat, getMechanic, userChats } from '../controller/chatController.js';
import { addMessage, getMessages } from '../controller/messageController.js';
import { refund } from '../controller/paymentController.js';
import { addVehicle, allVehicle, deleteVehicle, editVehicle, editVehicleDetails } from '../controller/serviceController.js';
import { forgotPassword, portfolio, rating, resendOtp, resetpassword, userCheckAuth, userEditProfile, userLogin, userLogout, userSignup, VerifyResetOtp, verifyUserSignup } from '../controller/userController.js';
import { verifyUser } from '../middleware/userAuth.js';
const router=express.Router()
router.post('/login',userLogin).get('/logout',userLogout)
router.post('/signup',userSignup).post('/verifySignup',verifyUserSignup).post('/resendOtp',resendOtp)
router.post('/forgotPassword',forgotPassword).post('/resetPassword',resetpassword).post('/verifyResetOtp',VerifyResetOtp)
router.get('/auth',userCheckAuth)
router.post('/webhook',express.raw({ type: 'application/json' }), webhookHandler);
router.post('/portfolio',portfolio)

router.use(verifyUser)
router.get('/allmechanics/:service',mechanics)
router.post('/addvehicle',addVehicle).get('/allvehicle/:id',allVehicle).patch('/deletevehicle',deleteVehicle)
router.get('/vehicleDetails',editVehicleDetails).patch('/editvehicle',editVehicle)
router.post('/appointment',emergencySchedule)
router.post('/stripepayment',stripePayment)
router.post('/createOrder',generateRazorpay).post('/verifyPayment',verifyPayment)
router.patch('/rating',rating)
router.post('/refund',refund)
router.post('/cancelbooking',cancelBooking)
router.get('/bookinghistory',completedBookingHistory).get('/newbooking',newBooking)
router.patch('/editprofile',userEditProfile)
router.post('/chat', createChat);
router.get('/chat/:Id', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.post('/message', addMessage);
router.get('/message/:chatId', getMessages);
router.get('/getmechanic/:id',getMechanic)
export default router                                  