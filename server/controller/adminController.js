import adminModel from '../model/adminModel.js'
import mechanicModel from '../model/mechanicModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {approvedMail, rejectMail} from '../helper/mail.js' 
import userModel from '../model/userModel.js'
import appiontmentModel from "../model/appointmentModel.js"


   export const  adminLogin=async(req,res)=>{
        try {
            let {email,password}=req.body;
            let account=await adminModel.findOne({email:email})
            if(account){
                let status= await bcrypt.compare(password,account.password)
                if(status){
                    const adminToken=jwt.sign({
                        id:account._id
                    },process.env.JWT_SECRET_KEY);
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
    export const mechanics=async(req,res)=>{
        try {
            const service=req.params.service;
            let mechanic=await mechanicModel.find({ban:false,applicationStatus:'approved',service:service},{password:0,proof:0}).lean()
            res.json({err:false,mechanic})
        } catch (error) {
            console.log(error);
        }
    }

    export const allMechanics = async (req, res) => {
        try {
          const { search, filter, page } = req.query;
          const perPage = 8; 
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

       export const adminLogout=(req,res)=>{
        return res
        .cookie('adminToken', '', {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: 'none',
        }).json({ err: false, message: 'Logged out successfully' });
       }

       export const monthlyRevenue=async(req,res)=>{
       try {
         
        const monthlyDataArray= await appiontmentModel.aggregate([{$match:{status:'completed'}},{$group:{_id:{$month:"$selectedDate"}, sum:{$sum:"$amount"}}}])
        let monthlyDataObject={}
        monthlyDataArray.map(item=>{
         monthlyDataObject[item._id]=item.sum
       })
       let monthlyData=[]
        for(let i=1; i<=12; i++){
         monthlyData[i-1]= monthlyDataObject[i] ?? 0
        }
       res.json({err:false,monthlyData})
       } catch (error) {
        res.status(500).json({err:true,error})
       }
       }

       export const dashboardRevenue=async(req,res)=>{
        try {
            let total= await appiontmentModel.aggregate([{$match:{status:'completed'}},{$group:{_id:null,total:{$sum:"$amount"}}}])
            let completedAppointments=await appiontmentModel.countDocuments({status:'completed'})
            let pendingAppointments=await appiontmentModel.countDocuments({ status: { $ne: 'completed' }})
            const totalRevenue=total[0].total ?? 0;
            res.status(200).json({err:false,totalRevenue,completedAppointments,pendingAppointments})
        } catch (error) {
            res.status(500).json({err:true,error})
        }
       }
       export const reveueReport=async(req,res)=>{
        try {
            const { search, page } = req.query;
            const perPage = 8;
            const currentPage = parseInt(page) || 1;
            const query = {
              status:'completed',
              username: new RegExp(search, 'i')
            };
            const totalAppointments = await appiontmentModel.countDocuments(query);
            const totalPages = Math.ceil(totalAppointments / perPage);
            const result = await appiontmentModel
              .find({ ...query })
              .skip((currentPage - 1) * perPage)
              .limit(perPage)
              .lean();
            if (result) {
              res.status(200).json({ err: false, result, totalPages });
            } else {
              res.status(404).json({ err: true });
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({ err: true, error });
          }
       }
      
       export const filterDateRevenue=async(req,res)=>{
        try {
            let result=  await appiontmentModel.find({selectedDate:{$gte:req.body.date1,$lt:req.body.date2}}).lean()
            let filter=result.filter(e=>e.status=='completed')
            console.log(filter);
            res.status(200).json({err:false,filter})
        } catch (error) {
            res.status(500).json({err:true,error})
        }
       }

       export const adminCheckAuth=async(req,res)=>{
        const token = req.cookies.adminToken;
        if(token){
        const verifyJwt= jwt.verify(token,process.env.JWT_SECRET_KEY);
        const admin=await adminModel.find({_id:verifyJwt.id})
        res.json({logged:true,details:admin})
        }else{
         res.json({logged:false,err:true,message:'No token'})
        }
     }