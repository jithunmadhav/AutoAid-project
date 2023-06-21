import mechanicModel from '../model/mechanicModel.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { sentOTP, signupMail } from '../helper/mail.js'
import { randomNumber } from '../helper/randomNum.js'
import convertPDFToImages from 'pdf-img-convert'
import fs from 'fs';



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
           console.log(otp);
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

 

export const verifyMechanicSignup = async (req, res) => {
  const { name, email, mobile, password, searchValue, experience,service,minAmount } = req.body;
  let otp = req.body.OTP;
  let mechanicToken = req.cookies.mechanicSignupToken;
  const OtpToken = jwt.verify(
    mechanicToken,
    '00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa'
  );
  let bcrypPassword = await bcrypt.hash(password, 10);
  console.log(otp);
  console.log(OtpToken.otp);
  if (otp == OtpToken.otp) {
    let user = await mechanicModel.create({
      name,
      email,
      mobile,
      password: bcrypPassword,
      location:searchValue,
      experience,
      proof: req.file,
      service,
      minAmount

    });
    signupMail(email, name);
    const mechanicToken = jwt.sign(
      {
        id: user._id,
      },
      '00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa'
    );
    return res
      .cookie('mechanicSignupToken', mechanicToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      })
      .json({ err: false, message: 'User registration success' });
  } else {
    res.json({ err: true, message: 'something went wrong' });
  }
};

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

    export const scheduledDate = async (req, res) => {
      const { selecteddate, selectedTime, mechanic_id } = req.body;
      const currDate = new Date(selecteddate).toLocaleDateString();
      const date = new Date(selecteddate);
      // Get current date in Indian time zone
      const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      const today = new Date(currentDate);
      today.setHours(23, 59, 0, 0);
      const expirationDate = today;
      const existingDate = await mechanicModel.findOne({
        _id: mechanic_id,
        scheduledDate: { $elemMatch: { currDate: currDate } },
      });
    
      if (existingDate) {
        const result = existingDate.scheduledDate.find((e) => e.currDate === currDate);
        const existingDateArray = result.selectedTime.map((time) => time.value);
        const newTimeArray = selectedTime.filter((time) => !existingDateArray.includes(time.value));
        const selectedtime = [...result.selectedTime, ...newTimeArray];
    
        await mechanicModel
          .updateOne(
            { _id: mechanic_id, 'scheduledDate.currDate': currDate },
            { $set: { 'scheduledDate.$.selectedTime': selectedtime } }
          )
          .then((result) => {
            res.status(200).json({ err: false, result });
          })
          .catch((error) => {
            res.status(500).json({ err: true, error });
          });
      } else {
        await mechanicModel
          .updateOne(
            { _id: mechanic_id },
            {
              $addToSet: {
                scheduledDate: {
                  currDate: currDate,
                  date: date,
                  selectedTime: selectedTime,
                  expirationDate: expirationDate,
                },
              },
            }
          )
          .then((result) => {
            mechanicModel.createIndexes({ 'scheduledDate.expirationDate': 1 }, { expireAfterSeconds: 0 });
    
            res.status(200).json({ err: false, result });
          })
          .catch((error) => {
            res.status(500).json({ err: true, error });
          });
      }
    };
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
      