import serviceModel from "../model/serviceModel.js"


export const addServices=async(req,res)=>{
    const {name}=req.body
    await serviceModel.create({
        serviceName:name,
        image:req.file
    }).then((result)=>{
        res.status(200).json({err:false})
    }).catch(error=>{
        res.status(500).json({err:true,error})
    })
}

export const allServices=async(req,res)=>{
    try {
        let result=await serviceModel.find().lean()
    if(result){
        res.status(200).json({err:false,result})
    }else{
        res.status(404).json({err:true,message:'something went wrong'})
    }
    } catch (error) {
        res.status(500).json({ err: true, message: 'Internal server error' });

    }
}

export const deleteService=async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    await serviceModel.deleteOne({_id:id}).then((result)=>{
        res.status(200).json({err:false,result})
    }).catch((error)=>{
        res.status(500).json({err:true,error})
    })
}