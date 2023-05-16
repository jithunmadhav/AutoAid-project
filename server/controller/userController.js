import userModel from '../model/userModel.js'  
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
 
    export const userSignup=async(req,res)=>{
        try {

        let {name,email,mobile,password,confirmpassword}=req.body;
        const oldUser=await userModel.findOne({email})
        if(oldUser){
            res.json({err:true,message:'User already exsist'})
        }else{
            console.log(password);
            console.log(confirmpassword);
            if(password==confirmpassword){
                let bcrypPassword=await bcrypt.hash(password,10)
                let user= await userModel.create({
                    name,
                    email,
                    mobile,
                    password:bcrypPassword
                });
                 
                const userToken=jwt.sign({
                    id:user._id
                },
                "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                console.log(token);
                return res.cookie("userToken", userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'User registration success'});
                
            }else{
                res.json({err:true,message:'password entered are not same'})
            }
           
           
        }
        } catch (error) {
            console.log(error);
        }
    }
    export const userLogin=async(req,res)=>{
      try {
        let {email,password}=req.body;
        let user=await userModel.findOne({email:email})
        if(user){
            let status= await bcrypt.compare(password,user.password)
            if(status){
                const userToken=jwt.sign({
                    id:user._id
                },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("userToken", userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'User login success'}); 
            }else{
                res.json({err:true,message:"Invalid email or password"})
            }
        }else{
            res.json({err:true,message:'No user found, please signup.'})
        }
      } catch (error) {
        console.log(error);
      }
    }
    
 