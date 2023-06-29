import  jwt  from "jsonwebtoken";
import adminModel from "../model/adminModel.js";

export const verifyAdmin=async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(token){
    const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
    const admin=await adminModel.find({_id:verifyJwt.id})
    if(admin){
        next()
    }else{
        res.json({logged:false,err:true,message:'No admin'})

    }
    }else{
     res.json({logged:false,err:true,message:'No token'})
    }
 }
 