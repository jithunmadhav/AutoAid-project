import mechanicModel from '../model/mechanicModel.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { signupMail } from '../helper/mail.js'
export const mechanicSignup=async(req,res)=>{
    try {
        let {name,email,mobile,experience,location,password,confirmpassword}=req.body
        let oldAccount=await mechanicModel.findOne({email:email})
        if(oldAccount){
            res.json({err:true,message:'Account already excist'})
        }else{
            if(password==confirmpassword){
                let bcrypPassword=await bcrypt.hash(password,10)
                let account= await mechanicModel.create({
                    name,
                    email,
                    mobile,
                    experience,
                    location,
                    password:bcrypPassword
                });
                signupMail(email,name)
                const token=jwt.sign({
                    id:account._id
                },
                "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'mechanic registration success'});
            }else{
                res.json({err:true,message:'Entered password are not same'})
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const mechanicLogin=async(req,res)=>{
    try {
        let {email,password}=req.body;
        let account=await mechanicModel.findOne({email:email})
        if(account){
            if(account.applicationStatus=='approved'){
                let status= await bcrypt.compare(password,account.password)
                if(status){
                    const token=jwt.sign({
                        id:account._id
                    },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                    return res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        sameSite: "none",
                    }).json({ err: false ,message:'login success'}); 
                }else{
                    res.json({err:true,message:"Invalid email or password"})
                }
            }else{
                res.json({err:true,message:'Application verification on processing'})
            }
        }else{
            res.json({err:true,message:'No account found, please signup.'})
        }
      } catch (error) {
        console.log(error);
      }        
    }
