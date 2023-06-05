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

export const allServices=async(req,res)=>{
    try {
        let result=await serviceModel.find().lean()
    if(result){
        res.json({err:false,result})
    }else{
        res.status(404).json({err:true,message:'something went wrong'})
    }
    } catch (error) {
        res.status(500).json({ err: true, message: 'Internal server error' });

    }
}