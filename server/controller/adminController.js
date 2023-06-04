import adminModel from '../model/adminModel.js'
import mechanicModel from '../model/mechanicModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {approvedMail, rejectMail} from '../helper/mail.js' 
import userModel from '../model/userModel.js'


   export const  adminLogin=async(req,res)=>{
        try {
            let {email,password}=req.body;
            let account=await adminModel.findOne({email:email})
            if(account){
                let status= await bcrypt.compare(password,account.password)
                if(status){
                    const adminToken=jwt.sign({
                        id:account._id
                    },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                    return res.cookie("adminToken", adminToken, {
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
        
    }

   export const appliedMechanics=async(req,res)=>{
        try {
            let result=await mechanicModel.find({applicationStatus:'applied'})
            res.json({err:false,result})
        } catch (error) {
            console.log(error);
        }
    }
    export const approveApplication=async(req,res)=>{
        try {
        let result= await mechanicModel.findByIdAndUpdate({_id:req.body.id},{$set:{applicationStatus:'approved'}})
        approvedMail(result.email,result.name)
        res.json({err:false,result})
        } catch (error) {
            console.log(error);
        }
    }
    export const rejectApplication=async(req,res)=>{
        try {
           let result= await mechanicModel.findByIdAndUpdate({_id:req.body.id},{$set:{applicationStatus:'rejected'}})
           if(result){
            rejectMail(result.email,result.name)
               res.json({err:false,result})
           }else{
            res.json({err:true,message:'something went wrong'})
           }
        } catch (error) {
            console.log(error);
        }
    }
    export const getAllUsers=async(req,res)=>{
     try {
        const { search, page } = req.query;
        const perPage = 5;  
        const currentPage = parseInt(page) || 1; 
        const query = {
          ban: false,
          name: new RegExp(search, 'i')
        };
           
        const totalUser = await userModel.countDocuments(query);
        console.log(totalUser);
        const totalPages = Math.ceil(totalUser / perPage);
        
        const result = await userModel
        .find(query, { password: 0 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage)
          .lean();
        if (result) {
          res.json({ err: false, result, totalPages });
        } else {
          res.json({ err: true, message: 'Something went wrong' });
        }
            
     } catch (error) {
        console.log(error);
     }
    }

    export const banUser=async(req,res)=>{
        const {id} = req.body
        await userModel.updateOne({_id:id},{$set:{ban:true}}).then((result)=>{
            res.json({err:false,result})
        }).catch((err)=>{
            res.json({err:true,err,message:"something went wrong"})
        })
    }
    export const bannedUsers=async(req,res)=>{
        try {
           let result = await userModel.find({ban:true}).lean()
           if(result){
               res.json({err:false,result})
           }else{
               res.json({err:true,message:'something went wrong'})
           }
               
        } catch (error) {
           console.log(error);
        }
       }

    export const unBanUser=async(req,res)=>{
        const {id} = req.body
        await userModel.updateOne({_id:id},{$set:{ban:false}}).then((result)=>{
            res.json({err:false,result})
        }).catch((err)=>{
            res.json({err:true,err,message:"something went wrong"})
        })
    }
    export const allMechanics = async (req, res) => {
        try {
          const { search, filter, page } = req.query;
          const perPage = 5; 
          const currentPage = parseInt(page) || 1; 
          
          const query = {
            ban: false,
            name: new RegExp(search, 'i')
          };
          
          if (filter) {
            query.applicationStatus = filter;
          }
          
          const totalMechanics = await mechanicModel.countDocuments(query);
          const totalPages = Math.ceil(totalMechanics / perPage);
          
          const mechanics = await mechanicModel
            .find(query, { password: 0 })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .lean();
      
          if (mechanics) {
            res.json({ err: false, mechanics, totalPages });
          } else {
            res.json({ err: true, message: 'Something went wrong' });
          }
        } catch (error) {
          console.log(error);
          res.json({ err: true, message: 'Internal server error' });
        }
      };
      
      
    
    export const banMechanic=async(req,res)=>{
        const {id} = req.body
        await mechanicModel.updateOne({_id:id},{$set:{ban:true}}).then((result)=>{
            res.json({err:false,result})
        }).catch((err)=>{
            res.json({err:true,err,message:"something went wrong"})
        })
    }
    export const bannedMechanics=async(req,res)=>{
        try {
            let result = await mechanicModel.find({ban:true}).lean()
            console.log(result);
              if(result){
                  res.json({err:false,result})
              }else{
                  res.json({err:true,message:'something went wrong'})
              }
                  
           } catch (error) {
              console.log(error);
           }
          }
   
       export const unbanMechanic=async(req,res)=>{
           const {id} = req.body
           await mechanicModel.updateOne({_id:id},{$set:{ban:false}}).then((result)=>{
               res.json({err:false,result})
           }).catch((err)=>{
               res.json({err:true,err,message:"something went wrong"})
           })
       }

      
