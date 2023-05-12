const adminModel=require('../model/adminModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const mechanicModel = require('../model/mechanicModel');
module.exports={
    adminLogin:async(req,res)=>{
        try {
            let {email,password}=req.body;
            let account=await adminModel.findOne({email:email})
            if(account){
                let status= await bcrypt.compare(password,account.password)
                if(status){
                    const token=jwt.sign({
                        id:account._id
                    },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                    return res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        sameSite: "none",
                    }).json({ err: false ,message:'login success'}); 
                }else{
                    res.json({err:true,message:"Invalid email or password"})
                }
            }else{
                res.json({err:true,message:'No admin found'})
            }
          } catch (error) {
            console.log(error);                   
          }     
        
    },
    getMechanic:async(req,res)=>{
        try {
            let result=await mechanicModel.find()
            res.json({err:false,result})
        } catch (error) {
            console.log(error);
        }
    }
}