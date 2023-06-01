import jwt from 'jsonwebtoken'
import mechanicModel from "../model/mechanicModel.js";

export const mechCheckAuth=async(req,res)=>{
    const token = req.cookies.mechanictoken;
    if(token){
    const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
    let ID=verifyJwt.id;
    const mechanic=await mechanicModel.find({_id:ID})
    res.json({logged:true,details:mechanic})
    }else{
     res.json({logged:false,err:true,message:'No token'})
    }
 }
 