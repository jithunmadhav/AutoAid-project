import mongoose from "mongoose";
const cancelBookingSchema=mongoose.Schema({
    reason:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    paymentAmount:{
        type:Number,
        required:true
    },
    mechanic_id:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    appointment_id:{
        type:String,
        required:true
    },
    cancelStatus:{
        type:String,
        default:'none'
    }
})
const cancelbookingModel=mongoose.model('cancelbooking',cancelBookingSchema);
export default cancelbookingModel