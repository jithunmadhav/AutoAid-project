const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const adminModel=mongoose.model('adminDetails',adminSchema)
module.exports=adminModel;