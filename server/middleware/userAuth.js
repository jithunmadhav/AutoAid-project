import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js';

// export const verifyUser=async(req,res,next)=>{
//     const token = req.cookies.userToken;
//     if(token){
//     const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
//     let ID=verifyJwt.id;
//     const user=await userModel.findOne({_id:ID})
//     if(user.ban==true){
//         res.json({logged:false,err:true,message:'user banned',ban:true})
//     }else{
//         res.json({logged:true,details:user,ban:false})
//         console.log('2222222222');
//         next();
//     }
//     }else{
//      res.json({logged:false,err:true,message:'No token',ban:false})
//      console.log("3333333333");
//     }
//  }


export const verifyUser = async (req, res, next) => {
    const token = req.cookies.userToken;
    if (token) {
      try {
        const verifyJwt = jwt.verify(token, '00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
        const userID = verifyJwt.id;
        const user = await userModel.findOne({ _id: userID });
        
        if (user.ban) {
          res.json({ logged: false, err: true, message: 'User banned', ban: true });
        } else {
          req.user = user; // Store the user object in the request for further use
          next();
        }
      } catch (error) {
        res.json({ logged: false, err: true, message: 'Invalid token', ban: false });
      }
    } else {
      res.json({ logged: false, err: true, message: 'No token', ban: false });
    }
  };
  