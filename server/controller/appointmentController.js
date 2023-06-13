import appiontmentModel from "../model/appointmentModel.js"


export const emergencySchedule=async(req,res)=>{
    try {
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
        })
    } catch (error) {
        res.status(500).json({err:true,message:'internal server error'})
    }

}
import stripe from 'stripe';

const stripePayment = async (req, res) => {
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/*',
      billing_address_collection: 'auto', 
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default stripePayment;
