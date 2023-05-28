
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from 'twilio';

export const mobileOTP = (number, otp) => {
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '3156934292',
      to: `+91${number}`
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));
};

