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
    searchValue:{
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
    }
    
    
    
})

const mechanicModel=mongoose.model('mechanicDetails',mechanicSchema)
export default mechanicModel