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
    }
})

const appiontmentModel=mongoose.Model('appintmentDetails',appointmentSchema)
export default appiontmentModel