const adminModel=require('../model/adminModel')
const bcrypt=require('bcrypt')
module.exports={
    adminSignup:async(req,res)=>{
        let {email,password}=req.body
        let bcrypPassword=await bcrypt.hash(password,10)
         await adminModel.create({
            email,
            password:bcrypPassword
        }).then(() => {
            res.json("success")
        }).catch((err) => {
            res.json("failed")

        });
        
    }
}