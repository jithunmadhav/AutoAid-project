import mechanicModel from "../model/mechanicModel"


export const twoWheelerBooking=async(req,res)=>{
    let {location}=req.body
    let result= await mechanicModel.find({location:location})
    if(result){
        res.json({err:false,result})
    }else{
        res.json({err:true})
    }
}