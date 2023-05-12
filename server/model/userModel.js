const mongoose = require('mongoose')

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
    }
    
    
    
})

const userModel=mongoose.model('userDetails',userSchema)
module.exports=userModel;