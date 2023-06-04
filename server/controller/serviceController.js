import serviceModel from "../model/serviceModel.js"


export const addServices=async(req,res)=>{
    const {name}=req.body
    await serviceModel.create({
        serviceName:name,
        image:req.file
    }).then((result)=>{
        res.json({err:false})
    }).catch(error=>{
        res.json({err:true,error})
    })
}