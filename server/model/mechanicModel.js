const mongoose = require('mongoose')

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
        type:Boolean,
        default:false
    }
    
    
    
})

const mechanicModel=mongoose.model('mechanicDetails',mechanicSchema)
module.exports=mechanicModel;