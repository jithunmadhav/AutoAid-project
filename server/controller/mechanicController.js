import mechanicModel from '../model/mechanicModel.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { sentOTP, signupMail } from '../helper/mail.js'
import { randomNumber } from '../helper/randomNum.js'


// export const mechanicSignup=async(req,res)=>{
//     try {
//         let {name,email,mobile,experience,location,password,confirmpassword}=req.body
//         let oldAccount=await mechanicModel.findOne({email:email})
//         if(oldAccount){
//             res.json({err:true,message:'Account already excist'})
//         }else{
//             if(password==confirmpassword){
//                 let bcrypPassword=await bcrypt.hash(password,10)
//                 let account= await mechanicModel.create({
//                     name,
//                     email,
//                     mobile,
//                     experience,
//                     location,
//                     password:bcrypPassword
//                 });
//                 signupMail(email,name)
//                 const token=jwt.sign({
//                     id:account._id
//                 },
//                 "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
//                 return res.cookie("token", token, {
//                     httpOnly: true,
//                     secure: true,
//                     maxAge: 1000 * 60 * 60 * 24 * 7,
//                     sameSite: "none",
//                 }).json({ err: false ,message:'mechanic registration success'});
//             }else{
//                 res.json({err:true,message:'Entered password are not same'})
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


export const mechanicSignup1=async(req,res)=>{
    try {
        let {email,mobile}=req.body;
        const oldUser=await mechanicModel.findOne({email})
        if(oldUser){
            res.json({err:true,message:'mechanic already exsist'})
        }else{
            res.json({err:false})
        }
    } catch (error) {
        console.log(error);
    }
}

export const mechanicSignup2=async(req,res)=>{
    try {
    let {email,mobile,password,confirmPassword}=req.body.data;
    let {searchValue,experience}=req.body;
    const oldUser=await mechanicModel.findOne({email})
    if(oldUser){
        res.json({err:true,message:'mechanic already exsist'})
    }else{
         
        if(password==confirmPassword){
           let otp=randomNumber()
           sentOTP(email,otp);
        //    mobileOTP(mobile,otp)
            //   mobileOTP2(mobile,otp)
            const mechanicToken=jwt.sign({
                otp:otp,

            },
            "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
            return res.cookie("mechanicSignupToken", mechanicToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'Otp send successfull'});
            
        }else{
            res.json({err:true,message:'password entered are not same'})
        }
       
       
    }
    } catch (error) {
        console.log(error);
    }
}
export const verifyMechanicSignup=async(req,res)=>{
    const {name,email,mobile,password,searchValue,experience}=req.body
    console.log(typeof(req.body.location));
    let otp=req.body.OTP;
    let mechanicToken=req.cookies.mechanicSignupToken;
     const OtpToken = jwt.verify(mechanicToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
    let bcrypPassword=await bcrypt.hash(password,10)
    if(otp==OtpToken.otp){

        let user= await mechanicModel.create({
            name,
            email,
            mobile,
            password:bcrypPassword,
            searchValue,
            experience
        });
        signupMail(email,name)
        const mechanicToken=jwt.sign({
            id:user._id
        },
        "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");    
        return res.cookie("mechanicSignupToken", mechanicToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false ,message:'User registration success'});
    }else{
        res.json({err:true,message:'something went wrong'})
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
                    return res.cookie("mechanictoken", token, {
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
    export const mechVerifyResetOtp=async(req,res)=>{
        let otp=req.body.OTP;
        let userToken=req.cookies.resetToken;
        console.log(userToken);
         const OtpToken = jwt.verify(userToken,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa')
        if(otp==OtpToken.otp){
            res.json({err:false})
        }else{
            res.json({err:true})
        }
    }
    export const mechResetpassword=async(req,res)=>{
        console.log(req.body);
        const {email,newPassword}=req.body;
        let bcrypPassword=await bcrypt.hash(newPassword,10)
        await mechanicModel.updateOne({email:email},{$set:{
            password:bcrypPassword
        }}).then((result)=>{
            res.json({err:false,result,message:'Reset password successfull'})
        }).catch(err=>{
            res.json({err:true,message:'something went wrong'})
        })
    }
    export const mechanicLogout = (req, res) => {
        console.log("sdfds");
        return res
          .cookie('mechanictoken', '', {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: 'none',
          })
          .cookie('mechanicSignupToken', '', {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: 'none',
          })
          .json({ err: false, message: 'Logged out successfully' });
      };
      