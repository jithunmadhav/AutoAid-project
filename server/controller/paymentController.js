import Joi from 'joi';
import schema from '../helper/joiValidation.js';
import paymentModel from '../model/paymentModel.js';

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
