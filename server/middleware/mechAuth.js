import jwt from 'jsonwebtoken'
import mechanicModel from "../model/mechanicModel.js";

 const verifyMech =async (req,res,next)=>{
    const token = req.cookies.mechanictoken;
    if(token){
    const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
    let ID=verifyJwt.id;
    const mechanic=await mechanicModel.find({_id:ID})
    if(mechanic){
        req.mechanic=mechanic;
        next()
    }else{
        res.json({logged:false,err:true,message:'No user'})
    }
   }else{
     res.json({logged:false,err:true,message:'No token'})
    }
 }
 export default verifyMech