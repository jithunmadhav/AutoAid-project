import mongoose from "mongoose";
const mechanicSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String
    },
    applicationStatus:{
        type:String,
        default:'applied'
    },
    ban:{
        type:Boolean,
        default:false
    },
    review:{
        type:Array,
        default:[]
    },
    rating:{
        type:Array,
        default:[]
    },
    proof:{
        type:Object,
        required:true
    },
    service:{
        type:String,
        required:true
    }
    
    
    
})

const mechanicModel=mongoose.model('mechanicDetails',mechanicSchema)
export default mechanicModel