import appiontmentModel from "../model/appointmentModel.js"


export const emergencySchedule=async(req,res)=>{
    try {
        await appiontmentModel.create({
            mechanic_id:req.body.mechanic._id,
            selectedService:req.body.mechanic.selectedService,
            coordinates:req.body.mechanic.coordinates,
            booking_type:req.body.mechanic.booking,
            selectedVehicle_id:req.body.selectedVehicle,
            userLocation:req.body.location,
            complaint:req.body.complaint,
            userId:req.body.userId
        }).then((result)=>{
            res.status(200).json({err:false})
        })
    } catch (error) {
        res.status(500).json({err:true,message:'internal server error'})
    }

}