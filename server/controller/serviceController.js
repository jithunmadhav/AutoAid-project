import serviceModel from "../model/serviceModel.js"
import userModel from "../model/userModel.js"


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
    await serviceModel.deleteOne({_id:id}).then((result)=>{
        res.status(200).json({err:false,result})
    }).catch((error)=>{
        res.status(500).json({err:true,error})
    })
}
export const addVehicle=async(req,res)=>{
    const {manufacture,vehicleName,regNo,kilometer,fuel,manufactureYear,id}=req.body
    if(manufacture.trim() && vehicleName.trim() && regNo.trim() && kilometer.trim() && fuel.trim() && manufactureYear.trim()){
        await userModel.updateOne({_id:id},{$addToSet:{vehicle:req.body}}).then((result)=>{
            res.status(200).json({err:false,message:'Successfully '})
        }).catch(()=>{
            res.status(404).json({err:true,message:'Error occured '})
        })
    }else{
        res.status(404).json({err:true,message:'All fields are required'})
    }
}
export const allVehicle=async(req,res)=>{
const id=req.params.id;
const result=await userModel.find({_id:id},{password:0}).lean()
if(result){
    res.status(200).json({err:false,result})
}else{
    res.status(404).json({err:true,message:'somethind went wrong'})
}
}

export const deleteVehicle = async (req, res) => {
    console.log(req.body);
    const { userId, vehicleId } = req.body;
    
    try {
      const result = await userModel.updateOne(
        { _id: userId },
        { $pull: { vehicle: { id: vehicleId } } }
      );
      
      console.log(result);
      res.status(200).json({ err: false, message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: true, message: 'Failed to delete vehicle' });
    }
  };
  

