import ChatModel from "../model/chatModel.js";
import mechanicModel from "../model/mechanicModel.js";

export const createChat = async (req, res) => {
  try {
  const chatExist = await ChatModel.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });
  if(chatExist){
    res.status(200).json({err:false,message:'chat already exist'})
  }else{
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });
  
      const result = await newChat.save();
      res.status(200).json({err:false,message:"chat created"});
  }

  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};
export const getMechanic=async(req,res)=>{
  try {
   const mechanic= await mechanicModel.findOne({_id:req.params.id})
   if(mechanic){
    res.status(200).json({err:false,mechanic})
   }else{
    res.status(404).json({err:true})
   }
  } catch (error) {
    res.status(500).json({err:true})
  }
}