import mongoose from "mongoose";

const serviceSchema=mongoose.Schema({
    serviceName:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    }
})

const serviceModel=mongoose.model('service',serviceSchema)
export default serviceModel