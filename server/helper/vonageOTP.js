import {Vonage} from '@vonage/server-sdk'

export const mobileOTP2=(number,otp)=>{
  const vonage = new Vonage({
    apiKey: "29769969",
    apiSecret: "8iot4OEYEdjGxlb1"
  })
  
  const from = "Vonage APIs"
  const to = `91${number}`
  const text = `Your mobile OTP is ${otp}`
  
  async function sendSMS() {
      await vonage.sms.send({to, from, text})
          .then(resp => { console.log('Message sent successfully') })
          .catch(err => { console.log('There was an error sending the messages.')});
  }
   
}