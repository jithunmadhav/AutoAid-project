import { Vonage } from '@vonage/server-sdk';

export const mobileOTP2 = async (number, otp) => {
  const vonage = new Vonage({
    apiKey: '29769969',
    apiSecret: '8iot4OEYEdjGxlb1'
  });

  const from = 'Vonage APIs';
  const to = `91${number}`;
  const text = `Your mobile OTP is ${otp}`;

  async function sendSMS() {
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log('Message sent successfully',resp);
      })
      .catch((err) => {
        console.log('There was an error sending the messages.');
      });
  }

  await sendSMS();
};

// import { Vonage } from '@vonage/server-sdk';

// const vonage = new Vonage({
//   apiKey: '29769969',
//   apiSecret: '8iot4OEYEdjGxlb1'
// });

// const from = 'Vonage APIs';
// const to = '919446244318';
// const text = 'A text message sent using the Vonage SMS API';

// async function sendSMS() {
//   try {
//     const response = await vonage.sms.send({ to, from, text });
//     console.log('Message sent successfully');
//     console.log(response);
//   } catch (error) {
//     console.log('There was an error sending the messages.');
//     console.error(error);
//   }
// }

// sendSMS();
