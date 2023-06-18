import crypto from 'crypto'
import stripe from 'stripe';
import { randomNumber } from '../helper/randomNum.js';
import appiontmentModel from "../model/appointmentModel.js"
import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const emergencySchedule=async(req,res)=>{
    try {
      if(req.body.mechanic.booking=='Scheduled booking'){
        const currDate=new Date( new Date(req.body.mechanic.selectedDate).toISOString().split('T')[0])
        console.log(currDate);
        await appiontmentModel.create({
          mechanic_id:req.body.mechanic._id,
          selectedService:req.body.mechanic.selectedService,
          coordinates:req.body.mechanic.coordinates,
          booking_type:req.body.mechanic.booking,
          selectedVehicle_id:req.body.selectedVehicle,
          userLocation:req.body.location,
          complaint:req.body.complaint,
          selectedDate:currDate,
          selectedTime:req.body.mechanic.selectedTime,
          userId:req.body.userId
      }).then((result)=>{
          res.status(200).json({err:false})
      }).catch(err=>console.log(err))
      }else{
        await appiontmentModel.create({
            mechanic_id:req.body.mechanic._id,
            selectedService:req.body.mechanic.selectedService,
            coordinates:req.body.mechanic.coordinates,
            booking_type:req.body.mechanic.booking,
            selectedVehicle_id:req.body.selectedVehicle,
            userLocation:req.body.location,
            complaint:req.body.complaint,
            userId:req.body.userId
        }).then((result)=>{
            res.status(200).json({err:false})
        }).catch(err=>console.log(err))
      }
    } catch (error) {
        res.status(500).json({err:true,message:'internal server error'})
        console.log(error);
    }

}

const stripePayment = async (req, res) => {
  const minAmount = req.body.minAmount;
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
  const currDate=new Date( new Date(req.body.mechanic.selectedDate).toISOString().split('T')[0])

  try {
    const customer = await stripeInstance.customers.create({
      metadata: {
        mechanic_id: req.body.mechanic._id,
        selectedService: req.body.mechanic.selectedService,
        booking_type: req.body.mechanic.booking,
        selectedVehicle_id: req.body.selectedVehicle,
        userLocation: req.body.location,
        complaint: req.body.complaint,
        selectedDate: currDate,
        selectedTime: req.body.mechanic.selectedTime,
        userId: req.body.userId,
      },
    });

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: req.body.mechanic.booking,
            },
            unit_amount: minAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/*',
      billing_address_collection: 'auto',
      customer: customer.id,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default stripePayment;


const webhookHandler = async (req, res) => {
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = 'whsec_fb9d505f85f524747faef83b563bb193cde3b7dfbf55eea84a3a82cfdd19b4fa'; // Replace with your webhook signing secret
  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: webhookSecret,
  });

  try {
    let event = stripe.webhooks.constructEvent(payloadString, header, webhookSecret);
    
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const customerId = session.customer;
 
        const customer = await stripeInstance.customers.retrieve(customerId);
    

        const appointmentData = {
          mechanic_id: customer.metadata.mechanic_id,
          selectedService: customer.metadata.selectedService,
          booking_type: customer.metadata.booking_type,
          selectedVehicle_id: customer.metadata.selectedVehicle_id,
          userLocation: customer.metadata.userLocation,
          complaint: customer.metadata.complaint,
          selectedDate: customer.metadata.selectedDate,
          selectedTime: customer.metadata.selectedTime,
          userId: customer.metadata.userId,
           
        };
        await appiontmentModel.create(appointmentData);
        console.log('Appointment created:', appointmentData);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    res.status(400).json({ error: 'Webhook error' });
  }
};


 export const generateRazorpay=(req,res)=>{
  const orderID=randomNumber()
  const options={
    amount: req.body.mechanic.minAmount*100,
    currency: "INR",
    receipt: orderID 
  };

 instance.orders.create(options,(err,order)=>{
  res.json({orderId:order})
 });
 }
 export const verifyPayment=async(req,res)=>{
  console.log(req.body);
        let hamc =crypto.createHmac('sha256', process.env.KEY_SECRET)
        hamc.update(req.body.payment.razorpay_order_id+'|'+req.body.payment.razorpay_payment_id)
        hamc=hamc.digest('hex')
        if(hamc==req.body.payment.razorpay_signature){
          const currDate=new Date( new Date(req.body.mechanic.selectedDate).toISOString().split('T')[0])
          await appiontmentModel.create({
            mechanic_id:req.body.mechanic._id,
            selectedService:req.body.mechanic.selectedService,
            coordinates:req.body.mechanic.coordinates,
            booking_type:req.body.mechanic.booking,
            selectedVehicle_id:req.body.selectedVehicle,
            userLocation:req.body.location,
            complaint:req.body.complaint,
            selectedDate:currDate,
            selectedTime:req.body.mechanic.selectedTime,
            userId:req.body.userId
        }).then((result)=>{
            res.status(200).json({err:false})
        }).catch(err=>console.log(err))        
      }else{
          res.json({err:true})
        }
 }

export { stripePayment, webhookHandler };