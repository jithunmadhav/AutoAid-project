import mongoose from "mongoose";

const appointmentSchema=mongoose.Schema({
    mechanic_id:{
        type:String,
        required:true
    },
    selectedService:{
        type:String,
        required:true
    },
    coordinates:{
        type:Array
    },
    booking_type:{
        type:String,
        required:true
    },
    selectedVehicle_id:{
        type:Number,
        required:true
    },
    userLocation:{
        type:String,
        required:true
    },
    complaint:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    selectedDate:{
        type:Date
    },
    selectedTime:{
        type:String
    },
    status:{
        type:String,
        default:'waiting for confirmation'
    }
})

const appiontmentModel=mongoose.model('appointment',appointmentSchema)
export default appiontmentModel