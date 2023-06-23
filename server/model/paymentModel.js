import mongoose from "mongoose";

const paymentSchema=mongoose.Schema({
    accountnumber:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    mechanic_id:{
        type:String,
        required:true
    },
    paymentstatus:{
        type:String,
        default:'pending'
    }
})
const paymentModel=mongoose.model('payment',paymentSchema)
export default paymentModel