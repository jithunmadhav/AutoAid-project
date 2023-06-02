import mongoose from "mongoose";

const userSchema=mongoose.Schema({
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
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String
    },
    ban:{
        type:Boolean,
        default:false
    },
    address:{
        type:Array,
        default:[]
    },
    vehicle:{
        type:Array,
        default:[]
    }
    
    
    
})

const userModel=mongoose.model('userDetails',userSchema)
export default userModel