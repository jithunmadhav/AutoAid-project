import Joi from 'joi';
import schema from '../helper/joiValidation.js';
import { randomNumber } from '../helper/randomNum.js';
import paymentModel from '../model/paymentModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto'
import mechanicModel from '../model/mechanicModel.js';
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const allPaymentRequest=async(req,res)=>{
try {
    const id=req.query.id;
    const result = await paymentModel.find({mechanic_id:id}).lean()
    if(result){
        res.status(200).json({err:false,result})
    }else{
        res.status(404).json({err:true})
    }
} catch (error) {
    console.log(error);
    res.status(500).json({err:true,message:'something went wrong'})
}
}


export const allPendingPayment=async(req,res)=>{
  try {
      const id=req.query.id;
      const result = await paymentModel.find({paymentstatus:'pending'}).lean()
      if(result){
          res.status(200).json({err:false,result})
      }else{
          res.status(404).json({err:true})
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({err:true,message:'something went wrong'})
  }
  }
  

export const paymentRequest = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ err: true, message: error.details[0].message });
    }

    const { accno, name, branch, amount,mechanic_id,bank } = req.body;

    await paymentModel.create({
      accountnumber:accno,
      name:name,
      branch:branch,
      amount:amount,
      bankname:bank,
      mechanic_id:mechanic_id
    })

    res.status(200).json({ err: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: true, message: 'Something went wrong' });
  }
};

export const createPayment=(req,res)=>{
  const orderID=randomNumber()
  const options={
    amount: req.body.amount*100,
    currency: "INR",
    receipt: orderID 
  };

 instance.orders.create(options,(err,order)=>{
  res.json({orderId:order})
 });
}
export const adminVerifyPayment=async(req,res)=>{
  let hamc =crypto.createHmac('sha256', process.env.KEY_SECRET)
  hamc.update(req.body.payment.razorpay_order_id+'|'+req.body.payment.razorpay_payment_id)
  hamc=hamc.digest('hex')
  if(hamc==req.body.payment.razorpay_signature){
  await paymentModel.updateOne({_id:req.body.data._id},{$set:{paymentstatus:'success'}})
  await mechanicModel.updateOne({_id:req.body.data.mechanic_id},{$inc:{'wallet':-(parseInt(req.body.data.amount))}})
  res.json({err:false})
    
}else{
    res.json({err:true})
  }
}